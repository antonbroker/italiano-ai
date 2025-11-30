import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const adminUrl = process.env.DB_ADMIN_URL;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!adminUrl || !dbName || !dbUser || !dbPassword) {
  console.error(
    'Missing one of DB_ADMIN_URL, DB_NAME, DB_USER, DB_PASSWORD in environment. Please set them in .env (see env.example).',
  );
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: adminUrl });

  try {
    await client.connect();
    console.log('[db:init] Connected as admin');

    // Ensure user password is set
    console.log(`[db:init] Ensuring password for user "${dbUser}"`);
    await client.query(`ALTER USER "${dbUser}" WITH PASSWORD $1`, [dbPassword]);

    // Create database if it does not exist
    console.log(`[db:init] Ensuring database "${dbName}" exists`);
    const dbExistsRes = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);

    if (dbExistsRes.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}" OWNER "${dbUser}"`);
      console.log(`[db:init] Database "${dbName}" created`);
    } else {
      console.log(`[db:init] Database "${dbName}" already exists – skipping creation`);
    }
  } catch (error) {
    console.error('[db:init] Failed to initialize database', error);
    process.exitCode = 1;
  } finally {
    await client.end();
    console.log('[db:init] Done');
  }
}

run();


