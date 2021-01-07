var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var userGuessArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
var randomWord = "JUNGLE";

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

    if (alphabet.includes(userInput)) {
        if (guessesLeft > 0) {
            addCorrectLetter();
            recordGuess();
            updateScore();
        } else {
            gameOver();
        }
    } else {
        console.log("WRONG INPUT!")
    }
}
