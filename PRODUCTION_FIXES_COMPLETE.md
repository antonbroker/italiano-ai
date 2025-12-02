# Complete Production Deployment Fixes

## ✅ All Issues Fixed

### 1. CORS Configuration (Fixed)
**File:** `backend/src/app.ts`

**Changes:**
- Added explicit origin validation function
- Added proper preflight handling with `maxAge`
- Added `exposedHeaders: ['Set-Cookie']` to expose cookie headers
- Added logging for debugging

**Key Features:**
- Handles multiple origins from `CORS_ORIGIN` env variable
- Allows requests with no origin (for mobile apps, Postman)
- Logs blocked origins for debugging

### 2. Cookie Configuration (Fixed)
**File:** `backend/src/utils/authToken.ts`

**Changes:**
- Production: `sameSite: 'none'`, `secure: true` (required for cross-origin)
- Development: `sameSite: 'lax'`, `secure: false` (works locally)
- Added logging to track cookie settings
- `clearAuthCookie` now includes all required options

**Critical:** Cookies work cross-origin because:
- `sameSite: 'none'` allows cross-origin cookies
- `secure: true` is required when `sameSite: 'none'`
- No `domain` set (allows cookies to work across domains)

### 3. Helmet Configuration (Fixed)
**File:** `backend/src/app.ts`

**Changes:**
- Disabled `contentSecurityPolicy` (can interfere with cookies)
- Disabled `crossOriginEmbedderPolicy` (blocks cross-origin requests)
- Added `crossOriginResourcePolicy: { policy: 'cross-origin' }`

### 4. SPA Routing (Fixed)
**Files:**
- `frontend/vercel.json` - For Vercel deployment
- `frontend/public/_redirects` - For Render static site
- `frontend/render.yaml` - For Render web service

---

## 🔧 Required Environment Variables

### Backend (Render)

**Required variables:**
```
CORS_ORIGIN=https://italiano-ai-frontend.vercel.app,https://italiano-ai-1.onrender.com
NODE_ENV=production
DATABASE_URL=<your-postgres-url>
JWT_SECRET=<your-secret>
SESSION_COOKIE_NAME=italiano_ai_session
PORT=10000
```

**Important:**
- `CORS_ORIGIN` must include ALL frontend URLs (comma-separated, no spaces after commas)
- Each origin must include `https://` protocol
- `NODE_ENV=production` is critical for cookie settings

### Frontend (Vercel)

**Required variable:**
```
VITE_API_BASE_URL=https://italiano-ai.onrender.com/api
```

**Important:**
- Must use `https://` (not `http://`)
- Must include `/api` at the end
- Must match your backend URL exactly

### Frontend (Render)

**Required variable:**
```
VITE_API_BASE_URL=https://italiano-ai.onrender.com/api
```

---

## 📋 Deployment Checklist

### Backend (Render)

- [ ] Set `CORS_ORIGIN` with all frontend URLs (comma-separated)
- [ ] Set `NODE_ENV=production`
- [ ] Verify all other environment variables are set
- [ ] Redeploy backend service
- [ ] Check logs for CORS and cookie messages

### Frontend (Vercel)

- [ ] Set `VITE_API_BASE_URL` environment variable
- [ ] Verify `vercel.json` is in repository
- [ ] Redeploy frontend
- [ ] Test direct navigation to `/login` (should not 404)

### Frontend (Render)

- [ ] Set `VITE_API_BASE_URL` environment variable
- [ ] Verify `public/_redirects` is in repository
- [ ] If using web service, verify `render.yaml` is configured
- [ ] Redeploy frontend
- [ ] Test direct navigation to `/login` (should not 404)

---

## 🧪 Testing After Deployment

### 1. Test CORS

**In browser console:**
```javascript
fetch('https://italiano-ai.onrender.com/api/health', {
  credentials: 'include'
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected:**
- No CORS errors
- Response: `{ status: 'ok' }`
- Response headers include `Access-Control-Allow-Origin`

### 2. Test Authentication

1. Navigate to login page
2. Enter credentials
3. Open DevTools → Network tab
4. Submit login form
5. Check response:
   - Status: `200 OK`
   - Response headers include `Set-Cookie`
   - Response body contains user object

6. Check cookies:
   - DevTools → Application → Cookies
   - Should see `italiano_ai_session` cookie
   - Cookie should have:
     - `SameSite=None`
     - `Secure` checked
     - Domain: `italiano-ai.onrender.com`

7. Test `/auth/me`:
   - Should return user object (not 401)
   - Cookie should be sent automatically

### 3. Test SPA Routing

1. Navigate to `https://your-frontend.com/login`
2. Refresh the page
3. Should NOT get 404
4. Page should load correctly

---

## 🐛 Troubleshooting

### Still getting CORS errors?

1. **Check backend logs:**
   - Look for `[CORS] Allowed origins:` message
   - Look for `[CORS] Blocked origin:` warnings
   - Verify your frontend URL is in the list

2. **Verify environment variable:**
   - `CORS_ORIGIN` must match frontend URL exactly
   - Include `https://` protocol
   - No trailing slashes

3. **Check preflight requests:**
   - Network tab → Filter by "OPTIONS"
   - Should see `200 OK` for OPTIONS requests
   - Response headers should include CORS headers

### Still getting 401 errors?

1. **Check cookies are being set:**
   - DevTools → Application → Cookies
   - Should see cookie from backend domain
   - Cookie must have `SameSite=None` and `Secure` in production

2. **Check cookie is being sent:**
   - Network tab → Request Headers
   - Should see `Cookie: italiano_ai_session=...`

3. **Verify backend environment:**
   - `NODE_ENV=production` must be set
   - Check backend logs for cookie messages

4. **Check backend logs:**
   - Look for `[Cookie] Set cookie:` messages
   - Verify `SameSite=None, Secure=true` in production

### Still getting 404 on refresh?

1. **Vercel:**
   - Verify `vercel.json` is in `frontend/` directory
   - Verify it's committed to git
   - Check Vercel build logs

2. **Render (Static Site):**
   - Verify `public/_redirects` exists
   - Content should be: `/*    /index.html   200`

3. **Render (Web Service):**
   - Verify `render.yaml` is configured
   - Or handle routing in your Express app

---

## 📝 Code Summary

### Complete Express Middleware Setup

```typescript
// CORS with origin validation
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400,
  }),
);

// Helmet configured for cross-origin
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
```

### Complete Cookie Configuration

```typescript
// Production: SameSite=None, Secure=true (cross-origin)
// Development: SameSite=Lax, Secure=false (same-origin)
const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
  secure: env.nodeEnv === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
  // No domain set - allows cross-origin cookies
});
```

---

## ✅ Verification Commands

After deployment, verify in browser console:

```javascript
// Test CORS
fetch('https://italiano-ai.onrender.com/api/health', {
  credentials: 'include'
}).then(r => r.json()).then(console.log);

// Test login
fetch('https://italiano-ai.onrender.com/api/auth/login', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'learner@italiano.ai',
    password: 'LearnItalian123!'
  })
}).then(r => r.json()).then(console.log);

// Test /auth/me (after login)
fetch('https://italiano-ai.onrender.com/api/auth/me', {
  credentials: 'include'
}).then(r => r.json()).then(console.log);
```

All requests should succeed without CORS errors, and cookies should be set and sent automatically.

