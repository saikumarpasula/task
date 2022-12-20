const quizQuestion = document.getElementById("question");

const quizChoices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Constants

const correctBonus = 10;
const maxQuestion = 10;

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      // console.log(formattedQuestion);
      // console.log(formattedQuestion.answer);
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      console.log(loadedQuestion.correct_answer);
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestion) {
    localStorage.setItem("mostRecentScore", score);
    console.log(window);
    return window.location.assign("./end.html");
  }
  questionCounter++;
  // console.log(progressBarFull);
  progressText.innerText = `Question:  ${questionCounter}/${maxQuestion}`;
  progressBarFull.style.width = `${(questionCounter / maxQuestion) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  quizQuestion.innerText = `${questionCounter}. ${currentQuestion.question}`;

  quizChoices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
quizChoices.forEach((choice) => {
  choice.addEventListener("click", function (e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    let classAnswer = "incorrect";

    if (selectedAnswer == currentQuestion.answer) {
      classAnswer = "correct";
      incrementScore(correctBonus);
    }
    // let classToApply =
    //   selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classAnswer);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classAnswer);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerHTML = score;
};
