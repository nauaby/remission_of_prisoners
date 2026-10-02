@echo off
REM Release Date Calculator - APK Build Script for Windows
REM This script automates the process of building an Android APK

echo ==========================================
echo Release Date Calculator - APK Builder
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Error: npm is not installed
    exit /b 1
)

echo [OK] npm found
npm --version
echo.

REM Step 1: Install dependencies
echo Step 1: Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo X Error: Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Step 2: Build web app
echo Step 2: Building web app...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo X Error: Failed to build web app
    pause
    exit /b 1
)
echo [OK] Web app built successfully
echo.

REM Step 3: Check if Android platform exists
if not exist "android" (
    echo Step 3: Adding Android platform...
    call npx cap add android
    if %ERRORLEVEL% NEQ 0 (
        echo X Error: Failed to add Android platform
        pause
        exit /b 1
    )
    echo [OK] Android platform added
) else (
    echo Step 3: Android platform already exists
)
echo.

REM Step 4: Sync web assets
echo Step 4: Syncing web assets to Android...
call npx cap sync android
if %ERRORLEVEL% NEQ 0 (
    echo X Error: Failed to sync assets
    pause
    exit /b 1
)
echo [OK] Assets synced successfully
echo.

REM Step 5: Instructions for next steps
echo ==========================================
echo [OK] Build Complete!
echo ==========================================
echo.
echo Next steps:
echo.
echo 1. Open Android Studio:
echo    npx cap open android
echo.
echo 2. In Android Studio:
echo    - Wait for Gradle sync to complete
echo    - Configure signing (see ANDROID_BUILD_GUIDE.md)
echo    - Build ^> Generate Signed Bundle / APK
echo.
echo 3. Or build from command line:
echo    cd android
echo    gradlew.bat assembleRelease
echo.
echo 4. The APK will be at:
echo    android\app\build\outputs\apk\release\app-release.apk
echo.
echo For detailed instructions, see: ANDROID_BUILD_GUIDE.md
echo.
echo ==========================================
pause
