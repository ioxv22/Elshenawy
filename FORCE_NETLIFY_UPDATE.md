# 🚨 إجبار Netlify على التحديث

## التاريخ: 2024-12-14
## الإصدار: v20241214-003

### التعديلات المطلوبة:
- ✅ تحديث version numbers في index.html
- ✅ تحديث netlify.toml
- ✅ إضافة ملف إجبار التحديث

### خطوات إجبار Netlify على التحديث:

#### 1. في Netlify Dashboard:
1. اذهب إلى موقعك في Netlify
2. اضغط على "Site settings"
3. اضغط على "Build & deploy"
4. اضغط على "Clear cache and deploy site"

#### 2. أو استخدم Trigger Deploy:
1. اذهب إلى "Deploys" tab
2. اضغط على "Trigger deploy"
3. اختر "Deploy site"

#### 3. فحص المتصفح:
1. افتح الموقع على Netlify
2. اضغط Ctrl+Shift+R (Hard Refresh)
3. أو اضغط F12 → Application → Storage → Clear storage

### 🔍 للتأكد من التحديث:
1. افتح Developer Tools (F12)
2. اذهب إلى Network tab
3. ابحث عن `language-toggle.js?v=20241214-003`
4. إذا رأيت الـ version الجديد، التحديث نجح!

### 🚨 إذا لم يعمل:
استخدم هذا الكود في Console:
```javascript
// إجبار إعادة تحميل الـ scripts
const scripts = document.querySelectorAll('script[src*="language-toggle"]');
scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.src.replace(/v=[\d-]+/, 'v=20241214-003');
    document.head.appendChild(newScript);
    script.remove();
});

// إعادة تهيئة نظام اللغة
if (window.LanguageSystem) {
    window.LanguageSystem.init();
}
```

### 📞 للدعم:
إذا استمرت المشكلة، تواصل معي على التيليجرام: @PhysixsPert