## Italiano AI Backend

Node.js + Express API that powers the Italiano AI frontend without relying on Base44.

### Stack

- Express 4 with TypeScript
- PostgreSQL managed through Sequelize ORM
- Zod for runtime validation
- Helmet, CORS, Morgan for HTTP best practices

### Getting Started

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp env.example .env   # or copy manually
   ```
   Update credentials as needed (database URLs, `JWT_SECRET`, etc.).

3. **Provision database (optional helper)**
   ```bash
   npm run db:init   # creates italiantutor DB + sets postgres password from .env
   ```

4. **Sync schema + seed data**
   ```bash
   npm run db:migrate
   ```

5. **Start the API**
   ```bash
   # Development (auto-reload)
   npm run dev

   # Production build
   npm run build
   npm start
   ```

The API is available at `http://localhost:5000/api`.

Default seeded login: `learner@italiano.ai / LearnItalian123!`

### Available Routes

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/lessons`
- `GET /api/lessons/:id`
- `POST /api/lessons` *(optional admin)*
- `PUT /api/lessons/:id` *(optional admin)*
- `DELETE /api/lessons/:id` *(optional admin)*
- `GET /api/user-progress?userEmail=...&lessonId=...`
- `POST /api/user-progress` (upsert)
- `PUT /api/user-progress/:id`
- `GET /api/chat-messages?userEmail=...&limit=100`
- `POST /api/chat-messages`

Seed data replicates the CSV models that were previously provided by Base44.

