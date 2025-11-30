import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const adminUrl = process.env.DB_ADMIN_URL;
const dbName = process.env.DB_NAME;

if (!adminUrl || !dbName) {
  console.error('DB_ADMIN_URL and DB_NAME must be set in .env to reset the database.');
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: adminUrl });

  try {
    await client.connect();
    console.log(`[db:reset] Connected to admin database`);

    const terminateSQL = `
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1
        AND pid <> pg_backend_pid();
    `;
    await client.query(terminateSQL, [dbName]);
    console.log(`[db:reset] Terminated existing connections to ${dbName}`);

    await client.query(`DROP DATABASE IF EXISTS "${dbName}"`);
    console.log(`[db:reset] Dropped database ${dbName}`);

    const owner = process.env.DB_USER ?? 'postgres';
    await client.query(`CREATE DATABASE "${dbName}" OWNER "${owner}"`);
    console.log(`[db:reset] Created database ${dbName}`);
  } catch (error) {
    console.error('[db:reset] Failed to reset database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();

