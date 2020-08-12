/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer, dicesDOM, isGamePlaying, preDice0, preDice1, winningScore;
//init(); //call init
//NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);


//addEventListener(event type, func)
//ROLL btn
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (isGamePlaying) {
		var dice0, dice1;

		dicesDOM[2].src = 'dice-' + preDice0 + '.png';
		dicesDOM[3].src = 'dice-' + preDice1 + '.png';
		document.querySelector('.player-previous-score').style.display = "block"; //display previous score box

		//roll random number when btn was clicked
		dice0 = Math.floor(Math.random() * 6) + 1;
		dice1 = Math.floor(Math.random() * 6) + 1;

		dicesDOM[0].style.display = "block"; //display the dice after click btn
		dicesDOM[1].style.display = "block";
		dicesDOM[0].src = 'dice-' + dice0 + '.png'; //change dice image as dice num
		dicesDOM[1].src = 'dice-' + dice1 + '.png';

		//two 6 on a row, the player will lose his entries score and turn next player
		if (preDice0 === 6 && dice0 === 6 || preDice0 === 6 && dice1 === 6 || preDice1 === 6 && dice0 === 6 || preDice1 === 6 && dice1 === 6) {
			document.querySelector('#score-' + activePlayer).textContent = "0";
			nextPlayer();

		} else if (dice0 === 1 || dice1 === 1) { //if one of dices = 1, the player will lose a round score

			//store predices
			preDice0 = dice0 + dice1;
			roundScore = 0;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {

			//store predices
			preDice0 = dice0;
			preDice1 = dice1;
			//add to round score
			roundScore += dice0 + dice1;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
	}
});

//HOLD btn
document.querySelector('.btn-hold').addEventListener('click', function () {
	if (isGamePlaying) {
		//add to active player score
		score[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

		//in condition, the player's score > 100, he/she wins => game stop until click new game
		if (score[activePlayer] < winningScore) {
			nextPlayer();
		} else {
			// condition true
			document.querySelector('#name-' + activePlayer).textContent = 'Winner'; //change player name to WINNER title
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //change css style of WINNER
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); //remove active status
			dicesDOM[0].style.display = "none"; //hide the dice
			dicesDOM[1].style.display = "none";
			isGamePlaying = false;
		}
	}
});

//change to next player
function nextPlayer() {
	//reset score
	preDice0 = 1;
	preDice1 = 1;
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore;
	//dicesDOM[0].style.display = "none"; //hide the dice after hold
	//dicesDOM[1].style.display = "none"; //hide the dice after hold

	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

//initial setting all players' scores = 0
function init() {
	isGamePlaying = false;
	activePlayer = 0;
	roundScore = 0
	score = [0, 0];
	preDice0 = 1;
	preDice1 = 1;
	dicesDOM = document.querySelectorAll('.dice'); //avoid DRY principle
	dicesDOM[0].style.display = "none";
	dicesDOM[1].style.display = "none";
	document.querySelector('.player-previous-score').style.display = "none";
	//dicesDOM[3].style.display = "none";

	document.getElementById('score-0').textContent = "0";
	document.getElementById('score-1').textContent = "0";
	document.getElementById('current-0').textContent = "0";
	document.getElementById('current-1').textContent = "0";
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('active'); //if not remove, active class will be duplicated
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active'); //set back active to player 1

	//add setting winning score
	document.querySelector('.input-container').style.display = "block";
}

function scoreBtn() {
	winningScore = document.querySelector('.winning-score').value;
	console.log(winningScore);
	if (!isNaN(winningScore) && winningScore !== '') {
		document.querySelector('.input-container').style.display = "none";
		isGamePlaying = true; //call state to identify game status || if game playing is true, btn will work. and if fail then not.

	} else {
		alert("Please enter number!!!");
	}
}
/* Challenge
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100
3. Add another dice to the game, so that there are 2 dices now. The player looses his current score when one of them is 1.
*/
/* My Challenge
1. Add How to play
2. Add Rules
3. Add show previous dices for each player
*/
