var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var randomWord = "JUNGLE";
var userGuessArray = [];
var remainingGuesses = document.getElementById("remaining-guesses");

let guessesLeft = randomWord.length;


remainingGuesses.innerText = guessesLeft;

function recordGuess() {
    userGuessArray.push(userInput);
    userGuesses.innerText = userGuessArray;
}

function updateScore() {
    remainingGuesses.innerText = guessesLeft;
}

function gameOver() {
    remainingGuesses.innerText = "Game Over!"
}

function addCorrectLetter() {
    for (let i = 0; i < randomWord.length; i++) {
        if (userInput === randomWord[i]) {
            mysteryWord.append(userInput);
        }
    }
}

document.onkeyup = function (event) {
    userInput = event.key.toUpperCase();
    guessesLeft--;
    if (guessesLeft > 0) {
        addCorrectLetter();
        recordGuess();
        updateScore();
    } else {
        gameOver();
    }
}
