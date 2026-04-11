import { db } from "./firebase.js";
import { collection, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const subjectId = getParam("subjectId");
const phase = getParam("phase");
const enrollment = getParam("enrollment");

async function loadChapters() {
  const q = query(
    collection(db, "chapters"),
    where("subjectId", "==", subjectId),
    where("phase", "==", phase)
  );

  const snapshot = await getDocs(q);
  const container = document.getElementById("chapters");

  container.innerHTML += `
    <div onclick="selectChapter('full')">
      <h3>Full ${phase}</h3>
    </div>
  `;

  snapshot.forEach(doc => {
    const c = doc.data();

    container.innerHTML += `
      <div onclick="selectChapter('${doc.id}')">
        <h3>${c.name}</h3>
      </div>
    `;
  });
}

window.selectChapter = function(chapterId) {
  window.location.href =
    `difficulty.html?enrollment=${enrollment}&subjectId=${subjectId}&phase=${phase}&chapterId=${chapterId}`;
};

loadChapters();