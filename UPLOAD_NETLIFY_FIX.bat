@echo off
echo ========================================
echo    🚨 رفع إصلاح Netlify - إجبار التحديث
echo ========================================
echo.

cd /d "c:\Users\hk102\Downloads\Elshenawy-main\Elshenawy-main"

echo 📁 التحقق من الملفات...
if not exist "index.html" (
    echo ❌ خطأ: لم يتم العثور على ملفات الموقع
    pause
    exit /b 1
)

echo ✅ تم العثور على ملفات الموقع

echo.
echo 🔧 الملفات المحدثة:
echo - ✅ index.html (version v20241214-003)
echo - ✅ netlify.toml (force rebuild)
echo - ✅ _headers (no-cache headers)
echo - ✅ netlify-emergency-fix.js (emergency script)
echo - ✅ FORCE_NETLIFY_UPDATE.md (instructions)

echo.
echo 📤 رفع الملفات إلى GitHub...
echo.

git add .
git commit -m "🚨 Netlify Fix: Force update v20241214-003 - Language toggle emergency fix"
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ تم رفع الملفات بنجاح!
    echo.
    echo 🌐 خطوات Netlify:
    echo 1. اذهب إلى Netlify Dashboard
    echo 2. اختر موقعك
    echo 3. اضغط "Site settings" → "Build & deploy"
    echo 4. اضغط "Clear cache and deploy site"
    echo.
    echo 🚨 أو استخدم الحل الطوارئ:
    echo 1. افتح الموقع على Netlify
    echo 2. اضغط F12 (Developer Tools)
    echo 3. اذهب إلى Console
    echo 4. الصق هذا الكود:
    echo.
    echo fetch('netlify-emergency-fix.js').then(r=>r.text()).then(eval);
    echo.
    echo 💡 هذا سيحمل نظام اللغة الطوارئ فوراً!
    echo.
) else (
    echo.
    echo ❌ فشل في رفع الملفات
    echo 💡 تأكد من:
    echo - تسجيل الدخول إلى Git
    echo - وجود اتصال بالإنترنت
    echo - صحة رابط المستودع
    echo.
)

echo ========================================
echo   🎯 نصائح إضافية لـ Netlify:
echo ========================================
echo.
echo 1. 🔄 Hard Refresh: Ctrl+Shift+R
echo 2. 🧹 Clear Browser Cache
echo 3. 🚨 Use Emergency Script in Console
echo 4. 📞 Contact Support if needed
echo.

pause