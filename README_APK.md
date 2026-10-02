# Release Date Calculator - Android APK Conversion

## ⚠️ Important Note

**This environment can configure everything for APK conversion, but cannot compile the final APK.** You need to build the APK on your local machine with Android Studio installed.

## Quick Start (5 Steps)

### 1. Download This Project
Download all project files to your computer.

### 2. Install Prerequisites
- **Node.js** (v16+): https://nodejs.org/
- **Android Studio**: https://developer.android.com/studio

### 3. Run Build Script

**On Mac/Linux:**
```bash
chmod +x build-apk.sh
./build-apk.sh
```

**On Windows:**
```bash
build-apk.bat
```

### 4. Open in Android Studio
```bash
npx cap open android
```

### 5. Build APK in Android Studio
1. Wait for Gradle sync
2. Go to: **Build** → **Generate Signed Bundle / APK**
3. Select **APK**
4. Create/choose keystore
5. Select **release** build type
6. Click **Finish**

Your APK will be at: `android/app/release/app-release.apk`

## What's Already Configured

✅ Capacitor installed and configured  
✅ Mobile-optimized HTML with proper meta tags  
✅ PWA manifest for app-like experience  
✅ App icon generated (512x512)  
✅ Build automation scripts created  
✅ Comprehensive build guide written  

## Files Created

- `capacitor.config.ts` - Capacitor configuration
- `public/manifest.json` - PWA manifest
- `build-apk.sh` - Mac/Linux build script
- `build-apk.bat` - Windows build script
- `ANDROID_BUILD_GUIDE.md` - Detailed build instructions
- `README_APK.md` - This file (quick start guide)

## Detailed Instructions

For complete step-by-step instructions including:
- App signing setup
- Icon configuration
- Play Store submission
- Troubleshooting

See: **ANDROID_BUILD_GUIDE.md**

## Testing Before Upload

Before uploading to Google Play Store:

1. **Test on device**: Install APK on Android phone
2. **Test all features**:
   - Date calculations
   - Adjustments
   - Print/PDF
   - Save/Load data
   - Language switching (English/Urdu)
3. **Check UI**: Ensure layout works on different screen sizes
4. **Test offline**: App should work without internet

## Google Play Store Requirements

To upload to Play Store, you'll need:

- **Developer Account**: $25 one-time fee
- **App Icon**: 512x512 PNG (already generated)
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: At least 2 phone screenshots
- **Privacy Policy**: URL to privacy policy page
- **App Description**: Short (80 chars) and full (4000 chars)

## App Information for Play Store

**App Name:** Release Date Calculator  
**Package Name:** com.prisondepartment.releasedatecalculator  
**Category:** Productivity  
**Description:** Calculate prison release dates with remission and adjustments. Features include automatic PDR calculation, multiple deductions support, and PDF export.

**Privacy Policy Template:**
```
This app does not collect, store, or transmit any personal data. 
All calculations are performed locally on your device. 
Saved records are stored only on your device and are not 
transmitted to any server.
```

## Troubleshooting

**Problem:** "SDK location not found"  
**Solution:** Set ANDROID_HOME environment variable or create `android/local.properties` with SDK path

**Problem:** "Keystore password incorrect"  
**Solution:** Regenerate keystore or double-check password

**Problem:** App crashes on device  
**Solution:** Check Android Studio logcat for errors

For more issues, see **ANDROID_BUILD_GUIDE.md**

## Support

- Capacitor Docs: https://capacitorjs.com/docs
- Android Docs: https://developer.android.com/studio
- Play Console: https://play.google.com/console

## Next Steps After APK Build

1. Test thoroughly on multiple devices
2. Create screenshots and promotional graphics
3. Write privacy policy and host it online
4. Create Google Play Console account ($25)
5. Upload APK and complete store listing
6. Submit for review (takes 1-7 days)

---

**Note:** The actual APK compilation requires Android Studio and must be done locally. This project is fully configured and ready for you to build.
