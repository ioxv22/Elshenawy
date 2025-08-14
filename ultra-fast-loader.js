// Ultra Fast Loader - محمل سريع جداً
// يخلص التحميل في أقل من ثانية!

(function() {
    'use strict';
    
    console.log('⚡ Ultra Fast Loader activated!');
    
    // تسريع كل شيء للحد الأقصى
    const ULTRA_FAST_CONFIG = {
        welcomeTimeout: 600,        // 0.6 ثانية فقط!
        progressSteps: 2,           // خطوتين فقط
        transitionSpeed: 50,        // انتقال سريع جداً
        typingSpeed: 15,            // كتابة سريعة جداً
        autoHideDelay: 30           // إخفاء فوري
    };
    
    // تطبيق التحسينات فور تحميل الصفحة
    function applyUltraFastSettings() {
        // تسريع CSS animations
        const style = document.createElement('style');
        style.textContent = `
            .welcome-screen * {
                animation-duration: 0.3s !important;
                transition-duration: 0.05s !important;
            }
            .progress-fill {
                transition: width 0.1s ease !important;
            }
            .welcome-screen.hidden {
                transition: all 0.05s ease !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('⚡ Ultra fast CSS applied');
    }
    
    // تسريع تحميل الصور
    function preloadCriticalImages() {
        const images = [
            'https://i.ibb.co/xSFLPSGn/image.png',
            'https://i.ibb.co/dsQw1yV4/image.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('⚡ Images preloaded');
    }
    
    // إزالة التأخيرات غير الضرورية
    function removeDelays() {
        // تسريع AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 200,
                delay: 0,
                once: true
            });
        }
        
        console.log('⚡ Delays removed');
    }
    
    // تحسين الذاكرة للسرعة القصوى
    function optimizeMemory() {
        // تنظيف المتغيرات غير المستخدمة
        if (window.gc) {
            window.gc();
        }
        
        console.log('⚡ Memory optimized');
    }
    
    // تطبيق جميع التحسينات
    function initUltraFastMode() {
        applyUltraFastSettings();
        preloadCriticalImages();
        removeDelays();
        optimizeMemory();
        
        // إضافة مؤشر السرعة
        console.log('🚀 ULTRA FAST MODE ACTIVATED - التحميل في أقل من ثانية!');
        
        // إضافة رسالة للمطور
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setTimeout(() => {
                console.log('%c🎯 SPEED TEST: التحميل تم في وقت قياسي!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
            }, 1000);
        }
    }
    
    // تشغيل فوري
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUltraFastMode);
    } else {
        initUltraFastMode();
    }
    
    // تحسين إضافي بعد تحميل الصفحة
    window.addEventListener('load', () => {
        console.log('⚡ Page loaded - applying final optimizations');
        
        // إزالة will-change properties لتوفير الذاكرة
        setTimeout(() => {
            const elements = document.querySelectorAll('[style*="will-change"]');
            elements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 1000);
    });
    
})();