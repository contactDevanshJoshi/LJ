import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const student = JSON.parse(localStorage.getItem("student"));

document.getElementById("studentName").innerText =
  student.name + " (" + student.enrollment + ")";

async function loadSubjects() {
  const q = query(
    collection(db, "subjects"),
    where("semester", "==", student.semester),
    where("department", "==", student.department)
  );

  const snapshot = await getDocs(q);

  const container = document.getElementById("subjects");

  snapshot.forEach(doc => {
    const subject = doc.data();

    container.innerHTML += `
      <div onclick="openSubject('${doc.id}')">
        <h3>${subject.name}</h3>
      </div>
    `;
  });
}

window.openSubject = function(subjectId) {
  localStorage.setItem("subjectId", subjectId);
  window.location.href = "quiz.html";
};

loadSubjects();