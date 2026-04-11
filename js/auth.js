import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.login = async () => {
  const enrollment = document.getElementById("enrollment").value;

  const snap = await getDoc(doc(db, "students", enrollment));

  if (!snap.exists()) return alert("Not found");

  window.location.href = `dashboard.html?enrollment=${enrollment}`;
};