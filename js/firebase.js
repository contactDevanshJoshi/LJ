import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDx6abGpJdQltTmfzllb9DRQBHvMphFR0",
  authDomain: "ds-sem2.firebaseapp.com",
  projectId: "ds-sem2",
  storageBucket: "ds-sem2.firebasestorage.app",
  messagingSenderId: "589678449392",
  appId: "1:589678449392:web:0582b43c0c59173a40e835"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };