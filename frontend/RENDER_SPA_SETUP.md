# Render SPA Routing Setup

## Configuration Files

### 1. `public/_redirects` (Primary Method)
This file is automatically copied to `dist/` during build and handles SPA routing.

**Content:**
```
/*    /index.html   200
```

**How it works:**
- Vite copies everything from `public/` to `dist/` during build
- Render reads `_redirects` from the `dist/` folder
- All routes are rewritten to `/index.html` with 200 status

### 2. `render.yaml` (Alternative Method)
This file can be used if `_redirects` doesn't work.

**Content:**
```yaml
staticPublishPath: ./dist
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

## Render Dashboard Configuration

When setting up the static site on Render:

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables:**
   - `VITE_API_BASE_URL=https://italiano-ai.onrender.com/api`

## Verification

After deployment:

1. Navigate to: `https://your-app.onrender.com/login`
2. Refresh the page
3. Should NOT get 404 - page should load correctly

## Troubleshooting

If SPA routing still doesn't work:

1. **Check build output:**
   - Verify `dist/_redirects` file exists after build
   - Content should be: `/*    /index.html   200`

2. **Check Render dashboard:**
   - Verify "Publish Directory" is set to `dist`
   - Verify build command is `npm run build`

3. **Manual test:**
   - Build locally: `npm run build`
   - Check `dist/_redirects` exists
   - Content should match `public/_redirects`

## Both Methods

Both `_redirects` and `render.yaml` are configured. The `_redirects` file is the primary method and should work automatically. The `render.yaml` serves as a backup configuration.

