import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let questions = [];
let currentIndex = 0;
let score = 0;
let wrongAnswers = [];

async function loadQuestions() {
  const subjectId = localStorage.getItem("subjectId");

  const q = query(
    collection(db, "questions"),
    where("subjectId", "==", subjectId)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    questions.push({ id: doc.id, ...doc.data() });
  });

  // shuffle
  questions.sort(() => 0.5 - Math.random());

  questions = questions.slice(0, 10);

  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];

  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      if (opt === q.correctAnswer) {
        score++;
        btn.style.background = "green";
      } else {
        btn.style.background = "red";
        wrongAnswers.push(q);
      }
    };

    optionsDiv.appendChild(btn);
  });
}

window.nextQuestion = function () {
  currentIndex++;

  if (currentIndex >= questions.length) {
    localStorage.setItem("score", score);
    localStorage.setItem("wrong", JSON.stringify(wrongAnswers));
    window.location.href = "result.html";
  } else {
    showQuestion();
  }
};

loadQuestions();