'use strict';
var scores, roundScore, activePlayer;

var btnNew = document.querySelector('.btn--new');
var btnHold = document.querySelector('.btn--hold');
var btnRoll = document.querySelector('.btn--roll');
var diceDOM = document.querySelector('.dice');

var overlay = document.querySelector('.overlay');
var popup = document.querySelector('.popup');
var popUpBtn = document.querySelector('.popup__btn');
var popUpDesc = document.querySelector('.popup__desc');
var bgImage = document.querySelector('.bg-image');

init();

// Click on Button Roll
document.querySelector('.btn--roll').addEventListener('click', rollDice);

// Keep score if the player click hold button
document.querySelector('.btn--hold').addEventListener('click', holdScore);

// Restart a new game
btnNew.addEventListener('click', init);

document.addEventListener('keydown', function (e) {
  if (e.key === 'h' && btnHold.classList.contains('show')) {
    holdScore();
  }
  switch (e.key) {
    case 'Enter':
    case 'h':
      if (
        btnHold.classList.contains('show') &&
        popup.classList.contains('hide')
      )
        holdScore();
      break;
    case ' ':
    case 'r':
      if (
        btnRoll.classList.contains('show') &&
        popup.classList.contains('hide')
      )
        rollDice();
      break;

    case 'Escape':
    case 'e':
      if (popup.classList.contains('show')) closePopUP();
      break;

    case 'n':
      if (btnNew.classList.contains('show')) init();
      break;
  }
});

// Init game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  hideElement(btnHold);
  hideElement(diceDOM);
  hideElement(btnNew);

  showElement(btnRoll);

  // popUpDOM.style.display = 'none';
  closePopUP();

  document.getElementById('name--0').textContent = `Player 1`;
  document.getElementById('name--1').textContent = `Player 2`;
  document.getElementById('score--0').textContent = `0`;
  document.getElementById('score--1').textContent = `0`;
  document.getElementById('current--0').textContent = `0`;
  document.getElementById('current--1').textContent = `0`;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  bgImage.style.backgroundImage = `url('../imgs/bg_0.jpg')`;
}

function nextPlayer() {
  hideElement(btnHold);
  roundScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

// Click to exit the popup
// popUpBtn.addEventListener('click', closePopUP);
overlay.addEventListener('click', closePopUP);

function closePopUP() {
  hideElement(popup);
  hideElement(overlay);
}

function openPopUP() {
  showElement(popup);
  showElement(overlay);
}

function rollDice() {
  // 1. Random number dice
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  showElement(diceDOM);
  diceDOM.src = `imgs/dice-${dice}.png`;

  // 3. Check and update the score if the dice is NOT 1
  roundScore += dice;
  document.querySelector('#score--' + activePlayer).textContent =
    scores[activePlayer] + roundScore;
  showElement(btnHold);

  // 4. Keep the score and change the player
  if (dice === 1) {
    openPopUP();
    popUpDesc.textContent = `Player ${activePlayer + 1} gets the dice 1!`;
    hideElement(diceDOM);
    document.querySelector('#current--' + activePlayer).textContent =
      scores[activePlayer];
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];
    nextPlayer();
    popUpBtn.textContent = `TIME FOR PLAYER ${activePlayer + 1}`;
    bgImage.style.backgroundImage = `url('../imgs/bg_${activePlayer}.jpg')`;
    return;
  }

  // 5. Check the points and show the winner
  if (document.querySelector('#score--' + activePlayer).textContent >= 100) {
    document.getElementById('name--' + activePlayer).textContent = 'WINNER';
    showElement(btnNew);
    hideElement(btnRoll);
    hideElement(btnHold);
    document
      .querySelector('.player--' + activePlayer)
      .classList.add('player--winner');
  }
}

function holdScore() {
  scores[activePlayer] += roundScore;
  document.querySelector('#current--' + activePlayer).textContent =
    scores[activePlayer];
  nextPlayer();
  bgImage.style.backgroundImage = `url('../imgs/bg_${activePlayer}.jpg')`;
}

function showElement(ele) {
  ele.classList.add('show');
  ele.classList.remove('hide');
}

function hideElement(ele) {
  ele.classList.add('hide');
  ele.classList.remove('show');
}
