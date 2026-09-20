-- ============================================================================
-- AMARA PHARMACY POSTGRESQL DATABASE SCHEMA
-- Platforms: Tata 1mg / Apollo Pharmacy inspired
-- ============================================================================

-- 1. EXTENSIONS & ENUMS
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

-- ============================================================================
-- 2. CORE PHARMACEUTICAL TABLES
-- ============================================================================

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

-- ============================================================================
-- 3. PERFORMANCE & FUZZY SEARCH INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_medicines_brand_name_trgm ON medicines USING gin (brand_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_chemical_salts_name_trgm ON chemical_salts USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_comp_lookup ON medicine_compositions (salt_id, strength_value, strength_unit);
CREATE INDEX IF NOT EXISTS idx_comp_medicine_id ON medicine_compositions (medicine_id);
CREATE INDEX IF NOT EXISTS idx_medicines_form_price ON medicines (form, price_discounted) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_medicines_category ON medicines (category);
