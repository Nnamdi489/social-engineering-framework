@echo off
echo 🔨 Building the application...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo.
    echo 🚀 Starting local server...
    echo ⚠️  DO NOT open dist/index.html directly!
    echo ✅ Use the URL that opens in your browser: http://localhost:8080
    echo.
    echo Press Ctrl+C to stop the server
    echo ----------------------------------------
    
    call npm run serve
) else (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)
