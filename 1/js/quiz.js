let questions=[],i=0,score=0;

const subject=localStorage.getItem("subject");

db.collection("questions").where("subject","==",subject).get()
.then(s=>{
  questions=s.docs.map(d=>d.data()).slice(0,10);
  show();
});

function show(){
  if(i>=questions.length){
    document.getElementById("quizBox").innerHTML=`Score: ${score}/10`;
    return;
  }
  let q=questions[i];
  let html=`<div class='card'><h3>${q.question}</h3></div>`;
  q.options.forEach(o=>{
    html+=`<div class='card' onclick="ans('${o}')">${o}</div>`;
  });
  document.getElementById("quizBox").innerHTML=html;
}

function ans(a){
  if(a===questions[i].answer) score++;
  i++; show();
}