import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { pool } from './db';
import { MedicineSearchResult, SubstituteMedicine } from './types';
import { searchMockMedicines, findMockSubstitutes, SEED_MEDICINES } from './mockFallback';
import { SCHEMA_SQL } from './schemaSql';

const app = express();
app.use(cors());
app.use(express.json());

let isPostgresAvailable: boolean | null = null;

async function checkPostgres(): Promise<boolean> {
  if (isPostgresAvailable !== null) return isPostgresAvailable;
  try {
    const client = await pool.connect();
    isPostgresAvailable = true;
    console.log('✓ Connected to PostgreSQL database successfully.');
    
    // Auto-run schema and seed tables on connect (handles Render DB automatically)
    try {
      await client.query(SCHEMA_SQL);
      console.log('✓ PostgreSQL tables & seeds verified successfully.');
    } catch (initErr: any) {
      console.warn('Schema check notice:', initErr.message);
    } finally {
      client.release();
    }

    return true;
  } catch (err: any) {
    isPostgresAvailable = false;
    console.warn(`! PostgreSQL is offline. Serving through Amara Pharmacy embedded engine.`);
    return false;
  }
}

checkPostgres().catch(() => {});

/**
 * --------------------------------------------------------------------------
 * 1. LIST MEDICINES CATALOG
 * --------------------------------------------------------------------------
 * GET /api/medicines?category=Fever&prescription=true
 */
app.get('/api/medicines', (req: Request, res: Response): void => {
  const category = req.query.category as string;
  const prescription = req.query.prescription as string;

  let results = SEED_MEDICINES;

  if (category && category !== 'All') {
    results = results.filter((m) => m.category.toLowerCase() === category.toLowerCase());
  }

  if (prescription === 'true') {
    results = results.filter((m) => m.requires_prescription === true);
  } else if (prescription === 'false') {
    results = results.filter((m) => m.requires_prescription === false);
  }

  res.json({
    total: results.length,
    medicines: results,
  });
});

/**
 * --------------------------------------------------------------------------
 * 2. LIST THERAPEUTIC CATEGORIES
 * --------------------------------------------------------------------------
 * GET /api/categories
 */
app.get('/api/categories', (_req: Request, res: Response): void => {
  const categoriesMap: { [key: string]: number } = {};
  SEED_MEDICINES.forEach((m) => {
    categoriesMap[m.category] = (categoriesMap[m.category] || 0) + 1;
  });

  const categories = Object.keys(categoriesMap).map((name) => ({
    name,
    count: categoriesMap[name],
  }));

  res.json({ categories });
});

/**
 * --------------------------------------------------------------------------
 * 3. SMART AUTOCOMPLETE SEARCH
 * --------------------------------------------------------------------------
 * GET /api/search?q=augmentin&category=Antibiotics
 */
app.get('/api/search', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rawQuery = (req.query.q as string || '').trim();
    const category = req.query.category as string || undefined;

    if (!rawQuery && !category) {
      res.json({ results: [] });
      return;
    }

    const pgActive = await checkPostgres();
    if (!pgActive) {
      const results = searchMockMedicines(rawQuery, category);
      res.json({ results, source: 'in-memory-catalog' });
      return;
    }

    // PostgreSQL Query
    const searchQuery = `
      WITH matched_medicines AS (
        SELECT DISTINCT
          m.id,
          m.brand_name,
          m.slug,
          m.manufacturer,
          m.form,
          m.package_size,
          m.price_mrp,
          m.price_discounted,
          m.requires_prescription,
          m.image_url,
          CASE 
            WHEN m.brand_name ILIKE $1 || '%' THEN 1
            WHEN m.brand_name ILIKE '%' || $1 || '%' THEN 2
            WHEN cs.name ILIKE $1 || '%' THEN 3
            ELSE 4
          END as relevance_rank,
          CASE 
            WHEN m.brand_name ILIKE '%' || $1 || '%' THEN 'brand'
            ELSE 'salt'
          END as match_type
        FROM medicines m
        LEFT JOIN medicine_compositions mc ON mc.medicine_id = m.id
        LEFT JOIN chemical_salts cs ON cs.id = mc.salt_id
        WHERE m.is_active = true
          AND (
            m.brand_name ILIKE '%' || $1 || '%'
            OR cs.name ILIKE '%' || $1 || '%'
            OR similarity(m.brand_name, $1) > 0.3
            OR similarity(cs.name, $1) > 0.3
          )
      )
      SELECT 
        mm.id,
        mm.brand_name,
        mm.slug,
        mm.manufacturer,
        mm.form,
        mm.package_size,
        mm.price_mrp::float,
        mm.price_discounted::float,
        mm.requires_prescription,
        mm.image_url,
        mm.match_type,
        COALESCE(
          json_agg(
            json_build_object(
              'salt_name', cs_all.name,
              'strength', mc_all.strength_value || ' ' || mc_all.strength_unit
            ) ORDER BY cs_all.name ASC
          ) FILTER (WHERE cs_all.id IS NOT NULL), 
          '[]'::json
        ) AS compositions
      FROM matched_medicines mm
      LEFT JOIN medicine_compositions mc_all ON mc_all.medicine_id = mm.id
      LEFT JOIN chemical_salts cs_all ON cs_all.id = mc_all.salt_id
      GROUP BY 
        mm.id, mm.brand_name, mm.slug, mm.manufacturer, mm.form, mm.package_size,
        mm.price_mrp, mm.price_discounted, mm.requires_prescription, mm.image_url,
        mm.relevance_rank, mm.match_type
      ORDER BY mm.relevance_rank ASC, mm.brand_name ASC
      LIMIT 12;
    `;

    const { rows } = await pool.query<MedicineSearchResult>(searchQuery, [rawQuery]);
    res.json({ results: rows, source: 'postgresql' });
  } catch (err) {
    const rawQuery = (req.query.q as string || '').trim();
    const category = req.query.category as string || undefined;
    const results = searchMockMedicines(rawQuery, category);
    res.json({ results, source: 'in-memory-catalog-fallback' });
  }
});

/**
 * --------------------------------------------------------------------------
 * 4. EXACT SUBSTITUTE ENGINE
 * --------------------------------------------------------------------------
 * GET /api/medicines/:id/substitutes
 */
app.get('/api/medicines/:id/substitutes', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const pgActive = await checkPostgres();
    if (!pgActive) {
      const substitutes = findMockSubstitutes(id);
      res.json({
        target_medicine_id: id,
        total_substitutes_found: substitutes.length,
        substitutes,
        source: 'in-memory-catalog',
      });
      return;
    }

    const substituteQuery = `
      WITH target_med AS (
        SELECT id, form, price_discounted, brand_name
        FROM medicines
        WHERE id = $1 AND is_active = true
      ),
      target_comp AS (
        SELECT salt_id, strength_value, strength_unit
        FROM medicine_compositions
        WHERE medicine_id = $1
      ),
      target_salt_count AS (
        SELECT COUNT(*) as count FROM target_comp
      ),
      matching_candidates AS (
        SELECT 
          m.id,
          m.brand_name,
          m.slug,
          m.manufacturer,
          m.form,
          m.package_size,
          m.price_mrp,
          m.price_discounted,
          m.requires_prescription,
          m.image_url,
          (SELECT price_discounted FROM target_med) as target_price
        FROM medicines m
        JOIN medicine_compositions mc ON mc.medicine_id = m.id
        JOIN target_comp tc 
          ON tc.salt_id = mc.salt_id 
          AND tc.strength_value = mc.strength_value 
          AND tc.strength_unit = mc.strength_unit
        CROSS JOIN target_med tm
        WHERE m.id != tm.id
          AND m.form = tm.form
          AND m.is_active = true
        GROUP BY m.id, tm.price_discounted
        HAVING 
          COUNT(mc.salt_id) = (SELECT count FROM target_salt_count)
          AND (
            SELECT COUNT(*) 
            FROM medicine_compositions mc_candidate 
            WHERE mc_candidate.medicine_id = m.id
          ) = (SELECT count FROM target_salt_count)
      )
      SELECT 
        mc.id,
        mc.brand_name,
        mc.slug,
        mc.manufacturer,
        mc.form,
        mc.package_size,
        mc.price_mrp::float,
        mc.price_discounted::float,
        ROUND((mc.target_price - mc.price_discounted)::numeric, 2)::float AS savings_amount,
        ROUND((((mc.target_price - mc.price_discounted) / mc.target_price) * 100)::numeric, 1)::float AS savings_percentage,
        mc.requires_prescription,
        mc.image_url,
        COALESCE(
          json_agg(
            json_build_object(
              'salt_name', cs.name,
              'strength', mc_all.strength_value || ' ' || mc_all.strength_unit
            ) ORDER BY cs.name ASC
          ), 
          '[]'::json
        ) AS compositions
      FROM matching_candidates mc
      LEFT JOIN medicine_compositions mc_all ON mc_all.medicine_id = mc.id
      LEFT JOIN chemical_salts cs ON cs.id = mc_all.salt_id
      GROUP BY 
        mc.id, mc.brand_name, mc.slug, mc.manufacturer, mc.form, mc.package_size,
        mc.price_mrp, mc.price_discounted, mc.target_price, mc.requires_prescription, mc.image_url
      ORDER BY mc.price_discounted ASC;
    `;

    const { rows } = await pool.query<SubstituteMedicine>(substituteQuery, [id]);

    res.json({
      target_medicine_id: id,
      total_substitutes_found: rows.length,
      substitutes: rows,
      source: 'postgresql',
    });
  } catch (err) {
    const { id } = req.params;
    const substitutes = findMockSubstitutes(id);
    res.json({
      target_medicine_id: id,
      total_substitutes_found: substitutes.length,
      substitutes,
      source: 'in-memory-catalog-fallback',
    });
  }
});

// Centralized error handling
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('API Error:', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Amara Pharmacy API engine running on http://localhost:${PORT}`);
});
