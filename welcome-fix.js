// ===== WELCOME SCREEN FIX - ENHANCED VERSION =====

console.log('🚀 Welcome screen fix v2.0 loading...');

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (!welcomeScreen) {
        console.log('❌ Welcome screen not found');
        return;
    }
    
    console.log('🎯 Hiding welcome screen now...');
    
    // إخفاء فوري مع تأثير جميل
    welcomeScreen.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(1.1)';
    welcomeScreen.style.filter = 'blur(10px)';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('loading');
        console.log('✅ Welcome screen hidden successfully!');
        
        // إطلاق حدث انتهاء التحميل
        document.dispatchEvent(new CustomEvent('welcomeScreenHidden'));
    }, 600);
}

// تشغيل فوري
(function() {
    console.log('🔧 Welcome screen fix v2.0 initialized');
    
    // إخفاء سريع بعد ثانية واحدة فقط!
    setTimeout(() => {
        console.log('⏰ Auto-hide timer triggered');
        hideWelcomeScreen();
    }, 1000);
    
    // إعداد زر التخطي
    function setupSkipButton() {
        const skipBtn = document.getElementById('skipLoadingBtn');
        if (skipBtn) {
            console.log('🔘 Skip button found and configured');
            skipBtn.addEventListener('click', () => {
                console.log('👆 Skip button clicked');
                hideWelcomeScreen();
            });
        }
    }
    
    // تشغيل فوري أو عند تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupSkipButton);
    } else {
        setupSkipButton();
    }
    
    // احتياطي قوي: إخفاء إجباري بعد ثانيتين
    setTimeout(() => {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen && welcomeScreen.style.display !== 'none') {
            console.log('🔧 FALLBACK: Force hiding welcome screen');
            welcomeScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.classList.remove('loading');
        }
    }, 2000);
})();

console.log('✅ Welcome screen fix v2.0 loaded successfully!');