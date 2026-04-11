import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.login = async function () {
  const enrollment = document.getElementById("enrollment").value;

  if (!enrollment) {
    alert("Enter Enrollment Number");
    return;
  }

  const docRef = doc(db, "students", enrollment);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    localStorage.setItem("student", JSON.stringify(docSnap.data()));
    localStorage.setItem("enrollment", enrollment);
    window.location.href = "dashboard.html";
  } else {
    alert("Student not found");
  }
};