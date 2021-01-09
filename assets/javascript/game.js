var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var btn = document.getElementById('btn');
var userWins = document.getElementById("wins");
var userLoss = document.getElementById("loss");
var secretWordArray = ["BLEACH", "NARUTO", "SUNSHINE", "NOBLESSE", "GENSHIN IMPACT", "APPLE WORD"]
var userGuessArray = [];
var correctGuessArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
var secretWord

let guessesLeft = 0
let wins = 0
let loss = 0

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

function checkWin() {
    if (mysteryWord.innerText.includes("_")) { }
    else {
        newWord();
        wins++
        userWins.innerText = "Wins: " + wins;
        audio = document.getElementById("audio")
        audio.play();
    }
}

function checkLoss() {
    if (guessesLeft === 0) {
        newWord();
        loss++
        userLoss.innerText = "Loss: " + loss;
    }
}

function newWord() {
    userGuessArray = [];
    correctGuessArray = [];
    userGuesses.innerText = "";
    pickSecretWord();
    guessesLeft = secretWord.length;
    updateRemainingGuesses();
    handleSecretWord();
}

function updateRemainingGuesses() {
    guessesLeft--;
    remainingGuesses.innerText = "Guesses Left: " + guessesLeft;
}

function gameStart() {
    remainingGuesses.innerText = "Guesses Left: " + guessesLeft;
    userWins.innerText = "Wins: " + wins;
    userLoss.innerText = "Loss: " + loss;
    btn.style.display = "block";
}

function resetScore() {
    btn.onclick = function () {
        wins = 0
        loss = 0
        userWins.innerText = "Wins: " + wins;
        userLoss.innerText = "Loss: " + loss;
        newWord();
    }
}
resetScore();
pickSecretWord();
handleSecretWord();
guessesLeft = secretWord.length;

document.onkeyup = function (event) {

    gameStart();
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        if (userGuessArray.indexOf(userInput) === -1 && secretWord.indexOf(userInput) === -1 && guessesLeft >= 1) {
            pushIncorrectGuess();
            handleGuess();
            updateRemainingGuesses();
            checkLoss();
        }
        else if (correctGuessArray.indexOf(userInput) === -1 && secretWord.indexOf(userInput) > -1) {
            pushCorrectGuess();
            handleSecretWord();
            checkWin();
        } else {
            setTimeout(function () {
                console.log("YOU ALREADY TRIED THAT")
            })
        }
    } else {
        console.log(userInput + " IS AN INVALID INPUT!")
    }
}
