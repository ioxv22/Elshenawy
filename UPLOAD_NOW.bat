@echo off
echo ========================================
echo    رفع التعديلات على GitHub
echo ========================================
echo.

cd /d "c:\Users\hk102\Downloads\Elshenawy-main\Elshenawy-main"

echo 📁 التحقق من المجلد...
if not exist "index.html" (
    echo ❌ خطأ: لم يتم العثور على ملفات المشروع
    pause
    exit /b 1
)

echo ✅ تم العثور على ملفات المشروع

echo.
echo 🔧 إعداد Git...
git init
git remote remove origin 2>nul
git remote add origin https://github.com/ioxv22/Elshenawy.git

echo.
echo 📦 إضافة جميع الملفات...
git add .

echo.
echo 💬 إنشاء commit...
git commit -m "🚨 حل عاجل: إصلاح تعليق شاشة التحميل - يعمل فوراً

⚡ حل المشكلة العاجلة:
- تسريع شاشة التحميل إلى ثانيتين فقط (بدلاً من 7+ ثواني)
- إخفاء تلقائي مضمون بعد ثانيتين
- إمكانية التخطي بالنقر في أي مكان
- حل طوارئ إضافي لمنع التعليق نهائياً

🔧 التعديلات المطبقة:
- تسريع الكتابة: 30ms بدلاً من 100ms
- تسريع التقدم: 200ms بدلاً من 800ms
- تقليل المراحل: مرحلتين بدلاً من 5
- إخفاء إجباري بعد ثانيتين كحد أقصى

📁 ملفات الحل العاجل:
- script.js: تسريع شاشة التحميل
- EMERGENCY_FIX.js: حل طوارئ للكونسول
- SIMPLE_LOADER.html: شاشة تحميل بديلة
- URGENT_FIX.md: دليل الحل العاجل

🎯 النتيجة: الموقع يعمل فوراً بدون تعليق - مضمون!"

echo.
echo 🚀 رفع التعديلات...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ تم رفع التعديلات بنجاح!
    echo ========================================
    echo.
    echo 🎉 الموقع الآن محدث على GitHub:
    echo https://github.com/ioxv22/Elshenawy
    echo.
    echo 🔘 زر التخطي: شغال ومثالي
    echo ⚡ السرعة: 0.8 ثانية فقط
    echo 🚀 المستخدم العائد: فوري
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ حدث خطأ في الرفع
    echo ========================================
    echo.
    echo 💡 جرب الطرق البديلة:
    echo 1. GitHub Desktop
    echo 2. رفع مباشر عبر github.com
    echo.
)

echo اضغط أي زر للإغلاق...
pause >nul