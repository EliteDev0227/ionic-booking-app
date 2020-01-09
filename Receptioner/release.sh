#!/bin/bash
#!/usr/bin/env expect
#rm AjwaSnacks.apk
ionic cordova build android --prod --release
rm beachReleaseFinal.apk
rm beach.apk
cp "platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" "beach.apk"
#cp ../app/platforms/android/build/outputs/apk/android-release-unsigned.apk AjwaSnacks.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore beach.keystore beach.apk sbcustomer
#expect "*?eystore:*"
#send "hillscable@123\r"
/Users/Mohideen/AppData/Local/Android/Sdk/build-tools/28.0.3/zipalign -v 4 beach.apk beachReleaseFinal.apk
/Users/Mohideen/AppData/Local/Android/Sdk/build-tools/28.0.3/apksigner verify beachReleaseFinal.apk


#28 bit key hash ga0RGNYHvNM5d0SLGQfpQWAPGJ8=