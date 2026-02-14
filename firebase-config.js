// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    updatePassword,
    updateEmail,
    deleteUser,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDtOz0AMlrjcN7xfmkFuhQUU8Zl0MfQMSE",
    authDomain: "adds-ink.firebaseapp.com",
    projectId: "adds-ink",
    storageBucket: "adds-ink.firebasestorage.app",
    messagingSenderId: "638657776631",
    appId: "1:638657776631:web:44ffdad33137bfefa57cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    updatePassword,
    updateEmail,
    deleteUser,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    googleProvider,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs
};