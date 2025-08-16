// Firebase services will be available globally after firebase-config.js loads
let auth, db, googleProvider;

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const authForms = document.querySelectorAll('.auth-form');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleRegisterBtn = document.getElementById('googleRegisterBtn');
const authMessage = document.getElementById('authMessage');
const messageText = document.getElementById('messageText');
const loadingScreen = document.getElementById('loadingScreen');

// Current form state
let currentForm = 'login';

// Initialize when Firebase is ready
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    hideLoadingScreen();
});

// Wait for Firebase to be ready
window.addEventListener('firebaseReady', function() {
    auth = window.firebaseAuth();
    db = window.firebaseDb();
    googleProvider = window.googleProvider();
    initializeAuth();
});

// Initialize Authentication
function initializeAuth() {
    if (!auth) return;
    
    // Check if user is already logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, redirect to main page
            showMessage('تم تسجيل الدخول بنجاح! جاري التوجيه...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Form toggle buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const formType = btn.getAttribute('data-form');
            switchForm(formType);
        });
    });

    // Login form
    loginForm.addEventListener('submit', handleLogin);

    // Register form
    registerForm.addEventListener('submit', handleRegister);

    // Google login buttons
    googleLoginBtn.addEventListener('click', handleGoogleAuth);
    googleRegisterBtn.addEventListener('click', handleGoogleAuth);

    // Password strength checker
    const registerPassword = document.getElementById('registerPassword');
    registerPassword.addEventListener('input', checkPasswordStrength);

    // Password confirmation
    const confirmPassword = document.getElementById('confirmPassword');
    confirmPassword.addEventListener('input', checkPasswordMatch);

    // Real-time form validation
    setupFormValidation();
}

// Switch between login and register forms
function switchForm(formType) {
    currentForm = formType;
    
    // Update toggle buttons
    toggleBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-form') === formType) {
            btn.classList.add('active');
        }
    });

    // Update forms
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === formType + 'Form') {
            form.classList.add('active');
        }
    });

    // Clear messages
    hideMessage();
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!validateEmail(email)) {
        showMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberUser', 'true');
        }

        showMessage('تم تسجيل الدخول بنجاح!', 'success');
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.error('Login error:', error);
        showMessage(getErrorMessage(error.code), 'error');
        shakeForm(loginForm);
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// Handle Register
async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const grade = document.getElementById('registerGrade').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validation
    if (!name.trim()) {
        showMessage('يرجى إدخال الاسم الكامل', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    if (!grade) {
        showMessage('يرجى اختيار الصف الدراسي', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('كلمة المرور وتأكيدها غير متطابقتين', 'error');
        return;
    }

    if (!agreeTerms) {
        showMessage('يجب الموافقة على الشروط والأحكام', 'error');
        return;
    }

    const submitBtn = registerForm.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            grade: grade,
            createdAt: new Date(),
            isSubscribed: false,
            subscriptionType: null
        });

        showMessage('تم إنشاء الحساب بنجاح!', 'success');
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.error('Registration error:', error);
        showMessage(getErrorMessage(error.code), 'error');
        shakeForm(registerForm);
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// Handle Google Authentication
async function handleGoogleAuth() {
    const isRegister = currentForm === 'register';
    const btn = isRegister ? googleRegisterBtn : googleLoginBtn;
    
    setButtonLoading(btn, true);

    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists && isRegister) {
            // New user registration with Google
            const grade = document.getElementById('registerGrade').value;
            
            if (!grade) {
                showMessage('يرجى اختيار الصف الدراسي أولاً', 'error');
                await auth.signOut();
                return;
            }

            await db.collection('users').doc(user.uid).set({
                name: user.displayName,
                email: user.email,
                grade: grade,
                createdAt: new Date(),
                isSubscribed: false,
                subscriptionType: null,
                photoURL: user.photoURL
            });
        } else if (!userDoc.exists && !isRegister) {
            // User doesn't exist, redirect to register
            await auth.signOut();
            showMessage('لا يوجد حساب بهذا البريد الإلكتروني. يرجى إنشاء حساب جديد.', 'error');
            switchForm('register');
            return;
        }

        showMessage('تم تسجيل الدخول بنجاح!', 'success');
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.error('Google auth error:', error);
        showMessage(getErrorMessage(error.code), 'error');
    } finally {
        setButtonLoading(btn, false);
    }
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function checkPasswordStrength() {
    const password = document.getElementById('registerPassword').value;
    const strengthIndicator = document.getElementById('passwordStrength');
    
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    strengthIndicator.className = 'password-strength';
    
    if (strength < 2) {
        strengthIndicator.classList.add('weak');
    } else if (strength < 4) {
        strengthIndicator.classList.add('medium');
    } else {
        strengthIndicator.classList.add('strong');
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmInput = document.getElementById('confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmInput.style.borderColor = 'var(--danger-color)';
    } else {
        confirmInput.style.borderColor = 'var(--border-color)';
    }
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--danger-color)';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function showMessage(message, type) {
    messageText.textContent = message;
    authMessage.className = `auth-message ${type}`;
    authMessage.style.display = 'flex';
    
    // Auto hide after 5 seconds
    setTimeout(hideMessage, 5000);
}

function hideMessage() {
    authMessage.style.display = 'none';
}

function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

function shakeForm(form) {
    form.classList.add('shake');
    setTimeout(() => {
        form.classList.remove('shake');
    }, 500);
}

function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }, 1000);
}

function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/user-not-found': 'لا يوجد حساب بهذا البريد الإلكتروني',
        'auth/wrong-password': 'كلمة المرور غير صحيحة',
        'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل',
        'auth/weak-password': 'كلمة المرور ضعيفة جداً',
        'auth/invalid-email': 'البريد الإلكتروني غير صحيح',
        'auth/user-disabled': 'تم تعطيل هذا الحساب',
        'auth/too-many-requests': 'تم تجاوز عدد المحاولات المسموح. حاول مرة أخرى لاحقاً',
        'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت',
        'auth/popup-closed-by-user': 'تم إغلاق نافذة تسجيل الدخول',
        'auth/cancelled-popup-request': 'تم إلغاء طلب تسجيل الدخول'
    };
    
    return errorMessages[errorCode] || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى';
}

// Export functions for global access
window.togglePasswordVisibility = togglePasswordVisibility;