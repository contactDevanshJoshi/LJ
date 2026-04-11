import { db } from "./firebase.js";
import { collection, getDocs, query, where, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const enrollment = getParam("enrollment");

async function loadStudent() {
  const docRef = doc(db, "students", enrollment);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("Student not found");
    return;
  }

  const student = docSnap.data();

  document.getElementById("studentName").innerText =
    student.name + " (Enrollment: " + enrollment + ")";

  loadSubjects(student);
}

async function loadSubjects(student) {
  const q = query(
    collection(db, "subjects"),
    where("semester", "==", student.semester),
    where("department", "==", student.department)
  );

  const snapshot = await getDocs(q);
  const container = document.getElementById("subjects");

  snapshot.forEach(docSnap => {
    const subject = docSnap.data();

    container.innerHTML += `
      <div onclick="openSubject('${docSnap.id}')">
        <h3>${subject.name}</h3>
      </div>
    `;
  });
}

window.openSubject = function(subjectId) {
  window.location.href =
    `phase.html?enrollment=${enrollment}&subjectId=${subjectId}`;
};

loadStudent();