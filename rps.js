let randomMove;
let computerMove
let playerMove;
let result;
let score = JSON.parse(localStorage.getItem("score")) ?? {
  wins: 0,
  loses: 0,
  ties: 0
}
let intervalId;
let isAutoPlaying = false;

const scoreCard = document.querySelector(".js-score");
scoreCard.innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;

const buttonChosen = document.querySelectorAll(".js-move");

const resetButton = document.querySelector(".js-reset");

const autoPlay = document.querySelector(".js-autoplay");

const rock = document.querySelector(".js-rock");
const paper = document.querySelector(".js-paper");
const Scissors = document.querySelector(".js-Scissors");

function chooseMove() {
  let randomNumber = Math.random();
  if (randomNumber < 1/3) {
    randomMove = "Rock";
  } else if ((1/3 < randomNumber) && (randomNumber < 2/3)) {
    randomMove = "Paper";
  } else {
    randomMove = "Scissors";
  }
};

buttonChosen.forEach(function(move) {
  move.addEventListener("click", function(){
    playerMove = move.innerText;
    playGame();
  });
});

function declareWinner () {
  if (playerMove === computerMove) {
    result = "Tie";
    score.ties++;
  } else if ((playerMove === "Rock" && computerMove === "Scissors") || (playerMove === "Paper" && computerMove === "Rock") || (playerMove === "Scissors" && computerMove === "Paper")) {
    result = "You Win";
    score.wins++;
  } else {
    result = "You Lose";
    score.loses++;
  }
  localStorage.setItem("score", JSON.stringify(score));
};

function playGame() {
  chooseMove();
  computerMove = randomMove;
  declareWinner();
  const winnerShow = document.querySelector(".js-declare");
  winnerShow.innerHTML = `You chose <img src="${playerMove.toLowerCase()}-emoji.png" class="move-icon">, Computer chose <img src="${computerMove.toLowerCase()}-emoji.png" class="move-icon">, ${result}`;
  const scoreCard = document.querySelector(".js-score");
  scoreCard.innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
}

resetButton.addEventListener("click", function() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  document.querySelector(".js-reset-confirm-yes").addEventListener("click", function() {
    score = {
    wins: 0,
    loses: 0,
    ties: 0
    };
    localStorage.setItem("score", JSON.stringify(score));
    const scoreCard = document.querySelector(".js-score");
    scoreCard.innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
    document.querySelector('.js-reset-confirmation').innerHTML = "";
  });
  document.querySelector(".js-reset-confirm-no").addEventListener("click", function() {
    document.querySelector('.js-reset-confirmation').innerHTML = "";
  });
});

function autoPlayGame () {
  chooseMove();
  playerMove = randomMove;
  playGame();
}

autoPlay.addEventListener("click", function() {
  if (isAutoPlaying === false) {
    intervalId = setInterval(autoPlayGame, 1000);
    autoPlay.innerHTML= "Stop Playing"
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlay.innerHTML = "Auto Play";
    isAutoPlaying = false;
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "a") {
    autoPlay.click();
  } else if (event.key === "Backspace") {
    resetButton.click();
  } else if (event.key === "r") {
    playerMove = "Rock";
    playGame();
  } else if (event.key === "p") {
    playerMove = "Paper";
    playGame();
  } else if (event.key === "s") {
    playerMove = "Scissors";
    playGame();
  }
});