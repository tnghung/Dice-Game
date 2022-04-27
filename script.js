'use strict';
var scores, roundScore, activePlayer;

var btnNew = document.querySelector('.btn--new');
var btnHold = document.querySelector('.btn--hold');
var btnRoll = document.querySelector('.btn--roll');
var diceDOM = document.querySelector('.dice');

init();

// Click on Button Roll
document.querySelector('.btn--roll').addEventListener('click', function () {
  // 1. Random number dice
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  diceDOM.style.display = 'block';
  diceDOM.src = `imgs/dice-${dice}.png`;

  // 3. Check and update the score if the dice is NOT 1
  roundScore += dice;
  document.querySelector('#score--' + activePlayer).textContent =
    scores[activePlayer] + roundScore;
  btnHold.style.display = 'block';

  // 4. Keep the score and change the player
  if (dice === 1) {
    alert(`Player ${activePlayer + 1} rolls the number 1!`);
    diceDOM.style.display = 'none';
    document.querySelector('#current--' + activePlayer).textContent =
      scores[activePlayer];
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];
    nextPlayer();
    return;
  }

  // 5. Check the points and show the winner
  if (document.querySelector('#score--' + activePlayer).textContent >= 100) {
    document.getElementById('name--' + activePlayer).textContent = 'WINNER';
    btnNew.style.display = 'block';
    btnRoll.style.display = 'none';
    btnHold.style.display = 'none';
    document
      .querySelector('.player--' + activePlayer)
      .classList.add('player--winner');
  }
});

// Keep score if the player click hold button
document.querySelector('.btn--hold').addEventListener('click', function () {
  scores[activePlayer] += roundScore;
  document.querySelector('#current--' + activePlayer).textContent =
    scores[activePlayer];
  nextPlayer();
});

// Restart a new game
btnNew.addEventListener('click', init);

// Init game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  btnNew.style.display = 'none';
  btnHold.style.display = 'none';
  diceDOM.style.display = 'none';
  btnRoll.style.display = 'block';

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
}

function nextPlayer() {
  roundScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  btnHold.style.display = 'none';
}
