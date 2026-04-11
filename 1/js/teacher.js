db.collection("scores").get().then(s=>{
  let html="";
  s.forEach(d=>{
    const x=d.data();
    html+=`<div class='card'>${x.student} - ${x.score}</div>`;
  });
  document.getElementById("data").innerHTML=html;
});