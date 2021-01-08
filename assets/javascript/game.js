var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var secretWordArray = ["BLEACH", "NARUTO", "SUNSHINE", "NOBLESSE", "GENSHIN IMPACT", "APPLE WORD"]
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

function handleSecretWord() {
    hiddenWord = secretWord.split('').map(
        function (letter) {
            if (correctGuessArray.indexOf(letter) > -1) {
                return letter
            } else if (letter === " ") {
                return '\xa0'
            } else {
                return " _ "
            }
        }).join('');
    mysteryWord.innerText = hiddenWord;
    guessesLeft = secretWord.length;
}

function handleGuess() {
    guesses = userGuessArray.map(
        function (letter) {
            return letter
        }
    ).join(' ');
    userGuesses.innerText = guesses;
}

function pushCorrectGuess() {
    correctGuessArray.push(userInput);
}

function pushIncorrectGuess() {
    userGuessArray.push(userInput);
}


function updateScore() {
    remainingGuesses.innerText = "Guesses Left: " + guessesLeft;
    if (guessesLeft === 0) {
        remainingGuesses.innerText = "Game Over!"
    }
}



pickSecretWord();
handleSecretWord();
updateScore();


document.onkeyup = function (event) {
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        if (userGuessArray.indexOf(userInput) === -1 && secretWord.indexOf(userInput) === -1) {
            pushIncorrectGuess();
            handleGuess();
            guessesLeft--;
            updateScore();
        }
        else if (correctGuessArray.indexOf(userInput) === -1 && secretWord.indexOf(userInput) > -1) {
            pushCorrectGuess();
            handleSecretWord();
        } else {
            console.log("YOU ALREADY TRIED THAT")
        }
    } else {
        console.log(userInput + " IS AN INVALID INPUT!")
    }
}
