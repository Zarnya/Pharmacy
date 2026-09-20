export const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

DO $$ BEGIN
    CREATE TYPE dosage_form_enum AS ENUM (
        'Tablet',
        'Capsule',
        'Syrup',
        'Suspension',
        'Injection',
        'Ointment',
        'Gel',
        'Drops',
        'Inhaler',
        'Powder'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS chemical_salts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    therapeutic_class VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    manufacturer VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'General Care',
    form dosage_form_enum NOT NULL,
    package_size VARCHAR(100) NOT NULL,
    price_mrp NUMERIC(10, 2) NOT NULL CHECK (price_mrp > 0),
    price_discounted NUMERIC(10, 2) NOT NULL CHECK (price_discounted > 0 AND price_discounted <= price_mrp),
    rating NUMERIC(2, 1) DEFAULT 4.5,
    reviews_count INT DEFAULT 0,
    requires_prescription BOOLEAN NOT NULL DEFAULT false,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicine_compositions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
    salt_id UUID NOT NULL REFERENCES chemical_salts(id) ON DELETE RESTRICT,
    strength_value NUMERIC(10, 2) NOT NULL CHECK (strength_value > 0),
    strength_unit VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_medicine_salt UNIQUE (medicine_id, salt_id)
);

CREATE TABLE IF NOT EXISTS user_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES user_carts(id) ON DELETE CASCADE,
    medicine_id UUID NOT NULL REFERENCES medicines(id) ON DELETE RESTRICT,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cart_medicine UNIQUE (cart_id, medicine_id)
);

CREATE INDEX IF NOT EXISTS idx_medicines_brand_name_trgm ON medicines USING gin (brand_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_chemical_salts_name_trgm ON chemical_salts USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_comp_lookup ON medicine_compositions (salt_id, strength_value, strength_unit);
CREATE INDEX IF NOT EXISTS idx_comp_medicine_id ON medicine_compositions (medicine_id);
CREATE INDEX IF NOT EXISTS idx_medicines_form_price ON medicines (form, price_discounted) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_medicines_category ON medicines (category);

-- Insert Salts
INSERT INTO chemical_salts (id, name, therapeutic_class) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Paracetamol', 'Analgesics / Antipyretic'),
    ('22222222-2222-2222-2222-222222222222', 'Amoxicillin', 'Antibacterial Penicillin'),
    ('33333333-3333-3333-3333-333333333333', 'Clavulanic Acid', 'Beta-lactamase Inhibitor'),
    ('44444444-4444-4444-4444-444444444444', 'Pantoprazole', 'Proton Pump Inhibitor'),
    ('55555555-5555-5555-5555-555555555555', 'Domperidone', 'Antiemetic / Prokinetic'),
    ('66666666-6666-6666-6666-666666666666', 'Telmisartan', 'Angiotensin Receptor Blocker'),
    ('77777777-7777-7777-7777-777777777777', 'Metformin', 'Antidiabetic Biguanide'),
    ('88888888-8888-8888-8888-888888888888', 'Glimepiride', 'Antidiabetic Sulfonylurea'),
    ('99999999-9999-9999-9999-999999999999', 'Montelukast', 'Leukotriene Receptor Antagonist'),
    ('aaaaaaaa-1111-1111-1111-111111111111', 'Levocetirizine', 'Antihistamine'),
    ('bbbbbbbb-2222-2222-2222-222222222222', 'Vitamin C (Ascorbic Acid)', 'Water Soluble Vitamin'),
    ('cccccccc-3333-3333-3333-333333333333', 'Zinc', 'Essential Mineral'),
    ('dddddddd-4444-4444-4444-444444444444', 'Calcium', 'Mineral Supplement'),
    ('eeeeeeee-5555-5555-5555-555555555555', 'Vitamin D3 (Cholecalciferol)', 'Fat Soluble Vitamin')
ON CONFLICT (id) DO NOTHING;

-- Insert Medicines
INSERT INTO medicines (id, brand_name, slug, manufacturer, category, form, package_size, price_mrp, price_discounted, rating, reviews_count, requires_prescription) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dolo 650 Tablet', 'dolo-650-tablet', 'Micro Labs Ltd', 'Fever & Pain Relief', 'Tablet', '15 tablets in 1 strip', 34.00, 30.60, 4.8, 14200, false),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Crocin 650 Advance', 'crocin-650-advance', 'GSK Consumer Healthcare', 'Fever & Pain Relief', 'Tablet', '15 tablets in 1 strip', 35.50, 33.72, 4.7, 8900, false),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Calpol 650 Tablet', 'calpol-650-tablet', 'GlaxoSmithKline Pharmaceuticals', 'Fever & Pain Relief', 'Tablet', '15 tablets in 1 strip', 32.00, 28.00, 4.8, 6540, false),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Paracip 650 Tablet', 'paracip-650-tablet', 'Cipla Ltd', 'Fever & Pain Relief', 'Tablet', '10 tablets in 1 strip', 22.00, 16.50, 4.6, 3200, false),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Augmentin 625 Duo Tablet', 'augmentin-625-duo-tablet', 'GlaxoSmithKline Pharmaceuticals', 'Antibiotics & Infections', 'Tablet', '10 tablets in 1 strip', 223.50, 201.15, 4.9, 18200, true),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Moxikind-CV 625 Tablet', 'moxikind-cv-625-tablet', 'Mankind Pharma Ltd', 'Antibiotics & Infections', 'Tablet', '10 tablets in 1 strip', 178.00, 142.40, 4.7, 9150, true),
    ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Clavam 625 Tablet', 'clavam-625-tablet', 'Alkem Laboratories Ltd', 'Antibiotics & Infections', 'Tablet', '10 tablets in 1 strip', 195.00, 156.00, 4.8, 7300, true)
ON CONFLICT (id) DO NOTHING;

-- Insert Compositions
INSERT INTO medicine_compositions (medicine_id, salt_id, strength_value, strength_unit) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 650, 'mg'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 650, 'mg'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 650, 'mg'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 650, 'mg'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 500, 'mg'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 125, 'mg'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', 500, 'mg'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 125, 'mg'),
    ('gggggggg-gggg-gggg-gggg-gggggggggggg', '22222222-2222-2222-2222-222222222222', 500, 'mg'),
    ('gggggggg-gggg-gggg-gggg-gggggggggggg', '33333333-3333-3333-3333-333333333333', 125, 'mg')
ON CONFLICT (medicine_id, salt_id) DO NOTHING;
`;
