'use strict';

// element decaration
let playerZeroTotalScore = document.getElementById('score--0');
let playerOneTotalScore = document.getElementById('score--1');
let dice = document.querySelector('.dice');
let currentPlayer = document.querySelector('.player--active');
let playerZero = document.querySelector('.player--0');
let playerOne = document.querySelector('.player--1');
let playerZeroCurrentScore = document.getElementById('current--0');
let playerOneCurrentScore = document.getElementById('current--1');
let rollButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let resetButton = document.querySelector('.btn--new');

// variable value declaration
// both Player's current and total score should be zero
// current player should be set to player 0
let currentScore = 0;
let currentPlayerNumber = 0;
let totalScore = [0, 0];
let gameWon = false;

// dice should be hidden
// total score for both player should be zero
let initialStateOfTheGame = function () {
  dice.classList.add('hidden');
  playerZeroTotalScore.textContent = 0;
  playerOneTotalScore.textContent = 0;
};

// initialStateOfTheGame function executes on load of the page to set the inital state of the game
initialStateOfTheGame();
let switchPlayers = function () {
  let switchPlayer = currentPlayerNumber === 0 ? 1 : 0;
  document
    .querySelector(`.player--${currentPlayerNumber}`)
    .classList.toggle('player--active');
  document
    .querySelector(`.player--${switchPlayer}`)
    .classList.toggle('player--active');
  document.querySelector(`#current--${currentPlayerNumber}`).textContent = 0;
  currentPlayerNumber = switchPlayer;
  currentScore = 0;
};

rollButton.addEventListener('click', function () {
  if (!gameWon) {
    // genrate random number
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    // show dice image based on the number
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    if (diceNumber === 1) {
      switchPlayers();
    } else {
      currentScore += diceNumber;
      console.log(currentScore, currentPlayerNumber);
      document.querySelector(`#current--${currentPlayerNumber}`).textContent =
        currentScore;
    }
  }
});

holdButton.addEventListener('click', function () {
  if (!gameWon) {
    dice.classList.add('hidden');

    // add current score to total
    totalScore[currentPlayerNumber] += currentScore;
    document.getElementById(`score--${currentPlayerNumber}`).textContent =
      totalScore[currentPlayerNumber];

    // check if score is greater than equal to 100 for player to win
    if (totalScore[currentPlayerNumber] >= 10) {
      gameWon = true;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayerNumber}`)
        .classList.add('player--winner');
    } else {
      switchPlayers();
    }
  }
});

resetButton.addEventListener('click', function () {
  dice.classList.add('hidden');
  document
    .querySelector(`.player--${currentPlayerNumber}`)
    .classList.remove('player--winner');
  if (currentPlayerNumber === 1) {
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
  }

  playerZeroCurrentScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerZeroTotalScore.textContent = 0;
  playerOneTotalScore.textContent = 0;
  gameWon = false;
  currentScore = 0;
  totalScore = [0, 0];
  currentPlayerNumber = 0;
});
