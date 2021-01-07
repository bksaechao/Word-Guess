var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var secretWordArray = ["BLEACH", "NARUTO", "SUNSHINE", "NOBLESSE", "GENSHIN IMPACT"]
var userGuessArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
var secretWord

let guessesLeft = 0

function pickSecretWord() {
    var randomWord = secretWordArray[Math.floor(Math.random() * secretWordArray.length)]
    secretWord = randomWord
    console.log(secretWord);
}

function recordGuess() {
    userGuessArray.push(userInput);
    userGuesses.innerText = userGuessArray;
}

function updateScore() {
    remainingGuesses.innerText = guessesLeft;
    if (guessesLeft === 0) {
        gameOver();
    }
}

function gameOver() {
    remainingGuesses.innerText = "Game Over!"
}

function checkLetter() {
    // if the user input matches a letter in the secret word
    if (secretWord.includes(userInput)) {
        //add the users input to the mystery word area
        mysteryWord.append(userInput);
    } else {
        userGuessArray.push(userInput);
        userGuesses.innerText = userGuessArray;
        guessesLeft--;
        updateScore();
    }
}

pickSecretWord();
guessesLeft = secretWord.length;
updateScore();

document.onkeyup = function (event) {
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        //if the guessesLeft are above 0 this code will run
        if (guessesLeft > 0) {
            checkLetter();
        } else { }
    } else {
        console.log(userInput + " IS A WRONG INPUT!")
    }
}
