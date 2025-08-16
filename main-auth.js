// Firebase services will be available globally after firebase-config.js loads
let firebaseAuth, firebaseDb;

// DOM Elements
const userMenu = document.getElementById('userMenu');
const authButtons = document.getElementById('authButtons');
const userAvatar = document.getElementById('userAvatar');
const userImage = document.getElementById('userImage');
const userInitials = document.getElementById('userInitials');
const userName = document.getElementById('userName');
const userGrade = document.getElementById('userGrade');
const userDropdown = document.getElementById('userDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const profileLink = document.getElementById('profileLink');
const subscriptionLink = document.getElementById('subscriptionLink');

// Current user data
let currentUser = null;
let userData = null;

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Wait for Firebase to be ready
window.addEventListener('firebaseReady', function() {
    firebaseAuth = window.firebaseAuth();
    firebaseDb = window.firebaseDb();
    initializeAuth();
});

// Initialize Authentication
function initializeAuth() {
    if (!firebaseAuth) return;
    
    firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            await loadUserData();
            showUserMenu();
            updateCourseAccess();
        } else {
            currentUser = null;
            userData = null;
            showAuthButtons();
            updateCourseAccess();
        }
    });
}

// Load user data from Firestore
async function loadUserData() {
    if (!currentUser) return;
    
    try {
        const userDoc = await firebaseDb.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            userData = userDoc.data();
            updateUserInterface();
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Update user interface
function updateUserInterface() {
    if (!currentUser || !userData) return;

    // Update user name
    const displayName = userData.name || currentUser.displayName || 'المستخدم';
    userName.textContent = displayName;

    // Update user grade
    const gradeTexts = {
        'grade9': 'الصف التاسع',
        'grade10': 'الصف العاشر',
        'grade11': 'الصف الحادي عشر'
    };
    userGrade.textContent = gradeTexts[userData.grade] || 'غير محدد';

    // Update user avatar
    if (currentUser.photoURL) {
        userImage.src = currentUser.photoURL;
        userImage.style.display = 'block';
        userInitials.style.display = 'none';
    } else {
        userImage.style.display = 'none';
        userInitials.style.display = 'flex';
        userInitials.textContent = getInitials(displayName);
    }

    // Update subscription status
    updateSubscriptionStatus();
}

// Get user initials
function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
}

// Update subscription status
function updateSubscriptionStatus() {
    if (!userData) return;

    const subscriptionStatus = userData.isSubscribed ? 'مشترك' : 'غير مشترك';
    const statusClass = userData.isSubscribed ? 'subscribed' : 'not-subscribed';
    
    // You can add subscription status indicator here
    subscriptionLink.innerHTML = `
        <i class="fas fa-crown"></i>
        اشتراكي <span class="status ${statusClass}">(${subscriptionStatus})</span>
    `;
}

// Show user menu
function showUserMenu() {
    userMenu.style.display = 'block';
    authButtons.style.display = 'none';
}

// Show auth buttons
function showAuthButtons() {
    userMenu.style.display = 'none';
    authButtons.style.display = 'flex';
}

// Update course access based on user subscription
function updateCourseAccess() {
    const courseCards = document.querySelectorAll('.course-card');
    const courseBtns = document.querySelectorAll('.course-btn');
    
    courseCards.forEach((card, index) => {
        const watchBtn = card.querySelector('.course-btn');
        const subscribeBtn = card.querySelector('.btn-outline');
        
        if (currentUser && userData && userData.isSubscribed) {
            // User is subscribed, allow access
            if (watchBtn) {
                watchBtn.onclick = () => {
                    const courseId = card.getAttribute('data-course-id');
                    if (courseId) {
                        openVideoModal(courseId);
                    }
                };
                watchBtn.innerHTML = '<i class="fas fa-play"></i> مشاهدة الآن';
                watchBtn.classList.remove('btn-outline');
                watchBtn.classList.add('btn-primary');
            }
            
            if (subscribeBtn) {
                subscribeBtn.style.display = 'none';
            }
        } else {
            // User is not subscribed or not logged in
            if (watchBtn) {
                watchBtn.onclick = () => {
                    if (!currentUser) {
                        showLoginPrompt();
                    } else {
                        showSubscriptionPrompt();
                    }
                };
                watchBtn.innerHTML = '<i class="fas fa-lock"></i> يتطلب اشتراك';
                watchBtn.classList.remove('btn-primary');
                watchBtn.classList.add('btn-outline');
            }
        }
    });
}

// Show login prompt
function showLoginPrompt() {
    const message = 'يجب تسجيل الدخول أولاً للوصول إلى الكورسات';
    showNotification(message, 'info');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Show subscription prompt
function showSubscriptionPrompt() {
    const message = 'يجب الاشتراك أولاً للوصول إلى الكورسات';
    showNotification(message, 'info');
    
    setTimeout(() => {
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // User avatar click to toggle dropdown
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdown && !userMenu.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            await handleLogout();
        });
    }

    // Profile link
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('صفحة الملف الشخصي قيد التطوير', 'info');
        });
    }

    // Subscription link
    if (subscriptionLink) {
        subscriptionLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (userData && userData.isSubscribed) {
                showNotification('أنت مشترك بالفعل!', 'success');
            } else {
                document.querySelector('#pricing').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Handle logout
async function handleLogout() {
    try {
        await auth.signOut();
        showNotification('تم تسجيل الخروج بنجاح', 'success');
        
        // Refresh page after logout
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('حدث خطأ أثناء تسجيل الخروج', 'error');
    }
}

// Enhanced contact form with user data
function enhanceContactFormWithAuth() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Pre-fill form if user is logged in
    if (currentUser && userData) {
        const nameInput = contactForm.querySelector('input[name="name"]');
        const gradeSelect = contactForm.querySelector('select[name="grade"]');
        
        if (nameInput && !nameInput.value) {
            nameInput.value = userData.name || currentUser.displayName || '';
        }
        
        if (gradeSelect && !gradeSelect.value) {
            gradeSelect.value = userData.grade || '';
        }
    }

    // Update form submission to include user ID
    contactForm.addEventListener('submit', function(e) {
        if (currentUser) {
            // Add user ID to form data for admin panel
            const formData = new FormData(this);
            const messageData = {
                userId: currentUser.uid,
                name: formData.get('name'),
                grade: formData.get('grade'),
                message: formData.get('message'),
                timestamp: Date.now(),
                userEmail: currentUser.email
            };

            // Save to admin panel if available
            if (window.adminPanel) {
                window.adminPanel.addMessage(messageData);
            }
        }
    });
}

// Initialize enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the main script to load
    setTimeout(() => {
        enhanceContactFormWithAuth();
    }, 1000);
});

// Export functions for global access
window.getCurrentUser = () => currentUser;
window.getUserData = () => userData;
window.isUserSubscribed = () => userData && userData.isSubscribed;