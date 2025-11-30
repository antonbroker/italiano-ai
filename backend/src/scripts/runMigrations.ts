import bcrypt from 'bcryptjs';
import { sequelize } from '../db/sequelize';
import { initModels, ChatMessageModel, LessonModel, UserModel, UserProgressModel } from '../models';

const lessonSeeds = [
  {
    id: '0194d900-5c12-7c41-8f01-2b5d3c1aa101',
    title: 'Italian Greetings & Basics',
    description: 'Learn essential Italian greetings, introductions, and everyday phrases to start conversations with confidence.',
    level: 'beginner',
    topics: ['Greetings', 'Introductions', 'Basic Phrases', 'Pronunciation'],
    duration: '30 min',
    content: `Welcome to your first Italian lesson!

In this lesson, you'll learn:

1. Basic Greetings:
   - Ciao! (Hello/Goodbye - informal)
   - Buongiorno! (Good morning/Good day)
   - Buonasera! (Good evening)
   - Buonanotte! (Good night)

2. Introductions:
   - Mi chiamo... (My name is...)
   - Come ti chiami? (What's your name? - informal)
   - Piacere! (Nice to meet you!)

3. Common Phrases:
   - Grazie (Thank you)
   - Prego (You're welcome)
   - Scusi (Excuse me - formal)
   - Per favore (Please)

Practice these phrases daily and you'll be ready to have your first Italian conversation!`,
  },
  {
    id: '0194d900-5c12-7c42-8f01-2b5d3c1aa102',
    title: 'Italian Numbers & Ordering Food',
    description: 'Master Italian numbers from 1-100 and learn how to order food at restaurants like a local.',
    level: 'beginner',
    topics: ['Numbers', 'Food Vocabulary', 'Restaurant Phrases', 'Ordering'],
    duration: '45 min',
    content: `Benvenuto! Welcome to lesson 2!

In this lesson, you'll learn:

1. Numbers (Numeri):
   - 1-10: uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci
   - 11-20: undici, dodici, tredici, quattordici, quindici...
   - Tens: venti (20), trenta (30), quaranta (40)...

2. Food Vocabulary:
   - Pizza, pasta, gelato, caffè, acqua, vino
   - Il conto (the bill)
   - Il menù (the menu)

3. Restaurant Phrases:
   - Vorrei... (I would like...)
   - Un tavolo per due, per favore (A table for two, please)
   - Il conto, per favore (The bill, please)

4. Useful Questions:
   - Quanto costa? (How much does it cost?)
   - Avete...? (Do you have...?)

Practice ordering your favorite Italian dishes!`,
  },
  {
    id: '0194d900-5c12-7c43-8f01-2b5d3c1aa103',
    title: 'Italian Past Tense & Storytelling',
    description: 'Learn to talk about past events using the passato prossimo tense and share your experiences in Italian.',
    level: 'intermediate',
    topics: ['Past Tense', 'Verb Conjugation', 'Storytelling', 'Time Expressions'],
    duration: '60 min',
    content: `Ciao again! Ready for an intermediate challenge?

In this lesson, you'll learn:

1. Passato Prossimo (Present Perfect):
   - Formation: auxiliary verb (avere/essere) + past participle
   - Example: Ho mangiato (I ate/have eaten)
   - Example: Sono andato/a (I went/have gone)

2. Auxiliary Verbs:
   - Avere (to have) - used with most verbs
   - Essere (to be) - used with movement and reflexive verbs

3. Common Past Participles:
   - -are verbs: parlare → parlato
   - -ere verbs: vendere → venduto
   - -ire verbs: dormire → dormito

4. Irregular Past Participles:
   - fare → fatto (done/made)
   - vedere → visto (seen)
   - essere → stato (been)

5. Time Expressions:
   - Ieri (yesterday)
   - La settimana scorsa (last week)
   - Un mese fa (a month ago)

Practice telling stories about your day, your vacation, or your experiences!`,
  },
];

const userSeed = {
  id: '0194d8f2-0a45-7c20-b5f0-9f6e2d41a001',
  email: 'learner@italiano.ai',
  fullName: 'Demo Learner',
  avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
  password: 'LearnItalian123!',
};

const chatSeed = {
  id: '0194d93f-19b4-7d10-8c21-5f6a8e3bb201',
  userEmail: 'thezuck@gmail.com',
  message: 'bla bla',
  role: 'user' as const,
  lessonId: null,
};

const progressSeed = {
  id: '0194d93f-19b4-7d11-8c21-5f6a8e3bb202',
  userEmail: 'thezuck@gmail.com',
  lessonId: '0194d900-5c12-7c41-8f01-2b5d3c1aa101',
  completed: true,
  progressPercentage: 66,
};

/**
 * Check if a table exists in the database
 */
async function tableExists(tableName: string): Promise<boolean> {
  try {
    const [results] = await sequelize.query<Array<{ count: string }>>(
      `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public' AND table_name = :tableName`,
      {
        replacements: { tableName },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    return results && parseInt(results.count) > 0;
  } catch {
    return false;
  }
}

/**
 * Check if database has any tables (fresh database check)
 */
async function isFreshDatabase(): Promise<boolean> {
  const tables = ['users', 'lessons', 'chat_messages', 'user_progress'];
  for (const table of tables) {
    if (await tableExists(table)) {
      return false;
    }
  }
  return true;
}

/**
 * Seed initial data into the database
 */
async function seedData() {
  console.log('[db:migrate] Seeding initial data...');

  const passwordHash = await bcrypt.hash(userSeed.password, 12);
  await UserModel.findOrCreate({
    where: { email: userSeed.email },
    defaults: {
      id: userSeed.id,
      email: userSeed.email,
      fullName: userSeed.fullName,
      avatarUrl: userSeed.avatarUrl,
      passwordHash,
    },
  });

  for (const lesson of lessonSeeds) {
    await LessonModel.findOrCreate({
      where: { id: lesson.id },
      defaults: lesson,
    });
  }

  await ChatMessageModel.findOrCreate({
    where: { id: chatSeed.id },
    defaults: chatSeed,
  });

  await UserProgressModel.findOrCreate({
    where: { userEmail: progressSeed.userEmail, lessonId: progressSeed.lessonId },
    defaults: progressSeed,
  });

  console.log('[db:migrate] Seed data completed.');
}

/**
 * Main migration function
 */
async function run() {
  console.log('[db:migrate] Starting database migration...');

  // Initialize models and associations
  initModels();

  // Connect to database
  await sequelize.authenticate();
  console.log('[db:migrate] Database connection established.');

  // Check if this is a fresh database
  const isFresh = await isFreshDatabase();

  if (isFresh) {
    console.log('[db:migrate] Fresh database detected. Creating all tables from scratch...');
  } else {
    console.log('[db:migrate] Existing database detected. Syncing schema...');
  }

  // Sync schema - Sequelize will create tables if they don't exist, or update them if they do
  await sequelize.sync({ alter: false });
  console.log('[db:migrate] Database schema synced.');

  // Seed data
  await seedData();

  // Close connection
  await sequelize.close();
  console.log('[db:migrate] Migration completed successfully!');
}

run().catch((error) => {
  console.error('[db:migrate] Migration failed:', error);
  process.exit(1);
});
