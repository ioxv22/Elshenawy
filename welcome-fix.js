// ===== WELCOME SCREEN FIX - SIMPLE & FAST =====

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (!welcomeScreen) return;
    
    console.log('🚀 Hiding welcome screen...');
    
    // إخفاء فوري
    welcomeScreen.style.transition = 'all 0.5s ease-out';
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✅ Welcome screen hidden successfully!');
    }, 500);
}

// تشغيل فوري عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Welcome screen fix loaded');
    
    // إخفاء بعد ثانيتين
    setTimeout(hideWelcomeScreen, 2000);
    
    // زر التخطي
    const skipBtn = document.getElementById('skipLoadingBtn');
    if (skipBtn) {
        skipBtn.addEventListener('click', hideWelcomeScreen);
    }
    
    // احتياطي: إخفاء إجباري بعد 3 ثواني
    setTimeout(() => {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen && welcomeScreen.style.display !== 'none') {
            console.log('🔧 Fallback: Force hiding welcome screen');
            welcomeScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }, 3000);
});

console.log('✅ Welcome screen fix script loaded successfully!');