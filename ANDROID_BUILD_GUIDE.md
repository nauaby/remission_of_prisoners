# Release Date Calculator - Android APK Build Guide

This guide will help you convert the web app into an Android APK for Google Play Store submission.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **Android Studio** - [Download](https://developer.android.com/studio)
3. **Java JDK 17** (comes with Android Studio)
4. **Android SDK** (installed via Android Studio)

## Step 1: Install Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

## Step 2: Build the Web App

Build the production version of the web app:

```bash
npm run build
```

This creates the `dist` folder with optimized files.

## Step 3: Initialize Capacitor for Android

Add the Android platform to your project:

```bash
npx cap add android
```

This creates an `android` folder with the native Android project.

## Step 4: Sync Web Assets to Android

Copy the built web files to the Android project:

```bash
npx cap sync android
```

## Step 5: Open in Android Studio

Open the Android project in Android Studio:

```bash
npx cap open android
```

Android Studio will open with the project loaded.

## Step 6: Configure App Signing (Required for Play Store)

### Generate a Keystore

In Android Studio or terminal, generate a signing key:

```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release-key
```

You'll be prompted to create a password. **Remember this password!**

### Configure Gradle

1. In Android Studio, open `android/app/build.gradle`
2. Add the signing configuration:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../release-key.jks')
            storePassword 'YOUR_PASSWORD'
            keyAlias 'release-key'
            keyPassword 'YOUR_PASSWORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

**Important:** Replace `YOUR_PASSWORD` with your actual keystore password.

## Step 7: Update App Configuration

### Update App Name and Package

1. Open `android/app/src/main/AndroidManifest.xml`
2. Verify the package name: `com.prisondepartment.releasedatecalculator`
3. Update the app name if needed

### Update Version Code and Name

In `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        ...
        versionCode 1
        versionName "1.0.0"
    }
}
```

**Note:** For Play Store updates, increment `versionCode` each time.

## Step 8: Configure App Icons

You need to provide app icons in various sizes:

1. Create icons in these sizes:
   - 48x48 (mdpi)
   - 72x72 (hdpi)
   - 96x96 (xhdpi)
   - 144x144 (xxhdpi)
   - 192x192 (xxxhdpi)

2. Place them in:
   - `android/app/src/main/res/mipmap-mdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-hdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`

**Tip:** Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) to generate all sizes from one image.

## Step 9: Build the APK

### Option A: Using Android Studio (Recommended)

1. In Android Studio, go to **Build** → **Generate Signed Bundle / APK**
2. Select **APK**
3. Choose your keystore file and enter passwords
4. Select **release** build type
5. Check **V1 (Jar Signature)** and **V2 (Full APK Signature)**
6. Click **Finish**
7. The APK will be generated at: `android/app/release/app-release.apk`

### Option B: Using Command Line

From the `android` folder:

```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Step 10: Test the APK

Before uploading to Play Store:

1. Transfer the APK to an Android device
2. Enable "Install from Unknown Sources" in device settings
3. Install and test the app thoroughly
4. Test all features:
   - Date calculations
   - Adjustments
   - Print/PDF export
   - Save/Load data
   - Language switching

## Step 11: Prepare for Google Play Store

### Required Assets

1. **App Icon**: 512x512 PNG
2. **Feature Graphic**: 1024x500 PNG
3. **Screenshots**: At least 2 screenshots (phone), optional tablet
4. **Promotional Graphic** (optional): 180x120 PNG

### App Store Listing Information

Prepare the following:

- **App Name**: Release Date Calculator
- **Short Description** (80 chars max): "Calculate prison release dates with remission and adjustments"
- **Full Description** (4000 chars max): Detailed description of features
- **Category**: Productivity or Business
- **Contact Information**: Email, website, phone
- **Privacy Policy**: Required URL to your privacy policy

### Privacy Policy

You need a privacy policy URL. You can:
- Create a simple page on your website
- Use a service like [privacypolicies.com](https://www.privacypolicies.com/)
- Host it on GitHub Pages

Example privacy policy text:
```
This app does not collect, store, or transmit any personal data. 
All calculations are performed locally on your device. 
Saved records are stored only on your device and are not transmitted to any server.
```

## Step 12: Upload to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in the store listing details
4. Upload screenshots and graphics
5. Set pricing and distribution
6. Complete content rating questionnaire
7. Upload your signed APK
8. Submit for review

## Troubleshooting

### Build Errors

**Error: "SDK location not found"**
- Set `ANDROID_HOME` environment variable to your Android SDK path
- Or create `android/local.properties` with: `sdk.dir=/path/to/android/sdk`

**Error: "Keystore was tampered with or password was incorrect"**
- Double-check your keystore password
- Regenerate the keystore if needed

**Error: "Minimum supported Gradle version"**
- Update Gradle wrapper in `android/gradle/wrapper/gradle-wrapper.properties`

### App Crashes

- Check Android Studio logcat for errors
- Ensure all dependencies are installed
- Verify the web build completed successfully

### Icons Not Showing

- Ensure icon files are in the correct mipmap folders
- Use PNG format with transparency support
- Clear app cache and reinstall

## Updating the App

To release an update:

1. Make your code changes
2. Update `versionCode` in `build.gradle` (must be higher than previous)
3. Update `versionName` if needed
4. Rebuild: `npm run build && npx cap sync android`
5. Generate new signed APK
6. Upload to Play Console as a new release

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Documentation](https://developer.android.com/studio)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Signing Best Practices](https://developer.android.com/studio/publish/app-signing)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Search [Capacitor GitHub Issues](https://github.com/ionic-team/capacitor/issues)
3. Post on [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

---

**Note**: The actual APK building requires Android Studio and must be done on your local machine. This environment can configure everything but cannot compile the final APK.
