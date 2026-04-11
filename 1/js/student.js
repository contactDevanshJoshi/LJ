const user = JSON.parse(localStorage.getItem("user"));
if (!user) location.href = "../index.html";

document.getElementById("name").innerText = user.name;

db.collection("subjects")
.where("semester","==",user.semester)
.get()
.then(snap=>{
  let html="";
  snap.forEach(doc=>{
    const s=doc.data();
    html+=`<div class="card" onclick="openSub('${doc.id}')">${s.name}</div>`;
  });
  document.getElementById("subjects").innerHTML=html;
});

function openSub(id){
  localStorage.setItem("subject",id);
  location.href="quiz.html";
}