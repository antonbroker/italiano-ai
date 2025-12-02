import { sequelize } from '../db/sequelize';

/**
 * Migration script to set default values for createdAt and updatedAt in chat_messages table
 * Run this once to update existing database schema
 */
async function migrate() {
  try {
    console.log('[Migration] Setting default values for chat_messages timestamps...');

    await sequelize.query(`
      ALTER TABLE chat_messages 
      ALTER COLUMN created_at SET DEFAULT now(),
      ALTER COLUMN updated_at SET DEFAULT now();
    `);

    // Update existing rows that might have NULL values
    await sequelize.query(`
      UPDATE chat_messages 
      SET created_at = now() 
      WHERE created_at IS NULL;
    `);

    await sequelize.query(`
      UPDATE chat_messages 
      SET updated_at = now() 
      WHERE updated_at IS NULL;
    `);

    console.log('[Migration] Chat messages timestamps migration completed successfully.');
  } catch (error) {
    console.error('[Migration] Error migrating chat_messages timestamps:', error);
    throw error;
  }
}

migrate()
  .then(() => {
    console.log('[Migration] Migration script completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('[Migration] Migration failed:', error);
    process.exit(1);
  });

