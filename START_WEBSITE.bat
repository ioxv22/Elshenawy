@echo off
echo ========================================
echo    🚀 تشغيل موقع الأستاذ إسلام الشناوي
echo ========================================
echo.

cd /d "c:\Users\hk102\Downloads\Elshenawy-main\Elshenawy-main"

echo 📁 التحقق من المجلد...
if not exist "index.html" (
    echo ❌ خطأ: لم يتم العثور على ملفات الموقع
    pause
    exit /b 1
)

echo ✅ تم العثور على ملفات الموقع

echo.
echo 🔧 إغلاق أي خوادم قديمة...
taskkill /f /im node.exe 2>nul
taskkill /f /im python.exe 2>nul

echo.
echo 🚀 تشغيل الخادم...
echo.
echo ========================================
echo   الموقع سيعمل على: http://localhost:8080
echo ========================================
echo.
echo 💡 نصائح:
echo - انسخ الرابط أعلاه والصقه في المتصفح
echo - شاشة التحميل ستظهر لثانيتين فقط
echo - يمكنك تخطيها بالنقر في أي مكان
echo - اضغط Ctrl+C لإغلاق الخادم
echo.
echo ========================================

node server.js

if %errorlevel% neq 0 (
    echo.
    echo ❌ فشل في تشغيل Node.js
    echo 💡 جرب تشغيل Python بدلاً من ذلك:
    echo python -m http.server 8080
    echo.
    pause
)