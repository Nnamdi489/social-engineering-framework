# Static Build Instructions

This document explains how to build and run the Social Engineering Research Framework as a static application.

## Important: CORS Policy Issue

Modern browsers block JavaScript modules when opened via `file://` protocol due to CORS (Cross-Origin Resource Sharing) policies. This means you **cannot** simply double-click `index.html` to open the app.

## Solution: Use a Local HTTP Server

### Quick Start (Recommended)
```bash
# Build and serve in one command
npm run build:static
npm run serve
```

### Step by Step
```bash
# 1. Build the application
npm run build

# 2. Serve it locally (choose one option)
npm run serve          # Node.js server (recommended)
npm run serve:python   # Python server
npm run serve:npx      # NPX serve package
```

## Configuration Changes Made

The following changes have been made to enable static file serving:

### 1. Vite Configuration (`vite.config.js`)
- Set `base: './'` to use relative paths
- Configured asset directory structure
- Optimized rollup output for static serving

### 2. Router Configuration (`src/router/index.js`)
- Changed from `createWebHistory()` to `createWebHashHistory()`
- This enables client-side routing without server configuration
- URLs will use hash-based routing (e.g., `#/research`, `#/simulation`)

## How to Use the Static Build

### After Building:
1. Build the application:
   ```bash
   npm run build:static
   ```

2. Start a local server:
   ```bash
   npm run serve
   ```

3. Open your browser to: `http://localhost:8080`

### Why Can't I Just Open index.html?

Modern browsers block JavaScript modules loaded via `file://` protocol for security reasons. You'll see errors like:
```
Access to script at 'file:///path/to/script.js' from origin 'null' has been blocked by CORS policy
```

**Solution**: Always use an HTTP server, even for local development.

### Browser Compatibility
The static build works with all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

### Features Available in Static Mode
All application features work in static mode:
- ✅ Research Framework
- ✅ Simulation Dashboard
- ✅ Attack Simulator
- ✅ Detection Center
- ✅ Analytics Dashboard
- ✅ Defense Training (with interactive modals)
- ✅ Documentation
- ✅ Local Storage persistence
- ✅ All interactive components

### Limitations of Static Mode
- No server-side functionality (not applicable to this frontend app)
- URLs will show hash-based routing (`#/page` instead of `/page`)
- Cannot use browser back/forward with clean URLs (hash routing handles this)

## File Structure After Build

```
dist/
├── index.html          # Main entry point - open this file
├── assets/
│   ├── index-[hash].js # Main application bundle
│   ├── index-[hash].css # Compiled styles
│   └── [other assets]  # Images, fonts, etc.
└── [other files]       # Additional build artifacts
```

## Deployment Options

### Static Hosting
You can deploy the `dist` folder to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server serving static files

### Local Development
For development, continue using:
```bash
npm run dev
```

This provides hot reload and development features.

## Server Options

### Option 1: Node.js Server (Recommended)
```bash
npm run serve
```
- ✅ No additional dependencies
- ✅ Automatic browser opening
- ✅ CORS headers included
- ✅ SPA routing support

### Option 2: Python Server
```bash
npm run serve:python
```
- ✅ Works if Python is installed
- ⚠️ May not handle SPA routing perfectly

### Option 3: NPX Serve
```bash
npm run serve:npx
```
- ✅ Full-featured static server
- ⚠️ Downloads package on first use

## Troubleshooting

### Issue: CORS errors when opening index.html directly
**Solution**: This is expected! Use `npm run serve` instead of opening the file directly.

### Issue: "Port already in use"
**Solution**:
```bash
# Kill process using port 8080
lsof -ti:8080 | xargs kill -9

# Or use a different port
PORT=8081 npm run serve
```

### Issue: Assets not loading
**Solution**: Always serve the entire `dist` folder, don't move individual files.

### Issue: Routing not working
**Solution**: The app uses hash-based routing. URLs look like `http://localhost:8080/#/research`

## Development vs Production

| Feature | Development (`npm run dev`) | Static Build (`npm run build:static`) |
|---------|----------------------------|---------------------------------------|
| Hot Reload | ✅ Yes | ❌ No |
| Source Maps | ✅ Yes | ✅ Yes (configurable) |
| File Size | Larger | Optimized/Minified |
| Server Required | ✅ Yes (Vite dev server) | ❌ No |
| URL Format | Clean URLs | Hash-based URLs |
| Performance | Development optimized | Production optimized |

## Additional Notes

- The build process creates optimized, minified files for production use
- All Vue.js reactivity and component features work normally
- Local storage and session storage work for data persistence
- The application is fully functional as a single-page application (SPA)
