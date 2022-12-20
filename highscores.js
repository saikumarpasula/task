const highScoresList = document.getElementById("high-score-ul-list");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);
const tableInfo = document.getElementById("table-info");
console.log(highScores.length == 0);
if (highScores.length != 0) {
  tableInfo.classList.add("hidden");
  highScoresList.innerHTML = highScores
    .map((highScore) => {
      return `<div class="each-player"> <li class="player name"> ${highScore.name}  </li>
      <p class="player score"> - ${highScore.score}</p></div> `;
    })
    .join("");
} else {
  tableInfo.classList.remove("hidden");
}
