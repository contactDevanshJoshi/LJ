import { db } from "./firebase.js";
import { doc, getDoc, addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let teacherData = null;

window.loginTeacher = async function () {
  const teacherId = document.getElementById("teacherId").value;
  const teacherKey = document.getElementById("teacherKey").value;

  const docRef = doc(db, "teachers", teacherId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("Teacher not found");
    return;
  }

  const data = docSnap.data();

  if (data.teacherKey !== teacherKey) {
    alert("Wrong key");
    return;
  }

  teacherData = data;

  document.getElementById("panel").style.display = "block";
};

window.addQuestion = async function () {
  if (!teacherData) {
    alert("Login first");
    return;
  }

  const phase = document.getElementById("phase").value;
  const chapterId = document.getElementById("chapterId").value;
  const difficulty = document.getElementById("difficulty").value;

  const question = document.getElementById("question").value;

  const options = [
    document.getElementById("opt1").value,
    document.getElementById("opt2").value,
    document.getElementById("opt3").value,
    document.getElementById("opt4").value
  ];

  const correctAnswer = document.getElementById("correct").value;

  await addDoc(collection(db, "questions"), {
    subjectId: teacherData.subjectId, // 🔥 auto from teacher
    phase,
    chapterId,
    difficulty,
    question,
    options,
    correctAnswer,
    createdBy: "teacher"
  });

  alert("Question Added ✅");
};

match /questions/{id} {
  allow read: if true;
  allow write: if request.resource.data.createdBy == "teacher"
               || request.resource.data.adminKey == "SECRET123";
}