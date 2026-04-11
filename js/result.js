function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const score = getParam("score");

document.getElementById("score").innerText =
  "Score: " + score + "/10";