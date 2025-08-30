let computerMove;
let playerMove;
let result;
const score = JSON.parse(localStorage.getItem("score")) ?? {
  wins: 0,
  loses: 0,
  ties: 0
}
function chooseMove() {
  let randomNumber = Math.random();
  if (randomNumber < 1/3) {
    computerMove = "Rock";
  } else if ((1/3 < randomNumber) && (randomNumber < 2/3)) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissor";
  }
};

function declareWinner () {
  if (playerMove === computerMove) {
    result = "Tie";
    score.ties++;
  } else if ((playerMove === "Rock" && computerMove === "Scissor") || (playerMove === "Paper" && computerMove === "Rock") || (playerMove === "Scissor" && computerMove === "Paper")) {
    result = "You Win";
    score.wins++;
  } else {
    result = "You Lose";
    score.loses++;
  }
};

const buttonChosen = document.querySelectorAll(".js-move");
buttonChosen.forEach(function(move) {
  move.addEventListener("click", function(){
    playerMove = move.innerHTML;
    chooseMove();
    declareWinner();
    const winnerShow = document.querySelector(".js-declare");
    winnerShow.innerHTML = `You chose ${playerMove}, Computer chose ${computerMove}, ${result}`;
    const scoreCard = document.querySelector(".js-score");
    scoreCard.innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
  });
});

