import { db } from "./firebase.js";
import { collection, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const subjectId = getParam("subjectId");
const enrollment = getParam("enrollment");

async function loadPhases() {
  const q = query(
    collection(db, "teachingPhases"),
    where("subjectId", "==", subjectId)
  );

  const snapshot = await getDocs(q);
  const container = document.getElementById("phases");

  snapshot.forEach(doc => {
    const p = doc.data();

    container.innerHTML += `
      <div onclick="selectPhase('${p.phase}')">
        <h3>${p.phase}</h3>
      </div>
    `;
  });
}

window.selectPhase = function(phase) {
  window.location.href =
    `chapter.html?enrollment=${enrollment}&subjectId=${subjectId}&phase=${phase}`;
};

loadPhases();