#!/bin/bash

# Release Date Calculator - APK Build Script
# This script automates the process of building an Android APK

echo "=========================================="
echo "Release Date Calculator - APK Builder"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✓ npm found: $(npm --version)"
echo ""

# Step 1: Install dependencies
echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Step 2: Build web app
echo "Step 2: Building web app..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to build web app"
    exit 1
fi
echo "✓ Web app built successfully"
echo ""

# Step 3: Check if Android platform exists
if [ ! -d "android" ]; then
    echo "Step 3: Adding Android platform..."
    npx cap add android
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to add Android platform"
        exit 1
    fi
    echo "✓ Android platform added"
else
    echo "Step 3: Android platform already exists"
fi
echo ""

# Step 4: Sync web assets
echo "Step 4: Syncing web assets to Android..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to sync assets"
    exit 1
fi
echo "✓ Assets synced successfully"
echo ""

# Step 5: Instructions for next steps
echo "=========================================="
echo "✅ Build Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Open Android Studio:"
echo "   npx cap open android"
echo ""
echo "2. In Android Studio:"
echo "   - Wait for Gradle sync to complete"
echo "   - Configure signing (see ANDROID_BUILD_GUIDE.md)"
echo "   - Build → Generate Signed Bundle / APK"
echo ""
echo "3. Or build from command line:"
echo "   cd android"
echo "   ./gradlew assembleRelease"
echo ""
echo "4. The APK will be at:"
echo "   android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "For detailed instructions, see: ANDROID_BUILD_GUIDE.md"
echo ""
echo "=========================================="
