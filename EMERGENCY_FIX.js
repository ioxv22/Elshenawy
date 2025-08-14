// 🚨 EMERGENCY FIX - إذا شاشة التحميل تعلق
// انسخ هذا الكود في Console (F12) واضغط Enter

console.log('🚨 EMERGENCY FIX - إزالة شاشة التحميل فوراً');

// إخفاء شاشة التحميل فوراً
const welcomeScreen = document.getElementById('welcomeScreen');
if (welcomeScreen) {
    welcomeScreen.style.display = 'none';
    console.log('✅ تم إخفاء شاشة التحميل');
} else {
    console.log('❌ لم يتم العثور على شاشة التحميل');
}

// إظهار باقي الموقع
document.body.style.overflow = 'auto';
const header = document.getElementById('header');
if (header) {
    header.style.display = 'block';
    console.log('✅ تم إظهار الموقع');
}

console.log('🎯 تم! الموقع الآن يعمل');