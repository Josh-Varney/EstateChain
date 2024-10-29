import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Define the Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY as string, // Assert type as string
  authDomain: process.env.REACT_APP_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_PROJECT_ID as string, 
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_APP_ID as string,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Logging instances for debugging
console.log("Firebase App Initialized:", app);
console.log("Auth Instance:", auth);
console.log("Firestore Instance:", db);
console.log("GoogleAuthProvider:", provider);

// Export Firebase instances for use in other parts of the application
export { app, auth, provider, db };
