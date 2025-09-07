# دليل المساهمة في المشروع

نرحب بمساهماتكم في تطوير موقع الأستاذ إسلام الشناوي! هذا الدليل سيساعدكم على فهم كيفية المساهمة بفعالية.

## 📋 جدول المحتويات

- [كيفية المساهمة](#كيفية-المساهمة)
- [الإبلاغ عن المشاكل](#الإبلاغ-عن-المشاكل)
- [اقتراح ميزات جديدة](#اقتراح-ميزات-جديدة)
- [إرسال Pull Requests](#إرسال-pull-requests)
- [معايير الكود](#معايير-الكود)
- [دليل الأسلوب](#دليل-الأسلوب)
- [الاختبار](#الاختبار)
- [التوثيق](#التوثيق)

## 🤝 كيفية المساهمة

### 1. Fork المشروع
```bash
# انقر على زر Fork في GitHub
# ثم استنسخ المشروع محلياً
git clone https://github.com/YOUR_USERNAME/Elshenawy.git
cd Elshenawy
```

### 2. إنشاء فرع جديد
```bash
# أنشئ فرع جديد للميزة أو الإصلاح
git checkout -b feature/new-feature
# أو
git checkout -b fix/bug-fix
```

### 3. تطبيق التغييرات
- اكتب كود نظيف ومنظم
- اتبع معايير الكود المحددة
- أضف تعليقات واضحة
- اختبر التغييرات محلياً

### 4. Commit التغييرات
```bash
git add .
git commit -m "إضافة: وصف واضح للتغيير"
```

### 5. Push ورفع Pull Request
```bash
git push origin feature/new-feature
# ثم أنشئ Pull Request في GitHub
```

## 🐛 الإبلاغ عن المشاكل

عند الإبلاغ عن مشكلة، يرجى تضمين:

### معلومات أساسية
- **وصف المشكلة**: وصف واضح ومفصل
- **خطوات إعادة الإنتاج**: كيفية حدوث المشكلة
- **السلوك المتوقع**: ما كان يجب أن يحدث
- **السلوك الفعلي**: ما حدث بالفعل
- **لقطات شاشة**: إن أمكن

### معلومات تقنية
- **المتصفح**: Chrome, Firefox, Safari, etc.
- **الإصدار**: رقم إصدار المتصفح
- **نظام التشغيل**: Windows, macOS, Linux, iOS, Android
- **حجم الشاشة**: Desktop, Tablet, Mobile

### مثال على تقرير مشكلة
```markdown
## وصف المشكلة
الأزرار لا تعمل على الأجهزة المحمولة

## خطوات إعادة الإنتاج
1. افتح الموقع على هاتف محمول
2. انقر على زر "اشترك الآن"
3. لا يحدث شيء

## السلوك المتوقع
يجب أن ينتقل المستخدم إلى صفحة الاشتراكات

## السلوك الفعلي
لا يحدث أي تفاعل

## معلومات إضافية
- المتصفح: Chrome Mobile 91
- الجهاز: iPhone 12
- نظام التشغيل: iOS 14.6
```

## 💡 اقتراح ميزات جديدة

نرحب بأفكاركم! عند اقتراح ميزة جديدة:

### تأكد من
- [ ] الميزة لم تُقترح من قبل
- [ ] الميزة تتماشى مع أهداف المشروع
- [ ] الميزة قابلة للتنفيذ تقنياً

### اشرح
- **المشكلة**: ما المشكلة التي تحلها الميزة؟
- **الحل المقترح**: كيف ستعمل الميزة؟
- **البدائل**: هل فكرت في حلول أخرى؟
- **الفوائد**: كيف ستحسن تجربة المستخدم؟

## 🔄 إرسال Pull Requests

### قبل الإرسال
- [ ] تأكد من أن الكود يعمل محلياً
- [ ] اختبر على متصفحات مختلفة
- [ ] تأكد من الاستجابة على الأجهزة المحمولة
- [ ] اتبع معايير الكود
- [ ] أضف تعليقات واضحة

### عنوان Pull Request
استخدم عناوين واضحة:
- `إضافة: ميزة البحث المتقدم`
- `إصلاح: مشكلة الاستجابة على الهواتف`
- `تحسين: أداء تحميل الصور`
- `تحديث: تصميم الأزرار`

### وصف Pull Request
```markdown
## نوع التغيير
- [ ] إصلاح مشكلة
- [ ] ميزة جديدة
- [ ] تحسين الأداء
- [ ] تحديث التوثيق

## الوصف
وصف واضح للتغييرات المطبقة

## الاختبار
- [ ] اختبرت محلياً
- [ ] اختبرت على متصفحات مختلفة
- [ ] اختبرت على الأجهزة المحمولة

## لقطات الشاشة
أضف لقطات شاشة إن أمكن
```

## 📝 معايير الكود

### HTML
```html
<!-- استخدم HTML5 semantic elements -->
<section class="courses" id="courses">
    <div class="container">
        <header class="section-header">
            <h2 class="section-title">الكورسات</h2>
        </header>
    </div>
</section>

<!-- أضف alt text للصور -->
<img src="image.jpg" alt="وصف واضح للصورة">

<!-- استخدم ARIA labels للوصولية -->
<button aria-label="إغلاق النافذة">×</button>
```

### CSS
```css
/* استخدم CSS Variables */
:root {
    --primary-color: #1e40af;
    --secondary-color: #f59e0b;
}

/* اتبع BEM methodology */
.course-card {
    /* styles */
}

.course-card__title {
    /* styles */
}

.course-card--featured {
    /* styles */
}

/* أضف تعليقات واضحة */
/* ===== Course Cards ===== */
.course-card {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    /* المزيد من الأنماط */
}
```

### JavaScript
```javascript
// استخدم const/let بدلاً من var
const courseCards = document.querySelectorAll('.course-card');

// أضف تعليقات واضحة
/**
 * تهيئة بطاقات الكورسات
 * @param {NodeList} cards - قائمة بطاقات الكورسات
 */
function initializeCourseCards(cards) {
    cards.forEach(card => {
        // إضافة event listeners
        card.addEventListener('click', handleCardClick);
    });
}

// استخدم arrow functions عند المناسب
const handleCardClick = (event) => {
    event.preventDefault();
    // منطق التعامل مع النقر
};

// استخدم async/await للعمليات غير المتزامنة
async function loadCourseData() {
    try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
    }
}
```

## 🎨 دليل الأسلوب

### الألوان
```css
/* الألوان الأساسية */
--primary-color: #1e40af;      /* أزرق أساسي */
--secondary-color: #f59e0b;    /* برتقالي ثانوي */
--accent-color: #3b82f6;       /* أزرق فاتح */
--success-color: #10b981;      /* أخضر نجاح */
--warning-color: #f59e0b;      /* برتقالي تحذير */
--error-color: #ef4444;        /* أحمر خطأ */
```

### الخطوط
```css
/* الخطوط */
--font-arabic: 'Cairo', sans-serif;    /* للنصوص العربية */
--font-english: 'Poppins', sans-serif; /* للنصوص الإنجليزية */
```

### المسافات
```css
/* المسافات */
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
```

## 🧪 الاختبار

### اختبار محلي
```bash
# تشغيل الموقع محلياً
python -m http.server 8000
# أو
npm start
```

### قائمة الاختبار
- [ ] **الوظائف الأساسية**
  - [ ] التنقل بين الأقسام
  - [ ] فتح وإغلاق النوافذ المنبثقة
  - [ ] تشغيل الفيديوهات
  - [ ] إرسال النماذج

- [ ] **الاستجابة**
  - [ ] Desktop (1920x1080)
  - [ ] Laptop (1366x768)
  - [ ] Tablet (768x1024)
  - [ ] Mobile (375x667)

- [ ] **المتصفحات**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **الأداء**
  - [ ] سرعة التحميل < 3 ثوانٍ
  - [ ] حجم الصفحة < 2 ميجابايت
  - [ ] نقاط PageSpeed > 90

## 📚 التوثيق

### تعليقات الكود
```javascript
/**
 * تهيئة شاشة الترحيب
 * @description تعرض شاشة ترحيب متحركة عند تحميل الصفحة
 * @param {number} duration - مدة عرض الشاشة بالميلي ثانية
 * @returns {Promise} وعد يكتمل عند انتهاء الأنيميشن
 */
async function initWelcomeScreen(duration = 3000) {
    // منطق التهيئة
}
```

### README Updates
عند إضافة ميزات جديدة، تأكد من تحديث:
- [ ] README.md
- [ ] CHANGELOG.md
- [ ] package.json
- [ ] التوثيق التقني

## 🏷️ تسمية الفروع

استخدم أسماء واضحة للفروع:
```bash
# للميزات الجديدة
feature/search-functionality
feature/dark-mode
feature/mobile-optimization

# للإصلاحات
fix/button-hover-effect
fix/mobile-navigation
fix/video-loading

# للتحسينات
improvement/performance-optimization
improvement/accessibility
improvement/seo-enhancement

# للتوثيق
docs/contributing-guide
docs/api-documentation
docs/user-manual
```

## 🎯 أولويات المساهمة

### عالية الأولوية
- إصلاح المشاكل الأمنية
- إصلاح مشاكل الوصولية
- تحسين الأداء
- إصلاح مشاكل الاستجابة

### متوسطة الأولوية
- ميزات جديدة مطلوبة
- تحسين تجربة المستخدم
- تحسين التصميم
- إضافة اختبارات

### منخفضة الأولوية
- تحسينات تجميلية
- إعادة تنظيم الكود
- تحديث التوثيق
- تحسينات طفيفة

## 📞 التواصل

### للأسئلة والاستفسارات
- **GitHub Issues**: للمشاكل التقنية
- **GitHub Discussions**: للنقاشات العامة
- **Email**: للاستفسارات الخاصة

### للمساعدة
- اقرأ التوثيق أولاً
- ابحث في Issues الموجودة
- اطرح سؤالك بوضوح
- أرفق معلومات كافية

## 🙏 شكر وتقدير

نشكر جميع المساهمين في تطوير هذا المشروع:
- المطورين والمصممين
- المختبرين ومقدمي التغذية الراجعة
- كاتبي التوثيق
- مجتمع المستخدمين

---

**شكراً لمساهمتكم في جعل موقع الأستاذ إسلام الشناوي أفضل! 🚀**

*آخر تحديث: ديسمبر 2024*