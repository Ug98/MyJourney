// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc7jQgElNqNnMsmq72Sb_WOH45oNU3830",
  authDomain: "myjourney-3457e.firebaseapp.com",
  projectId: "myjourney-3457e",
  storageBucket: "myjourney-3457e.appspot.com",
  messagingSenderId: "179818203702",
  appId: "1:179818203702:web:0c94e1f0ffc4731fb5a697",
  measurementId: "G-N41P47BW76",
  databaseURL: "https://myjourney-3457e-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);