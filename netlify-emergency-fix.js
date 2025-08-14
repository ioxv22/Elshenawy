// 🚨 Netlify Emergency Fix - Language Toggle
// استخدم هذا الكود في Console إذا لم يعمل زر اللغة

console.log('🚨 Netlify Emergency Fix Loading...');

// إجبار إعادة تحميل نظام اللغة
function forceLanguageSystemReload() {
    console.log('🔄 Force reloading language system...');
    
    // إزالة الـ scripts القديمة
    const oldScripts = document.querySelectorAll('script[src*="language-toggle"]');
    oldScripts.forEach(script => script.remove());
    
    // إضافة script جديد
    const newScript = document.createElement('script');
    newScript.src = 'language-toggle.js?v=' + Date.now();
    newScript.onload = function() {
        console.log('✅ Language script reloaded');
        initEmergencyLanguageSystem();
    };
    document.head.appendChild(newScript);
}

// نظام لغة طوارئ
function initEmergencyLanguageSystem() {
    console.log('🚀 Initializing emergency language system...');
    
    // إنشاء أزرار اللغة إذا لم تكن موجودة
    let langToggle = document.querySelector('.language-toggle');
    if (!langToggle) {
        console.log('⚠️ Language toggle not found, creating emergency one...');
        createEmergencyLanguageToggle();
    }
    
    // إضافة event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log('🌍 Switching to language:', lang);
            switchLanguage(lang);
        });
    });
}

// إنشاء زر لغة طوارئ
function createEmergencyLanguageToggle() {
    const header = document.querySelector('.header .nav-links') || document.querySelector('nav');
    if (!header) return;
    
    const langToggle = document.createElement('div');
    langToggle.className = 'language-toggle';
    langToggle.innerHTML = `
        <button class="lang-btn active" data-lang="ar">🇦🇪 عربي</button>
        <button class="lang-btn" data-lang="en">🇺🇸 EN</button>
    `;
    
    // إضافة الستايل
    langToggle.style.cssText = `
        display: flex;
        gap: 5px;
        margin-left: 20px;
    `;
    
    langToggle.querySelectorAll('.lang-btn').forEach(btn => {
        btn.style.cssText = `
            padding: 8px 12px;
            border: 2px solid #3b82f6;
            background: transparent;
            color: #3b82f6;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        `;
    });
    
    header.appendChild(langToggle);
    console.log('✅ Emergency language toggle created');
}

// تبديل اللغة
function switchLanguage(lang) {
    console.log('🔄 Switching to:', lang);
    
    // تحديث HTML attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // تحديث الأزرار
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        if (btn.classList.contains('active')) {
            btn.style.background = '#3b82f6';
            btn.style.color = 'white';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = '#3b82f6';
        }
    });
    
    // تحديث النصوص الأساسية
    const translations = {
        ar: {
            title: 'مرحباً بك في عالم الفيزياء <span class="highlight">الممتع والمبسط</span>',
            subtitle: 'مع الأستاذ إسلام الشناوي، اكتشف أسرار الفيزياء وتفوق في دراستك',
            telegram: 'تيليجرام'
        },
        en: {
            title: 'Welcome to the World of Physics <span class="highlight">Fun and Simplified</span>',
            subtitle: 'With Professor Islam El-Shenawy, discover the secrets of physics and excel in your studies',
            telegram: 'Telegram'
        }
    };
    
    // تطبيق الترجمات
    const t = translations[lang];
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const telegramBtns = document.querySelectorAll('a[href*="t.me"]');
    
    if (heroTitle) heroTitle.innerHTML = t.title;
    if (heroSubtitle) heroSubtitle.textContent = t.subtitle;
    telegramBtns.forEach(btn => {
        if (btn.textContent.includes('تيليجرام') || btn.textContent.includes('Telegram')) {
            btn.textContent = t.telegram;
        }
    });
    
    // حفظ اللغة
    localStorage.setItem('selectedLanguage', lang);
    
    console.log('✅ Language switched to:', lang);
    
    // إشعار
    showNotification(`Language switched to ${lang === 'ar' ? 'Arabic' : 'English'}`, 'success');
}

// إشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// تشغيل النظام
console.log('🚀 Starting emergency language system...');
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmergencyLanguageSystem);
} else {
    initEmergencyLanguageSystem();
}

// إضافة للـ window للوصول العام
window.NetlifyEmergencyFix = {
    forceReload: forceLanguageSystemReload,
    switchLanguage: switchLanguage,
    init: initEmergencyLanguageSystem
};

console.log('✅ Netlify Emergency Fix Ready!');
console.log('💡 Use: NetlifyEmergencyFix.switchLanguage("en") or NetlifyEmergencyFix.switchLanguage("ar")');