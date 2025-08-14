// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgGkvLcGi5t8YXw3BExqUu5jW50z9xI2A",
  authDomain: "elshenawyphysics.firebaseapp.com",
  projectId: "elshenawyphysics",
  storageBucket: "elshenawyphysics.firebasestorage.app",
  messagingSenderId: "8440782600",
  appId: "1:8440782600:web:c416033b47bfba4fb8d6bd",
  measurementId: "G-HHLN07EV8D"
};

// Initialize Firebase (will be loaded from CDN)
let app, auth, db, analytics, googleProvider;

// Initialize Firebase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if Firebase is loaded
  if (typeof firebase !== 'undefined') {
    // Initialize Firebase
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    analytics = firebase.analytics();
    
    // Configure Google provider
    googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('email');
    googleProvider.addScope('profile');
    
    console.log('Firebase initialized successfully');
    
    // Trigger custom event to notify other scripts
    window.dispatchEvent(new CustomEvent('firebaseReady'));
  } else {
    console.error('Firebase SDK not loaded. Please check your internet connection.');
  }
});

// Export Firebase services for global access
window.firebaseApp = () => app;
window.firebaseAuth = () => auth;
window.firebaseDb = () => db;
window.firebaseAnalytics = () => analytics;
window.googleProvider = () => googleProvider;