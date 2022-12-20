const username = document.getElementById("username");
const userMessage = document.getElementById("user-message");
const saveScoreBtn = document.getElementById("save-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("final-score");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const topPlayers = 5;

userScore = localStorage.getItem("mostRecentScore");
if (userScore >= 50) {
  userMessage.innerHTML = `Congratulations!! You have scored an overall ${userScore}% </br> Enter username below to reach the leaderboard! `;
} else {
  userMessage.innerHTML = `You have scored an overall ${userScore}% Play again to Increase score! </br> or Enter username below `;
}
// finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  if (username.value) {
    saveScoreBtn.disabled = false;
  }
});

saveHighScore = (e) => {
  e.preventDefault();
  const scoreObj = {
    score: mostRecentScore,
    name: username.value,
  };

  //  if(scoreObj.name != highScores[][1]){
  highScores.push(scoreObj);
  //  }
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(topPlayers);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
};
