import { db } from "./firebase.js";
import { doc, getDoc, addDoc, collection, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let teacher = null;

window.loginTeacher = async () => {
  const id = teacherId.value;
  const key = teacherKey.value;

  const snap = await getDoc(doc(db, "teachers", id));

  if (!snap.exists()) return alert("Not found");

  const data = snap.data();

  if (data.teacherKey !== key) return alert("Wrong");

  teacher = data;
  panel.style.display = "block";

  loadScores();
};

window.addQuestion = async () => {
  await addDoc(collection(db, "questions"), {
    subjectId: teacher.subjectId,
    phase: phase.value,
    chapterId: chapterId.value,
    difficulty: difficulty.value,
    question: question.value,
    options: [opt1.value, opt2.value, opt3.value, opt4.value],
    correctAnswer: correct.value
  });

  alert("Added");
};

async function loadScores() {
  const q = query(collection(db, "scores"),
    where("subjectId", "==", teacher.subjectId));

  const snap = await getDocs(q);

  snap.forEach(d => {
    scores.innerHTML += `<div class="card">
      ${d.data().enrollment} - ${d.data().score}/10
    </div>`;
  });
}