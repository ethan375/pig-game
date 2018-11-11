 /*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameState;

gameState = true;

init()
function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;

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
	let modal = document.querySelector('.modal');
	let close = document.querySelector('.close');
	if (gameState == false) {
		modal.style.display = block;
	}
	// We need a random number
	const dice = Math.floor(Math.random()*6)+1;
	// display the result
	let die = document.querySelector('.dice');
	die.style.display = 'block';
	die.src = 'dice-' + dice + '.png';
	// update the ruond score IF the rolled number was not 1
	if (dice !== 1) {
		// Add the score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore; 
	} else {
		nextPlayer()
	}
})

document.querySelector('.btn-hold').addEventListener('click', ()=>{
	//add round score to scores array
	scores[activePlayer] += roundScore;

	//update the player score on the ui
	let playerScore = document.getElementById('score-' + activePlayer);
	playerScore.innerHTML = scores[activePlayer];

	//check if player won the game else change player
	if (scores[activePlayer] >= 10) {
		document.querySelector('#name-' + activePlayer).innerHTML = 'WINNER!'
		gameState = false;
	} else {
		nextPlayer();
	}
})
