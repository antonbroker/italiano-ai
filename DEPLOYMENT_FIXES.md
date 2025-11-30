# Production Deployment Fixes

## Issues Identified and Fixed

### Issue 1: Vercel SPA Routing (404 on refresh)

**Problem:** `vercel.json` was rewriting to `/` instead of `/index.html`

**Fix:** Updated `vercel.json` to explicitly rewrite to `/index.html`

**File Changed:** `frontend/vercel.json`

---

### Issue 2: Cross-Origin Cookies Not Working

**Problem:** Multiple issues preventing cookies from working across domains:

1. **Cookie `sameSite` was `'lax'`** - This only works for same-site requests. For cross-origin (Vercel → Render), it must be `'none'` with `secure: true`.

2. **Helmet blocking cookies** - Helmet's default configuration was interfering with cross-origin cookie handling.

3. **`clearAuthCookie` missing options** - When clearing cookies, all the same options must be provided.

**Fixes Applied:**

1. **`backend/src/utils/authToken.ts`**:
   - Changed `sameSite` from `'lax'` to `'none'` in production (keeps `'lax'` for development)
   - Updated `clearAuthCookie` to include all cookie options

2. **`backend/src/app.ts`**:
   - Configured Helmet to allow cross-origin cookies
   - Added explicit CORS methods and headers
   - Disabled `crossOriginEmbedderPolicy` which can block cookies

---

## Required Environment Variables

### Render (Backend)

Ensure these are set in Render dashboard:

```
CORS_ORIGIN=https://italiano-ai-frontend.vercel.app
NODE_ENV=production
DATABASE_URL=<your-postgres-url>
JWT_SECRET=<your-secret>
SESSION_COOKIE_NAME=italiano_ai_session
```

**Important:** `CORS_ORIGIN` must match your Vercel frontend URL exactly (including `https://`).

### Vercel (Frontend)

Add this environment variable in Vercel dashboard:

```
VITE_API_BASE_URL=https://italiano-ai.onrender.com/api
```

**Important:** 
- Must start with `https://` (not `http://`)
- Must include `/api` at the end
- Must match your Render backend URL exactly

---

## Deployment Steps

### 1. Backend (Render)

1. Go to your Render dashboard
2. Verify environment variables (especially `CORS_ORIGIN`)
3. Redeploy the service (or push changes to trigger auto-deploy)

### 2. Frontend (Vercel)

1. Go to your Vercel dashboard
2. Add/update environment variable `VITE_API_BASE_URL`
3. Redeploy the service (or push changes to trigger auto-deploy)

---

## Testing After Deployment

1. **Test SPA Routing:**
   - Navigate to `https://italiano-ai-frontend.vercel.app/login`
   - Refresh the page
   - Should NOT get 404

2. **Test Authentication:**
   - Try to login
   - Check browser DevTools → Application → Cookies
   - Should see cookie `italiano_ai_session` with:
     - `SameSite=None`
     - `Secure` checked
     - Domain should be your Render domain

3. **Test CORS:**
   - Open browser DevTools → Network tab
   - Make a request to backend
   - Check response headers:
     - `Access-Control-Allow-Origin: https://italiano-ai-frontend.vercel.app`
     - `Access-Control-Allow-Credentials: true`

---

## Troubleshooting

### Still getting 401 errors?

1. **Check cookie is being set:**
   - DevTools → Application → Cookies
   - Should see cookie from Render domain

2. **Check CORS headers:**
   - Network tab → Response Headers
   - Should see `Access-Control-Allow-Origin` with your frontend URL

3. **Check environment variables:**
   - Render: `CORS_ORIGIN` must match frontend URL exactly
   - Vercel: `VITE_API_BASE_URL` must be correct

### Still getting 404 on refresh?

1. Verify `vercel.json` is in the `frontend` directory
2. Verify it's committed to git
3. Redeploy on Vercel

### Cookies not persisting?

1. Verify `NODE_ENV=production` on Render
2. Verify frontend is using `https://` (not `http://`)
3. Check browser console for cookie warnings

---

## Summary of Changes

### Files Modified:

1. `frontend/vercel.json` - Fixed rewrite destination
2. `backend/src/utils/authToken.ts` - Fixed cookie `sameSite` and `clearAuthCookie`
3. `backend/src/app.ts` - Configured Helmet and CORS for cross-origin

### Key Points:

- Cookies now use `sameSite: 'none'` in production (required for cross-origin)
- Helmet configured to not block cross-origin cookies
- CORS explicitly allows credentials and required methods
- Vercel routing now correctly serves `index.html` for all routes

