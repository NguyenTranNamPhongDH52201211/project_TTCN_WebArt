// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh4ACMGMmAvgbucwWi7fDQLj7boD5iMXo",
  authDomain: "login-4a9fc.firebaseapp.com",
  projectId: "login-4a9fc",
  storageBucket: "login-4a9fc.firebasestorage.app",
  messagingSenderId: "570010709218",
  appId: "1:570010709218:web:c9f44f4b41337e3eda82bb",
  measurementId: "G-NHE5SFH6KW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 3️⃣ Khởi tạo Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
