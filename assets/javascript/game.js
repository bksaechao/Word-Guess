var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var secretWordArray = ["BLEACH", "NARUTO", "SUNSHINE", "NOBLESSE", "GENSHIN IMPACT"]
var userGuessArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
var secretWord 

let guessesLeft = 0

function pickWord() {
    var randomWord = secretWordArray[Math.floor(Math.random()*secretWordArray.length)]
    secretWord = randomWord
    console.log(secretWord);
}

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
    for (let i = 0; i < secretWord.length; i++) {
        if (userInput === secretWord[i]) {
            mysteryWord.append(userInput);
        }
    }
}

document.onkeyup = function (event) {
    pickWord();
    guessesLeft = secretWord.length;
    remainingGuesses.innerText = guessesLeft;
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
        console.log(userInput + " IS A WRONG INPUT!")
    }
}
