const score = localStorage.getItem("score");
const wrong = JSON.parse(localStorage.getItem("wrong"));

document.getElementById("score").innerText = "Score: " + score + "/10";

window.showWrong = function () {
  const div = document.getElementById("wrongList");

  wrong.forEach(q => {
    div.innerHTML += `
      <p><b>${q.question}</b></p>
      <p>Correct: ${q.correctAnswer}</p>
      <hr>
    `;
  });
};