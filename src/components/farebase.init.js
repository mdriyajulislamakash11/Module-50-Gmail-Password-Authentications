// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw1NxL7SqFXCQ5Yr12wSlVN3I2dfsZKyk",
  authDomain: "password-authentications.firebaseapp.com",
  projectId: "password-authentications",
  storageBucket: "password-authentications.firebasestorage.app",
  messagingSenderId: "276360720079",
  appId: "1:276360720079:web:a7f7ea9d5777c5a62491ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;