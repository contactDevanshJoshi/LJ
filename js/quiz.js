import { db } from "./firebase.js";
import { collection, getDocs, query, where, addDoc } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const url = new URLSearchParams(window.location.search);

const enrollment = url.get("enrollment");
const subjectId = url.get("subjectId");
const phase = url.get("phase");
const chapterId = url.get("chapterId");
const difficulty = url.get("difficulty");

let qList = [], i = 0, score = 0;

async function load() {
  let q;

  if (chapterId === "full") {
    q = query(collection(db, "questions"),
      where("subjectId", "==", subjectId),
      where("phase", "==", phase),
      where("difficulty", "==", difficulty)
    );
  } else {
    q = query(collection(db, "questions"),
      where("chapterId", "==", chapterId),
      where("difficulty", "==", difficulty)
    );
  }

  const snap = await getDocs(q);

  snap.forEach(d => qList.push(d.data()));

  qList.sort(() => 0.5 - Math.random());
  qList = qList.slice(0, 10);

  show();
}

function show() {
  let q = qList[i];
  document.getElementById("q").innerText = q.question;

  let html = "";
  let answered = false;

  q.options.forEach(opt => {
    html += `<button onclick="check('${opt}', this)">${opt}</button>`;
  });

  document.getElementById("opt").innerHTML = html;

  window.check = (opt, btn) => {
    if (answered) return;
    answered = true;

    if (opt === q.correctAnswer) {
      score++;
      btn.style.background = "green";
    } else {
      btn.style.background = "red";
    }
  };
}

window.next = async () => {
  i++;
  if (i >= qList.length) {

    await addDoc(collection(db, "scores"), {
      enrollment,
      subjectId,
      score,
      total: 10,
      timestamp: new Date()
    });

    window.location.href = `result.html?score=${score}`;
  } else show();
};

load();