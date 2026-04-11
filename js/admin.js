import { db } from "./firebase.js";
import { doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔑 Change this password
const ADMIN_PASSWORD = "admin123";

window.checkAdmin = function () {
  const pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Wrong password");
  }
};

window.addStudent = async function () {
  const enroll = document.getElementById("enroll").value;
  const name = document.getElementById("name").value;
  const dept = document.getElementById("dept").value;
  const sem = document.getElementById("sem").value;
  const hod = document.getElementById("hod").value;

  if (!enroll || !name) {
    alert("Fill required fields");
    return;
  }

  await setDoc(doc(db, "students", enroll), {
    name,
    department: dept,
    semester: sem,
    hodName: hod
  });

  alert("Student Added ✅");
};

window.addSubject = async function () {
  const name = document.getElementById("subName").value;
  const dept = document.getElementById("subDept").value;
  const sem = document.getElementById("subSem").value;

  if (!name) {
    alert("Enter subject name");
    return;
  }

  await addDoc(collection(db, "subjects"), {
    name,
    department: dept,
    semester: sem
  });

  alert("Subject Added ✅");
};
