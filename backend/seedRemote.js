/**
 * Standalone Node.js script to seed any remote PostgreSQL database (e.g. Render)
 * Usage:
 *   node seedRemote.js "<YOUR_RENDER_EXTERNAL_DATABASE_URL>"
 */
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.argv[2] || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: Please provide your database URL.');
  console.error('Usage: node seedRemote.js "<YOUR_RENDER_DATABASE_URL>"');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Required for Render external connections
});

async function run() {
  console.log('Connecting to remote PostgreSQL database...');
  const client = await pool.connect();
  try {
    console.log('Reading database/schema.sql...');
    const schemaPath = path.resolve(__dirname, '../database/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema and seeds...');
    await client.query(sql);
    console.log('✓ Successfully created tables and seeded medicines into your Render database!');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
