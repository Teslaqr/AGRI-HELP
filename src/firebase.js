// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj4ygmY8O5tMJyXSGxnZfswYiLNOtWKXk",
  authDomain: "agri-help-73388.firebaseapp.com",
  projectId: "agri-help-73388",
  storageBucket: "agri-help-73388.firebasestorage.app",
  messagingSenderId: "75520034883",
  appId: "1:75520034883:web:536836e0b84d8fb12aacf6",
  measurementId: "G-GRLSF49LRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
