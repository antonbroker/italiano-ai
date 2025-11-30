CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    topics TEXT[] NOT NULL DEFAULT '{}',
    duration TEXT,
    content TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY,
    user_email TEXT NOT NULL,
    message TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'tutor')),
    lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_messages_user_email_idx ON chat_messages (user_email, created_at DESC);

CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY,
    user_email TEXT NOT NULL,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    progress_percentage SMALLINT NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_email, lesson_id)
);

INSERT INTO users (id, email, full_name, avatar_url)
VALUES ('0194d8f2-0a45-7c20-b5f0-9f6e2d41a001', 'learner@italiano.ai', 'Demo Learner', 'https://avatars.githubusercontent.com/u/9919?v=4')
ON CONFLICT (email) DO NOTHING;

INSERT INTO lessons (id, title, description, level, topics, duration, content, created_at, updated_at)
VALUES
('0194d900-5c12-7c41-8f01-2b5d3c1aa101', 'Italian Greetings & Basics', 'Learn essential Italian greetings, introductions, and everyday phrases to start conversations with confidence.', 'beginner', ARRAY['Greetings','Introductions','Basic Phrases','Pronunciation'], '30 min', 'Welcome to your first Italian lesson!

In this lesson, you''ll learn:

1. Basic Greetings:
   - Ciao! (Hello/Goodbye - informal)
   - Buongiorno! (Good morning/Good day)
   - Buonasera! (Good evening)
   - Buonanotte! (Good night)

2. Introductions:
   - Mi chiamo... (My name is...)
   - Come ti chiami? (What''s your name? - informal)
   - Piacere! (Nice to meet you!)

3. Common Phrases:
   - Grazie (Thank you)
   - Prego (You''re welcome)
   - Scusi (Excuse me - formal)
   - Per favore (Please)

Practice these phrases daily and you''ll be ready to have your first Italian conversation!', '2025-11-24T07:27:16.564Z', '2025-11-24T07:27:16.564Z'),
('0194d900-5c12-7c42-8f01-2b5d3c1aa102', 'Italian Numbers & Ordering Food', 'Master Italian numbers from 1-100 and learn how to order food at restaurants like a local.', 'beginner', ARRAY['Numbers','Food Vocabulary','Restaurant Phrases','Ordering'], '45 min', 'Benvenuto! Welcome to lesson 2!

In this lesson, you''ll learn:

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

Practice ordering your favorite Italian dishes!', '2025-11-24T07:27:16.564Z', '2025-11-24T07:27:16.564Z'),
('0194d900-5c12-7c43-8f01-2b5d3c1aa103', 'Italian Past Tense & Storytelling', 'Learn to talk about past events using the passato prossimo tense and share your experiences in Italian.', 'intermediate', ARRAY['Past Tense','Verb Conjugation','Storytelling','Time Expressions'], '60 min', 'Ciao again! Ready for an intermediate challenge?

In this lesson, you''ll learn:

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

Practice telling stories about your day, your vacation, or your experiences!', '2025-11-24T07:27:16.564Z', '2025-11-24T07:27:16.564Z')
ON CONFLICT (id) DO NOTHING;

INSERT INTO chat_messages (id, user_email, message, role, lesson_id, created_at, updated_at)
VALUES (
    '0194d93f-19b4-7d10-8c21-5f6a8e3bb201',
    'thezuck@gmail.com',
    'bla bla',
    'user',
    NULL,
    '2025-11-24T07:44:54.967Z',
    '2025-11-24T07:44:54.967Z'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_progress (id, user_email, lesson_id, completed, progress_percentage, created_at, updated_at)
VALUES (
    '0194d93f-19b4-7d11-8c21-5f6a8e3bb202',
    'thezuck@gmail.com',
    '0194d900-5c12-7c41-8f01-2b5d3c1aa101',
    TRUE,
    66,
    '2025-11-24T07:44:37.967Z',
    '2025-11-24T07:44:37.967Z'
)
ON CONFLICT (user_email, lesson_id) DO NOTHING;

