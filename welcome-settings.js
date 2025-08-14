// إعدادات شاشة التحميل - Welcome Screen Settings
// يمكن تخصيص هذه الإعدادات حسب الحاجة

const WELCOME_SETTINGS = {
    // إعدادات التخطي التلقائي - سريع جداً!
    autoSkip: {
        enabled: true,                    // تفعيل التخطي التلقائي
        forReturningUsers: true,          // تخطي للمستخدمين العائدين
        timeoutDuration: 800,             // وقت التخطي التلقائي - أقل من ثانية!
        storageKey: 'hasVisited'          // مفتاح التخزين في localStorage
    },
    
    // إعدادات الرسوم المتحركة - سريعة جداً!
    animations: {
        typingSpeed: 20,                  // سرعة الكتابة - أسرع!
        progressSpeed: 100,               // سرعة التقدم - أسرع!
        transitionSpeed: 100,             // سرعة الانتقال - أسرع!
        startDelay: 50                    // تأخير البداية - أقل!
    },
    
    // إعدادات التفاعل
    interaction: {
        clickToSkip: true,                // السماح بالنقر للتخطي
        keyToSkip: true,                  // السماح بالضغط على أي زر للتخطي
        showSkipHint: true                // إظهار تلميح التخطي
    },
    
    // إعدادات متقدمة
    advanced: {
        resetOnNewVersion: false,         // إعادة تعيين عند تحديث الموقع
        respectUserPreference: true,      // احترام تفضيلات المستخدم
        debugMode: false                  // وضع التطوير (لإظهار رسائل في Console)
    }
};

// دالة للحصول على الإعدادات
function getWelcomeSettings() {
    return WELCOME_SETTINGS;
}

// دالة لتحديث إعداد معين
function updateWelcomeSetting(category, key, value) {
    if (WELCOME_SETTINGS[category] && WELCOME_SETTINGS[category].hasOwnProperty(key)) {
        WELCOME_SETTINGS[category][key] = value;
        console.log(`✅ تم تحديث ${category}.${key} إلى:`, value);
    } else {
        console.error(`❌ إعداد غير موجود: ${category}.${key}`);
    }
}

// دالة لإعادة تعيين شاشة التحميل
function resetWelcomeScreen() {
    const settings = getWelcomeSettings();
    localStorage.removeItem(settings.autoSkip.storageKey);
    
    if (settings.advanced.debugMode) {
        console.log('🔄 تم إعادة تعيين شاشة التحميل');
    }
    
    location.reload();
}

// دالة للتحقق من حالة المستخدم
function checkUserStatus() {
    const settings = getWelcomeSettings();
    const hasVisited = localStorage.getItem(settings.autoSkip.storageKey);
    
    return {
        isReturningUser: !!hasVisited,
        visitDate: hasVisited ? new Date(parseInt(hasVisited)) : null,
        shouldShowWelcome: !hasVisited || !settings.autoSkip.forReturningUsers
    };
}

// دالة لتصدير الإعدادات
function exportSettings() {
    return JSON.stringify(WELCOME_SETTINGS, null, 2);
}

// دالة لاستيراد الإعدادات
function importSettings(settingsJSON) {
    try {
        const newSettings = JSON.parse(settingsJSON);
        Object.assign(WELCOME_SETTINGS, newSettings);
        console.log('✅ تم استيراد الإعدادات بنجاح');
        return true;
    } catch (error) {
        console.error('❌ خطأ في استيراد الإعدادات:', error);
        return false;
    }
}

// إضافة اختصارات لوحة المفاتيح للتطوير
if (typeof document !== 'undefined') {
    document.addEventListener('keydown', function(e) {
        const settings = getWelcomeSettings();
        
        // Ctrl+Shift+R: إعادة تعيين شاشة التحميل
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            resetWelcomeScreen();
        }
        
        // Ctrl+Shift+D: تفعيل/إلغاء وضع التطوير
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            settings.advanced.debugMode = !settings.advanced.debugMode;
            console.log('🔧 وضع التطوير:', settings.advanced.debugMode ? 'مفعل' : 'معطل');
        }
        
        // Ctrl+Shift+S: إظهار حالة المستخدم
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            const status = checkUserStatus();
            console.log('👤 حالة المستخدم:', status);
        }
    });
}

// تصدير للاستخدام العام
if (typeof window !== 'undefined') {
    window.WelcomeSettings = {
        get: getWelcomeSettings,
        update: updateWelcomeSetting,
        reset: resetWelcomeScreen,
        checkUser: checkUserStatus,
        export: exportSettings,
        import: importSettings
    };
}