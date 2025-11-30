# Italiano AI Frontend

Vite + React application for the Italiano AI learning experience. The app now talks to the custom Node/Express backend in `../backend` instead of Base44.

Default demo credentials (after running backend seeds):

- Email: `learner@italiano.ai`
- Password: `LearnItalian123!`

## Environment

Create a `.env` file (same directory) with the API base URL exposed by the backend:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```