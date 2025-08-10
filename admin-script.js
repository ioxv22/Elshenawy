// ===== Admin Panel JavaScript =====

// Admin credentials
const ADMIN_CREDENTIALS = {
    'hk102573@admin.com': {
        password: 'Hamad2K',
        role: 'admin',
        name: 'المدير العام'
    },
    'ElshenawyPhysics@admin.com': {
        password: 'ElshenawyPhysics',
        role: 'teacher',
        name: 'الأستاذ إسلام الشناوي'
    }
};

// Current user data
let currentUser = null;

// Sample data
let messages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
let courses = JSON.parse(localStorage.getItem('adminCourses') || '[]');
let students = JSON.parse(localStorage.getItem('adminStudents') || '[]');

// DOM Elements
const loginModal = document.getElementById('loginModal');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// ===== Authentication =====
function login(email, password) {
    const user = ADMIN_CREDENTIALS[email];
    
    if (user && user.password === password) {
        currentUser = {
            email: email,
            role: user.role,
            name: user.name
        };
        
        // Store session
        sessionStorage.setItem('adminUser', JSON.stringify(currentUser));
        
        // Hide login modal and show dashboard
        loginModal.style.display = 'none';
        adminDashboard.style.display = 'flex';
        
        // Initialize dashboard
        initializeDashboard();
        
        return true;
    }
    
    return false;
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('adminUser');
    
    // Show login modal and hide dashboard
    loginModal.style.display = 'flex';
    adminDashboard.style.display = 'none';
    
    // Reset form
    loginForm.reset();
    loginError.style.display = 'none';
}

function checkAuth() {
    const storedUser = sessionStorage.getItem('adminUser');
    
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        loginModal.style.display = 'none';
        adminDashboard.style.display = 'flex';
        initializeDashboard();
    } else {
        loginModal.style.display = 'flex';
        adminDashboard.style.display = 'none';
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// ===== Dashboard Initialization =====
function initializeDashboard() {
    // Set user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRole').textContent = currentUser.role === 'admin' ? 'مدير عام' : 'مدرس';
    
    // Apply role-based restrictions
    if (currentUser.role === 'teacher') {
        document.body.classList.add('teacher-mode');
    } else {
        document.body.classList.remove('teacher-mode');
    }
    
    // Load dashboard data
    loadDashboardStats();
    loadRecentMessages();
    loadMessages();
    loadCourses();
    loadStudents();
    
    // Initialize navigation
    initializeNavigation();
}

// ===== Navigation =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = link.getAttribute('data-section');
            
            // Update active nav item
            document.querySelector('.nav-item.active').classList.remove('active');
            link.parentElement.classList.add('active');
            
            // Show target section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection + '-section').classList.add('active');
            
            // Load section data
            if (targetSection === 'videos') {
                loadVideos();
            }
            
            // Update page title
            const pageTitle = link.querySelector('span').textContent;
            document.getElementById('pageTitle').textContent = pageTitle;
        });
    });
}

// ===== Dashboard Stats =====
function loadDashboardStats() {
    document.getElementById('totalMessages').textContent = messages.length;
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalCourses').textContent = courses.length || 6;
    
    // Calculate revenue (mock data)
    const revenue = students.reduce((total, student) => {
        const prices = { grade9: 99, grade10: 199, grade11: 299 };
        return total + (prices[student.grade] || 0);
    }, 0);
    document.getElementById('totalRevenue').textContent = revenue + ' درهم';
    
    // Update messages badge
    document.getElementById('messagesBadge').textContent = messages.filter(m => !m.read).length;
}

// ===== Messages Management =====
function loadRecentMessages() {
    const recentMessagesContainer = document.getElementById('recentMessages');
    const recentMessages = messages.slice(-3).reverse();
    
    if (recentMessages.length === 0) {
        recentMessagesContainer.innerHTML = '<p class="no-data">لا توجد رسائل جديدة</p>';
        return;
    }
    
    recentMessagesContainer.innerHTML = recentMessages.map(message => `
        <div class="message-preview">
            <strong>${message.name}</strong>
            <span class="message-grade">${getGradeText(message.grade)}</span>
            <p>${message.message.substring(0, 50)}...</p>
            <small>${formatDate(message.timestamp)}</small>
        </div>
    `).join('');
}

function loadMessages() {
    const messagesContainer = document.getElementById('messagesList');
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<p class="no-data">لا توجد رسائل</p>';
        return;
    }
    
    messagesContainer.innerHTML = messages.map(message => `
        <div class="message-item ${message.read ? '' : 'unread'}">
            <div class="message-avatar">
                ${message.name.charAt(0)}
            </div>
            <div class="message-content">
                <div class="message-header">
                    <div>
                        <span class="message-name">${message.name}</span>
                        <span class="message-grade">${getGradeText(message.grade)}</span>
                    </div>
                    <span class="message-time">${formatDate(message.timestamp)}</span>
                </div>
                <p class="message-text">${message.message}</p>
                <div class="message-actions">
                    <button class="btn btn-sm btn-primary" onclick="replyToMessage('${message.id}')">
                        <i class="fas fa-reply"></i>
                        رد
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="markAsRead('${message.id}')">
                        <i class="fas fa-check"></i>
                        تم القراءة
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMessage('${message.id}')">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function refreshMessages() {
    // Simulate fetching new messages
    showNotification('تم تحديث الرسائل بنجاح', 'success');
    loadMessages();
    loadDashboardStats();
}

function deleteMessage(messageId) {
    if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
        messages = messages.filter(m => m.id !== messageId);
        localStorage.setItem('adminMessages', JSON.stringify(messages));
        loadMessages();
        loadDashboardStats();
        showNotification('تم حذف الرسالة بنجاح', 'success');
    }
}

function deleteAllMessages() {
    if (confirm('هل أنت متأكد من حذف جميع الرسائل؟')) {
        messages = [];
        localStorage.setItem('adminMessages', JSON.stringify(messages));
        loadMessages();
        loadDashboardStats();
        showNotification('تم حذف جميع الرسائل بنجاح', 'success');
    }
}

function markAsRead(messageId) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        message.read = true;
        localStorage.setItem('adminMessages', JSON.stringify(messages));
        loadMessages();
        loadDashboardStats();
        showNotification('تم تحديد الرسالة كمقروءة', 'success');
    }
}

function replyToMessage(messageId) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        // Create WhatsApp message
        const whatsappMessage = `مرحباً ${message.name}،\n\nشكراً لتواصلك معنا. سنقوم بالرد على استفسارك في أقرب وقت ممكن.\n\nالأستاذ إسلام الشناوي`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/971501234567?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
        markAsRead(messageId);
    }
}

// ===== Courses Management =====
function loadCourses() {
    const coursesContainer = document.getElementById('adminCoursesGrid');
    
    // Default courses if none exist
    if (courses.length === 0) {
        courses = [
            {
                id: 'grade9-chapter1',
                title: 'الفصل الأول: الحركة',
                grade: 'grade9',
                description: 'شرح مفصل لمفاهيم الحركة والسرعة والتسارع',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 45,
                thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=الفصل+الأول'
            },
            {
                id: 'grade9-chapter2',
                title: 'الفصل الثاني: القوى',
                grade: 'grade9',
                description: 'فهم القوى وقوانين نيوتن للحركة',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 50,
                thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=الفصل+الثاني'
            },
            {
                id: 'grade10-chapter1',
                title: 'الفصل الأول: الطاقة والشغل',
                grade: 'grade10',
                description: 'مفاهيم الطاقة الحركية والكامنة والشغل',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 55,
                thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=الفصل+الأول'
            },
            {
                id: 'grade10-chapter2',
                title: 'الفصل الثاني: الموجات والصوت',
                grade: 'grade10',
                description: 'خصائص الموجات والصوت والاهتزازات',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 60,
                thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=الفصل+الثاني'
            },
            {
                id: 'grade11-chapter1',
                title: 'الفصل الأول: الكهرباء الساكنة',
                grade: 'grade11',
                description: 'الشحنات الكهربائية والمجالات الكهربائية',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 65,
                thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=الفصل+الأول'
            },
            {
                id: 'grade11-chapter2',
                title: 'الفصل الثاني: الدوائر الكهربائية',
                grade: 'grade11',
                description: 'التيار والمقاومة وقوانين كيرشوف',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 70,
                thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=الفصل+الثاني'
            }
        ];
        localStorage.setItem('adminCourses', JSON.stringify(courses));
    }
    
    coursesContainer.innerHTML = courses.map(course => `
        <div class="admin-course-card">
            <div class="admin-course-thumbnail">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="course-actions-overlay">
                    <button class="btn btn-sm btn-primary" onclick="editCourse('${course.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCourse('${course.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="admin-course-content">
                <h3 class="admin-course-title">${course.title}</h3>
                <p class="admin-course-description">${course.description}</p>
                <div class="admin-course-meta">
                    <span class="course-grade">${getGradeText(course.grade)}</span>
                    <span class="course-duration">${course.duration} دقيقة</span>
                </div>
                <div class="admin-course-actions">
                    <button class="btn btn-sm btn-outline" onclick="previewCourse('${course.id}')">
                        <i class="fas fa-eye"></i>
                        معاينة
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="editCourse('${course.id}')">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openAddCourseModal() {
    const modal = document.getElementById('addCourseModal');
    modal.classList.add('active');
}

function closeAddCourseModal() {
    const modal = document.getElementById('addCourseModal');
    modal.classList.remove('active');
    document.getElementById('addCourseForm').reset();
}

function addCourse(courseData) {
    const newCourse = {
        id: 'course-' + Date.now(),
        ...courseData,
        thumbnail: `https://via.placeholder.com/400x225/1e3a8a/ffffff?text=${encodeURIComponent(courseData.title)}`
    };
    
    courses.push(newCourse);
    localStorage.setItem('adminCourses', JSON.stringify(courses));
    loadCourses();
    closeAddCourseModal();
    showNotification('تم إضافة الكورس بنجاح', 'success');
}

function editCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        // Open edit modal with course data
        showNotification('سيتم إضافة نافذة التعديل قريباً', 'info');
    }
}

function deleteCourse(courseId) {
    if (confirm('هل أنت متأكد من حذف هذا الكورس؟')) {
        courses = courses.filter(c => c.id !== courseId);
        localStorage.setItem('adminCourses', JSON.stringify(courses));
        loadCourses();
        showNotification('تم حذف الكورس بنجاح', 'success');
    }
}

function previewCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        window.open(course.videoUrl, '_blank');
    }
}

// ===== Students Management =====
function loadStudents() {
    const studentsTableBody = document.getElementById('studentsTableBody');
    
    if (students.length === 0) {
        studentsTableBody.innerHTML = '<tr><td colspan="6" class="no-data">لا توجد بيانات طلاب</td></tr>';
        return;
    }
    
    studentsTableBody.innerHTML = students.map(student => `
        <tr>
            <td>${student.name}</td>
            <td>${getGradeText(student.grade)}</td>
            <td>${student.email}</td>
            <td>${formatDate(student.subscriptionDate)}</td>
            <td>
                <span class="student-status ${student.active ? 'status-active' : 'status-inactive'}">
                    ${student.active ? 'نشط' : 'غير نشط'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="viewStudent('${student.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function viewStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        showNotification(`عرض بيانات الطالب: ${student.name}`, 'info');
    }
}

function deleteStudent(studentId) {
    if (confirm('هل أنت متأكد من حذف بيانات هذا الطالب؟')) {
        students = students.filter(s => s.id !== studentId);
        localStorage.setItem('adminStudents', JSON.stringify(students));
        loadStudents();
        loadDashboardStats();
        showNotification('تم حذف بيانات الطالب بنجاح', 'success');
    }
}

function exportStudents() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "الاسم,الصف,البريد الإلكتروني,تاريخ الاشتراك,الحالة\n"
        + students.map(s => `${s.name},${getGradeText(s.grade)},${s.email},${formatDate(s.subscriptionDate)},${s.active ? 'نشط' : 'غير نشط'}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('تم تصدير بيانات الطلاب بنجاح', 'success');
}

// ===== Utility Functions =====
function getGradeText(grade) {
    const gradeTexts = {
        'grade9': 'الصف التاسع',
        'grade10': 'الصف العاشر',
        'grade11': 'الصف الحادي عشر'
    };
    return gradeTexts[grade] || grade;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-AE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        transform: translateX(-400px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        font-family: var(--font-arabic);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(-400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication on page load
    checkAuth();
    
    // Load receipts data
    loadReceipts();
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (login(email, password)) {
            loginError.style.display = 'none';
        } else {
            loginError.style.display = 'block';
        }
    });
    
    // Add course form submission
    const addCourseForm = document.getElementById('addCourseForm');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const courseData = {
                title: formData.get('title'),
                grade: formData.get('grade'),
                description: formData.get('description'),
                videoUrl: formData.get('videoUrl'),
                duration: parseInt(formData.get('duration'))
            };
            
            addCourse(courseData);
        });
    }
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// ===== Message Handling from Main Site =====
function addMessageFromSite(messageData) {
    const newMessage = {
        id: 'msg-' + Date.now(),
        name: messageData.name,
        grade: messageData.grade,
        message: messageData.message,
        timestamp: Date.now(),
        read: false
    };
    
    messages.unshift(newMessage);
    localStorage.setItem('adminMessages', JSON.stringify(messages));
    
    // Update UI if admin panel is open
    if (currentUser) {
        loadMessages();
        loadDashboardStats();
        loadRecentMessages();
    }
}

// ===== Receipts Management =====
let receipts = JSON.parse(localStorage.getItem('receipts') || '[]');

function loadReceipts() {
    const receiptsGrid = document.getElementById('receiptsGrid');
    if (!receiptsGrid) return;
    
    if (receipts.length === 0) {
        receiptsGrid.innerHTML = `
            <div class="no-data">
                <i class="fas fa-receipt"></i>
                <p>لا توجد إيصالات</p>
            </div>
        `;
        return;
    }
    
    receiptsGrid.innerHTML = receipts.map(receipt => createReceiptCard(receipt)).join('');
    updateReceiptsBadge();
}

function createReceiptCard(receipt) {
    const date = new Date(receipt.timestamp).toLocaleDateString('ar-EG');
    const time = new Date(receipt.timestamp).toLocaleTimeString('ar-EG');
    
    const gradeNames = {
        'grade9': 'الصف التاسع المتقدم',
        'grade10': 'الصف العاشر المتقدم',
        'grade11': 'الصف الحادي عشر المتقدم'
    };
    
    const paymentMethods = {
        'ziina': 'Ziina',
        'bank_transfer': 'تحويل بنكي',
        'cash': 'نقداً',
        'other': 'أخرى'
    };
    
    return `
        <div class="receipt-card" data-receipt-id="${receipt.timestamp}">
            <div class="receipt-header">
                <div class="receipt-info">
                    <h4>${receipt.studentName}</h4>
                    <p>${date} - ${time}</p>
                </div>
                <span class="receipt-status ${receipt.status}">${getStatusText(receipt.status)}</span>
            </div>
            <div class="receipt-body">
                <div class="receipt-details">
                    <div class="detail-item">
                        <span class="detail-label">الصف الدراسي</span>
                        <span class="detail-value">${gradeNames[receipt.studentGrade] || receipt.studentGrade}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">رقم الهاتف</span>
                        <span class="detail-value">${receipt.studentPhone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">طريقة الدفع</span>
                        <span class="detail-value">${paymentMethods[receipt.paymentMethod] || receipt.paymentMethod}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">الحالة</span>
                        <span class="detail-value">${getStatusText(receipt.status)}</span>
                    </div>
                </div>
                
                ${receipt.receiptImage ? `
                    <div class="receipt-image">
                        <img src="${receipt.receiptImage}" alt="إيصال الدفع" onclick="viewReceiptImage('${receipt.receiptImage}')">
                    </div>
                ` : ''}
                
                ${receipt.notes ? `
                    <div class="receipt-notes">
                        <h5>ملاحظات:</h5>
                        <p>${receipt.notes}</p>
                    </div>
                ` : ''}
                
                <div class="receipt-actions">
                    ${receipt.status === 'pending' ? `
                        <button class="btn btn-approve" onclick="approveReceipt(${receipt.timestamp})">
                            <i class="fas fa-check"></i>
                            قبول
                        </button>
                        <button class="btn btn-reject" onclick="rejectReceipt(${receipt.timestamp})">
                            <i class="fas fa-times"></i>
                            رفض
                        </button>
                    ` : ''}
                    <button class="btn btn-outline" onclick="deleteReceipt(${receipt.timestamp})">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'في الانتظار',
        'approved': 'مقبول',
        'rejected': 'مرفوض'
    };
    return statusTexts[status] || status;
}

function approveReceipt(timestamp) {
    const receiptIndex = receipts.findIndex(r => r.timestamp === timestamp);
    if (receiptIndex !== -1) {
        receipts[receiptIndex].status = 'approved';
        localStorage.setItem('receipts', JSON.stringify(receipts));
        loadReceipts();
        showNotification('تم قبول الإيصال بنجاح', 'success');
    }
}

function rejectReceipt(timestamp) {
    const receiptIndex = receipts.findIndex(r => r.timestamp === timestamp);
    if (receiptIndex !== -1) {
        receipts[receiptIndex].status = 'rejected';
        localStorage.setItem('receipts', JSON.stringify(receipts));
        loadReceipts();
        showNotification('تم رفض الإيصال', 'warning');
    }
}

function deleteReceipt(timestamp) {
    if (confirm('هل أنت متأكد من حذف هذا الإيصال؟')) {
        receipts = receipts.filter(r => r.timestamp !== timestamp);
        localStorage.setItem('receipts', JSON.stringify(receipts));
        loadReceipts();
        showNotification('تم حذف الإيصال', 'success');
    }
}

function filterReceipts() {
    const statusFilter = document.getElementById('statusFilter').value;
    const gradeFilter = document.getElementById('gradeFilter').value;
    const paymentMethodFilter = document.getElementById('paymentMethodFilter').value;
    
    let filteredReceipts = receipts;
    
    if (statusFilter) {
        filteredReceipts = filteredReceipts.filter(r => r.status === statusFilter);
    }
    
    if (gradeFilter) {
        filteredReceipts = filteredReceipts.filter(r => r.studentGrade === gradeFilter);
    }
    
    if (paymentMethodFilter) {
        filteredReceipts = filteredReceipts.filter(r => r.paymentMethod === paymentMethodFilter);
    }
    
    const receiptsGrid = document.getElementById('receiptsGrid');
    if (filteredReceipts.length === 0) {
        receiptsGrid.innerHTML = `
            <div class="no-data">
                <i class="fas fa-receipt"></i>
                <p>لا توجد إيصالات تطابق المرشحات</p>
            </div>
        `;
    } else {
        receiptsGrid.innerHTML = filteredReceipts.map(receipt => createReceiptCard(receipt)).join('');
    }
}

function refreshReceipts() {
    receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
    loadReceipts();
    showNotification('تم تحديث الإيصالات', 'success');
}

function exportReceipts() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "اسم الطالب,الصف,رقم الهاتف,طريقة الدفع,الحالة,التاريخ,الملاحظات\n"
        + receipts.map(r => {
            const date = new Date(r.timestamp).toLocaleDateString('ar-EG');
            return `"${r.studentName}","${r.studentGrade}","${r.studentPhone}","${r.paymentMethod}","${getStatusText(r.status)}","${date}","${r.notes || ''}"`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "receipts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function viewReceiptImage(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content receipt-modal">
            <div class="modal-header">
                <h3>معاينة الإيصال</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <img src="${imageSrc}" alt="إيصال الدفع" class="receipt-modal-image">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function updateReceiptsBadge() {
    const badge = document.getElementById('receiptsBadge');
    if (badge) {
        const pendingCount = receipts.filter(r => r.status === 'pending').length;
        badge.textContent = pendingCount;
        badge.style.display = pendingCount > 0 ? 'inline' : 'none';
    }
}

// ===== Video Management =====
function openAddVideoModal() {
    const modal = document.getElementById('addVideoModal');
    modal.classList.add('active');
}

function closeAddVideoModal() {
    const modal = document.getElementById('addVideoModal');
    modal.classList.remove('active');
    document.getElementById('addVideoForm').reset();
}

function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
    const videosGrid = document.getElementById('adminVideosGrid');
    
    if (videos.length === 0) {
        videosGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-video"></i>
                <h3>لا توجد فيديوهات</h3>
                <p>ابدأ بإضافة فيديو جديد</p>
            </div>
        `;
        return;
    }
    
    videosGrid.innerHTML = videos.map(video => `
        <div class="video-card" data-id="${video.id}">
            <div class="video-thumbnail">
                <img src="${video.thumbnail || 'https://img.youtube.com/vi/' + extractVideoId(video.videoUrl) + '/maxresdefault.jpg'}" 
                     alt="${video.title}" onerror="this.src='https://via.placeholder.com/320x180?text=فيديو'">
                <div class="video-duration">${video.duration} دقيقة</div>
                <div class="video-status ${video.status}">
                    ${video.status === 'free' ? 'مجاني' : 'مدفوع'}
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <div class="video-meta">
                    <span class="video-grade">${getGradeName(video.grade)}</span>
                    <span class="video-type">${getTypeName(video.type)}</span>
                </div>
                <div class="video-actions">
                    <button class="btn btn-sm btn-outline" onclick="editVideo('${video.id}')">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteVideo('${video.id}')">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function extractVideoId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
}

function getGradeName(grade) {
    const grades = {
        'grade9': 'الصف التاسع',
        'grade10': 'الصف العاشر',
        'grade11': 'الصف الحادي عشر'
    };
    return grades[grade] || grade;
}

function getTypeName(type) {
    const types = {
        'lesson': 'درس',
        'review': 'مراجعة',
        'exam': 'امتحان',
        'homework': 'واجب'
    };
    return types[type] || type;
}

function addVideo(videoData) {
    const videos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
    const newVideo = {
        id: Date.now().toString(),
        ...videoData,
        createdAt: new Date().toISOString()
    };
    
    videos.push(newVideo);
    localStorage.setItem('adminVideos', JSON.stringify(videos));
    
    // Update main site videos
    updateMainSiteVideos();
    loadVideos();
    showNotification('تم إضافة الفيديو بنجاح', 'success');
}

function editVideo(videoId) {
    const videos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
    const video = videos.find(v => v.id === videoId);
    
    if (video) {
        // Fill form with video data
        const form = document.getElementById('addVideoForm');
        form.title.value = video.title;
        form.grade.value = video.grade;
        form.description.value = video.description;
        form.videoUrl.value = video.videoUrl;
        form.duration.value = video.duration;
        form.thumbnail.value = video.thumbnail || '';
        form.type.value = video.type;
        form.status.value = video.status;
        
        // Change form to edit mode
        form.dataset.editId = videoId;
        document.querySelector('#addVideoModal h3').textContent = 'تعديل الفيديو';
        document.querySelector('#addVideoModal .btn-primary').textContent = 'حفظ التعديلات';
        
        openAddVideoModal();
    }
}

function deleteVideo(videoId) {
    if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
        const videos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
        const updatedVideos = videos.filter(v => v.id !== videoId);
        localStorage.setItem('adminVideos', JSON.stringify(updatedVideos));
        
        updateMainSiteVideos();
        loadVideos();
        showNotification('تم حذف الفيديو بنجاح', 'success');
    }
}

function updateMainSiteVideos() {
    const adminVideos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
    localStorage.setItem('siteVideos', JSON.stringify(adminVideos));
}

// Initialize video form handler
document.addEventListener('DOMContentLoaded', function() {
    const addVideoForm = document.getElementById('addVideoForm');
    if (addVideoForm) {
        addVideoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const videoData = {
                title: formData.get('title'),
                grade: formData.get('grade'),
                description: formData.get('description'),
                videoUrl: formData.get('videoUrl'),
                duration: parseInt(formData.get('duration')),
                thumbnail: formData.get('thumbnail'),
                type: formData.get('type'),
                status: formData.get('status')
            };
            
            if (this.dataset.editId) {
                // Edit existing video
                const videos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
                const videoIndex = videos.findIndex(v => v.id === this.dataset.editId);
                if (videoIndex !== -1) {
                    videos[videoIndex] = { ...videos[videoIndex], ...videoData };
                    localStorage.setItem('adminVideos', JSON.stringify(videos));
                    updateMainSiteVideos();
                    loadVideos();
                    showNotification('تم تحديث الفيديو بنجاح', 'success');
                }
                
                // Reset form
                delete this.dataset.editId;
                document.querySelector('#addVideoModal h3').textContent = 'إضافة فيديو جديد';
                document.querySelector('#addVideoModal .btn-primary').textContent = 'إضافة الفيديو';
            } else {
                // Add new video
                addVideo(videoData);
            }
            
            closeAddVideoModal();
        });
    }
});

// ===== Export functions for use in main site =====
window.adminPanel = {
    addMessage: addMessageFromSite,
    updateReceiptsBadge: updateReceiptsBadge,
    loadReceipts: loadReceipts,
    loadVideos: loadVideos
};