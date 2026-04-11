function login() {
  const enrollment = document.getElementById("enrollment").value;

  db.collection("users").doc(enrollment).get().then(doc => {
    if (!doc.exists) {
      alert("User not found");
      return;
    }

    const user = doc.data();
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "student") window.location = "pages/dashboard.html";
    if (user.role === "admin") window.location = "pages/admin.html";
    if (user.role === "teacher") window.location = "pages/teacher.html";
    if (user.role === "superadmin") window.location = "pages/admin.html";
  });
}