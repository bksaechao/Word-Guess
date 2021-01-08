var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var secretWordArray = ["BLEACH", "NARUTO", "SUNSHINE", "NOBLESSE", "GENSHIN IMPACT"]
var userGuessArray = [];
var correctGuessArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
var secretWord

let guessesLeft = 0

function pickSecretWord() {
    var randomWord = secretWordArray[Math.floor(Math.random() * secretWordArray.length)]
    secretWord = randomWord
    console.log(secretWord);
}

function updateScore() {
    guessesLeft = secretWord.length;
    remainingGuesses.innerText = "Guesses Left: " + guessesLeft;
    if (guessesLeft === 0) {
        remainingGuesses.innerText = "Game Over!"
    }
}

function renderSecretWord() {
    hiddenWord = secretWord.split('').map(
        function (letter) {
            if (correctGuessArray.indexOf(letter) > -1) {
                return letter
        } else {
            return " _ "
        }
    }).join('');

    mysteryWord.innerText = hiddenWord;
}

function updateSecretWord() {
    for (let i = 0; i < secretWord.length; i++) {
        if (userInput !== secretWord[i]) {

        }
        
    }
}


pickSecretWord();
renderSecretWord();
updateScore();

document.onkeyup = function (event) {
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        if (userGuessArray.indexOf(userInput) === -1 && secretWord.indexOf(userInput) === -1) {
            userGuessArray.push(userInput);
            userGuesses.innerText = userGuessArray;
            guessesLeft--;
            updateScore();
        }
        else if (correctGuessArray.indexOf(userInput) === -1 && secretWord.indexOf(userInput) > -1) {
            correctGuessArray.push(userInput);
            renderSecretWord();
        } else {
            console.log("YOU ALREADY TRIED THAT")
        }
    } else {
        console.log(userInput + " IS AN INVALID INPUT!")
    }
}
