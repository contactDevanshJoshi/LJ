import { db } from "./firebase.js";
import { doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔑 Change this password
const ADMIN_PASSWORD = "admin123";

window.checkAdmin = function () {
  const pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Wrong password");
  }
};

window.addStudent = async function () {
  const enroll = document.getElementById("enroll").value;
  const name = document.getElementById("name").value;
  const dept = document.getElementById("dept").value;
  const sem = document.getElementById("sem").value;
  const hod = document.getElementById("hod").value;

  if (!enroll || !name) {
    alert("Fill required fields");
    return;
  }

  await setDoc(doc(db, "students", enroll), {
    name,
    department: dept,
    semester: sem,
    hodName: hod, 
    enrollment: enroll
  });

  alert("Student Added ✅");
};

window.addSubject = async function () {
  const name = document.getElementById("subName").value;
  const dept = document.getElementById("subDept").value;
  const sem = document.getElementById("subSem").value;

  if (!name) {
    alert("Enter subject name");
    return;
  }

  await addDoc(collection(db, "subjects"), {
    name,
    department: dept,
    semester: sem
  });

  alert("Subject Added ✅");
};

window.addTeacher = async function () {
  const teacherId = document.getElementById("teacherId").value;
  const name = document.getElementById("teacherName").value;
  const department = document.getElementById("teacherDept").value;
  const subjectId = document.getElementById("teacherSubjectId").value;
  const teacherKey = document.getElementById("teacherKey").value;

  if (!teacherId || !name || !subjectId || !teacherKey) {
    alert("Fill all required fields");
    return;
  }

  await setDoc(doc(db, "teachers", teacherId), {
    name,
    department,
    subjectId,
    teacherKey
  });

  alert("Teacher Added ✅");
};

window.addPhase = async function () {
  const subjectId = document.getElementById("phaseSubjectId").value;
  const phase = document.getElementById("phaseName").value;

  if (!subjectId || !phase) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "teachingPhases"), {
    subjectId,
    phase
  });

  alert("Phase Added ✅");
};

window.addChapter = async function () {
  const subjectId = document.getElementById("chapterSubjectId").value;
  const phase = document.getElementById("chapterPhase").value;
  const name = document.getElementById("chapterName").value;

  if (!subjectId || !phase || !name) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "chapters"), {
    subjectId,
    phase,
    name
  });

  alert("Chapter Added ✅");
};