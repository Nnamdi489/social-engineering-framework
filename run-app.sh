#!/bin/bash

# Social Engineering Research Framework - Run Script
# This script builds and serves the application correctly

echo "🔨 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Starting local server..."
    echo "⚠️  DO NOT open dist/index.html directly!"
    echo "✅ Use the URL that opens in your browser: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "----------------------------------------"
    
    npm run serve
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
