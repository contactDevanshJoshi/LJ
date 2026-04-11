import { db } from "./firebase.js";
import { collection, getDocs, query, where, addDoc } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const enrollment = getParam("enrollment");
const subjectId = getParam("subjectId");
const phase = getParam("phase");
const chapterId = getParam("chapterId");
const difficulty = getParam("difficulty");

let questions = [];
let currentIndex = 0;
let score = 0;

async function loadQuestions() {
  let q;

  if (chapterId === "full") {
    q = query(
      collection(db, "questions"),
      where("subjectId", "==", subjectId),
      where("phase", "==", phase),
      where("difficulty", "==", difficulty)
    );
  } else {
    q = query(
      collection(db, "questions"),
      where("chapterId", "==", chapterId),
      where("difficulty", "==", difficulty)
    );
  }

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    questions.push({ ...doc.data() });
  });

  questions.sort(() => 0.5 - Math.random());
  questions = questions.slice(0, 10);

  showQuestion();
}

function showQuestion() {
  let answered = false;

q.options.forEach(opt => {
  const btn = document.createElement("button");
  btn.innerText = opt;

  btn.onclick = () => {
    if (answered) return; // 🔥 prevent multiple clicks
    answered = true;

    if (opt === q.correctAnswer) {
      score++;
      btn.style.background = "green";
    } else {
      btn.style.background = "red";
    }
  };

  optionsDiv.appendChild(btn);
  });
}

window.nextQuestion = async function () {
  currentIndex++;

  if (currentIndex >= questions.length) {

    await addDoc(collection(db, "scores"), {
      enrollmentNo: enrollment,
      subjectId,
      phase,
      chapterId,
      difficulty,
      score,
      total: 10,
      timestamp: new Date()
    });

    window.location.href =
      `result.html?score=${score}`;
  } else {
    showQuestion();
  }
};

loadQuestions();