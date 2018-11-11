 /*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Challenges:
1: A player looses their entire score if they roll 6 twice in a row 
2: add an input field so players can change the winning score 
3: add another die to the game. player will loose round score if either of them are a 1

*/
let scores, roundScore, activePlayer, gameState, winningScore, previousRoll, currentRoll;



init()
function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gameState = true;

	winningScore = prompt("What would you like to set the winning score to? Please enter a number");

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('name-0').innerHTML = 'Player 1';
	document.getElementById('name-1').innerHTML = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer(){
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	document.getElementById('current-' + activePlayer).textContent = '0'
	activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


document.querySelector('.btn-roll').addEventListener('click', ()=>{
	if (gameState) {
		// We need a random number
		const dice = Math.floor(Math.random()*6)+1;
		// display the result
		let die = document.querySelector('.dice');
		die.style.display = 'block';
		die.src = 'dice-' + dice + '.png';

		//We need to keep track of the current dice roll and the previous 
		previousRoll = currentRoll;
		currentRoll = dice;
		if (previousRoll == 6 && currentRoll == 6) {
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
			nextPlayer();
		}

		// update the ruond score IF the rolled number was not 1
		if (dice !== 1) {
			// Add the score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore; 
		} else {
			nextPlayer()
		}
	}
})

document.querySelector('.btn-hold').addEventListener('click', ()=>{
	if (gameState) {
		//add round score to scores array
		scores[activePlayer] += roundScore;

		//update the player score on the ui
		let playerScore = document.getElementById('score-' + activePlayer);
		playerScore.innerHTML = scores[activePlayer];

		//check if player won the game else change player
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).innerHTML = 'WINNER!'
			gameState = false;
		} else {
			nextPlayer();
		}
	}
})
