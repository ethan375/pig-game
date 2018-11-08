/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.getElementById('score-0').textContent = '0'
document.getElementById('score-1').textContent = '0'
document.getElementById('current-0').textContent = '0'
document.getElementById('current-1').textContent = '0'


document.querySelector('.dice').style.display = 'none';


document.querySelector('.btn-roll').addEventListener('click', ()=>{
	// We need a random number
	const dice = Math.floor(Math.random()*6)+1;
	console.log(dice)
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
		document.getElementById('current-' + activePlayer).textContent = '0';
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
	}
})

document.querySelector('.btn-hold').addEventListener('click', ()=>{
	//add round score to scores array
	if (activePlayer == 0) {
		debugger;
		scores[activePlayer] += roundScore;
	} else {
		scores[activePlayer] += roundScore;
	}

	let playerScore = document.getElementById('score-' + activePlayer);
	playerScore.innerHTML = scores[activePlayer];

	document.getElementById('current-' + activePlayer).textContent = '0'
	activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
})
