//=======VARIABLE & CONSTANT DECLARATIONS==========
let playerScore = 0;
let computerScore = 0;
let clickLog = 0;
let playerSelection;
let computerSelection;
let roundResult;
const buttons = document.querySelectorAll('button');
const container = document.querySelector('#container');
const result = document.createElement('div');
result.setAttribute('id', 'result');
const score = document.createElement('div');
score.setAttribute('id', 'score');
const endGame = document.createElement('h1');
endGame.setAttribute('id', 'endGame'); //so we can look up element to remove if it exists from a previous game


//========FUNCTION DECLARATIONS============
const computerPlay = () => {  
    let choices=["rock","paper","scissors"];
    return choices[Math.floor(Math.random() * choices.length)]
};

//========MAIN GAME LOGICS============
const playRound = (playerSelection, computerSelection) => {
    //=====YOU PLAY ROCK==========
    if (playerSelection.toLowerCase() === 'rock') {
        if (computerSelection === 'rock'){
            return('Tie!');
        } else if (computerSelection === 'paper'){
            return('You Lose! Paper covers Rock!');
        } else if (computerSelection === 'scissors'){
            return('You Win! Rock crushes Scissors!');
        }
    //=====YOU PLAY PAPER==========
    } else if (playerSelection.toLowerCase() === 'paper') {
        if (computerSelection === 'rock'){
            return('You Win! Paper covers Rock!');
        } else if (computerSelection === 'paper'){
            return('Tie!');
        } else if (computerSelection === 'scissors'){
            return('You Lose! Scissors cuts Paper!');
        }
    //=====YOU PLAY SCISSORS==========   
    } else if (playerSelection.toLowerCase() === 'scissors') {
        if (computerSelection === 'rock'){
            return('You Lose! Rock crushes Scissors!');
        } else if (computerSelection === 'paper'){
            return('You Win! Scissors cuts Paper!');
        } else if (computerSelection === 'scissors'){
            return('Tie!');
        } 
    }
}

const endOfGame = (playerScore, computerScore) => {
    if (playerScore > computerScore) {
        endGame.textContent = ('You finished off the computer! Great play!')
    } else if (playerScore < computerScore) {
        endGame.textContent = ('You got beaten by the computer! Shame on you!')
    } else {
        endGame.textContent = ('Draw game! Maybe next round shows a winner!')
    }
    container.appendChild(endGame);
}

//=========EVENT LISTENER=========================
buttons.forEach((button) => {
    button.addEventListener('click', () => {
    playerSelection = (button.id);
    computerSelection = computerPlay();
    roundResult = playRound(playerSelection, computerSelection);
    if (document.getElementById("endGame")) { //resets game if not the first in session
        container.removeChild(endGame);
        container.removeChild(result);
        playerScore = 0;
        computerScore = 0;
    }
    result.textContent = roundResult;
    container.appendChild(result);
    if (roundResult.slice(0,5) === 'You W' ) {
        playerScore += 1;
    } else if (roundResult.slice(0,5) === 'You L' ) {
        computerScore += 1;
    } else {
        playerScore += 1;
        computerScore += 1;
    }
    score.textContent = ('current score: \nPlayer: ' + playerScore + '\nComputer: ' + computerScore);
    container.appendChild(score);
    clickLog += 1;
    if (clickLog >= 5) {
        endOfGame(playerScore, computerScore);
        clickLog = 0;
    }
    });
});       