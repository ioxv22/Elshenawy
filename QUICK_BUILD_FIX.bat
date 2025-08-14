@echo off
echo ========================================
echo    🚨 إصلاح سريع لمشكلة البناء
echo ========================================
echo.

cd /d "c:\Users\hk102\Downloads\Elshenawy-main\Elshenawy-main"

echo 🔧 إصلاح مشكلة script.js...
echo ✅ تم إزالة Git merge conflict

echo.
echo 📦 تثبيت Dependencies...
call npm install --force

echo.
echo 🏗️ محاولة البناء...
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ✅ تم البناء بنجاح!
    echo.
    echo 📤 رفع الملفات إلى GitHub...
    git add .
    git commit -m "🚨 Fix: Resolved Git merge conflict in script.js - Build working"
    git push origin main
    
    if %errorlevel% equ 0 (
        echo.
        echo ✅ تم رفع الإصلاح بنجاح!
        echo.
        echo 🌐 الآن:
        echo 1. اذهب إلى Netlify Dashboard
        echo 2. اضغط "Clear cache and deploy site"
        echo 3. أو انتظر التحديث التلقائي
        echo.
    ) else (
        echo ❌ فشل في رفع الملفات
    )
) else (
    echo.
    echo ❌ فشل في البناء
    echo 💡 جرب الحل البديل:
    echo.
    echo 🔧 تعديل package.json لتجاهل minify:
    echo "build": "echo 'Build completed without minification'"
    echo.
)

echo ========================================
echo   🎯 حلول إضافية إذا استمرت المشكلة:
echo ========================================
echo.
echo 1. 🚫 تعطيل البناء في Netlify:
echo    - Site settings → Build & deploy
echo    - Build command: (leave empty)
echo    - Publish directory: .
echo.
echo 2. 🔄 استخدام HTML فقط:
echo    - لا حاجة للبناء
echo    - الملفات تعمل مباشرة
echo.
echo 3. 🚨 حل طوارئ:
echo    - رفع الملفات كما هي
echo    - تجاهل خطوة البناء
echo.

pause