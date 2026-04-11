import { db } from "./firebase.js";
import { doc, getDoc, collection, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const url = new URLSearchParams(window.location.search);
const enrollment = url.get("enrollment");

async function load() {
  const s = await getDoc(doc(db, "students", enrollment));
  const student = s.data();

  document.getElementById("name").innerText =
    `${student.name} (${enrollment})`;

  const q = query(
    collection(db, "subjects"),
    where("semester", "==", student.semester),
    where("department", "==", student.department)
  );

  const snap = await getDocs(q);

  snap.forEach(d => {
    document.getElementById("subjects").innerHTML += `
      <div class="card" onclick="openSub('${d.id}')">${d.data().name}</div>
    `;
  });
}

window.openSub = (id) => {
  window.location.href = `phase.html?enrollment=${enrollment}&subjectId=${id}`;
};

load();