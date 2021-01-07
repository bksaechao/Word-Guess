var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var randomWord = "JUNGLE";
var userGuessArray = [];

function recordGuess() {
    userGuessArray.push(userInput);
    userGuesses.innerText = userGuessArray;
}

function addCorrectLetter() {
    for (let i = 0; i < randomWord.length; i++) {
        if (userInput === randomWord[i]) {
            mysteryWord.append(userInput);
        } else { }
    }
}

document.onkeyup = function (event) {
    userInput = event.key.toUpperCase();
    addCorrectLetter();
    recordGuess();
}

// if randomWord.includes(userInput)
