@echo off
echo ========================================
echo   موقع الأستاذ إسلام الشناوي
echo   تشغيل الخادم المحلي
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo تشغيل الخادم باستخدام Python...
    echo الموقع متاح على: http://localhost:8000
    echo لوحة الإدارة: http://localhost:8000/admin.html
    echo.
    echo اضغط Ctrl+C لإيقاف الخادم
    echo.
    python -m http.server 8000
) else (
    REM Check if Node.js is installed
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo تشغيل الخادم باستخدام Node.js...
        echo الموقع متاح على: http://localhost:3000
        echo لوحة الإدارة: http://localhost:3000/admin.html
        echo.
        echo اضغط Ctrl+C لإيقاف الخادم
        echo.
        npx http-server . -p 3000 -o
    ) else (
        echo خطأ: لم يتم العثور على Python أو Node.js
        echo يرجى تثبيت أحدهما لتشغيل الخادم المحلي
        echo.
        echo أو افتح الملف index.html مباشرة في المتصفح
        pause
    )
)

pause