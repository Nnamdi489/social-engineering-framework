#!/usr/bin/env node

/**
 * Simple static file server for the built application
 * This solves CORS issues when opening the app directly in browser
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, 'dist');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, serve index.html for SPA routing
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end(content, 'utf-8');
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Remove leading slash
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(DIST_DIR, pathname);

  // Security check - ensure file is within dist directory
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  serveFile(filePath, res);
});

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: dist directory not found!');
  console.log('Please run "npm run build" first to create the dist directory.');
  process.exit(1);
}

server.listen(PORT, () => {
  console.log('🚀 Static server running!');
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://[your-ip]:${PORT}`);
  console.log('');
  console.log('📁 Serving files from: ' + DIST_DIR);
  console.log('⏹️  Press Ctrl+C to stop the server');
  
  // Try to open browser automatically
  const open = (url) => {
    const { exec } = require('child_process');
    const command = process.platform === 'darwin' ? 'open' : 
                   process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${command} ${url}`);
  };
  
  setTimeout(() => {
    try {
      open(`http://localhost:${PORT}`);
    } catch (err) {
      console.log('Could not open browser automatically. Please open http://localhost:' + PORT + ' manually.');
    }
  }, 1000);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log(`Try running with a different port: PORT=8081 node serve-static.js`);
  } else {
    console.error('❌ Server error:', err);
  }
});
