var mysteryWord = document.getElementById("mystery-word");
var userGuesses = document.getElementById("user-guesses");
var remainingGuesses = document.getElementById("remaining-guesses");
var audioSrc = document.getElementById("audio-source");
var btn = document.getElementById('btn');
var userWins = document.getElementById("wins");
var userLoss = document.getElementById("loss");
var image = document.getElementById("secret-image");
var imgName = document.getElementById("secret-img-name");
var userGuessArray = [];
var correctGuessArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
var secretWord
var audio

let guessesLeft = 0
let wins = 0
let loss = 0

var secretWordObjArr = [
    {
        word: "BLEACH",
        song: "assets/audio/bleach.mp3",
        image: "assets/images/bleach.jpeg"
    },
    {
        word: "NARUTO",
        song: "assets/audio/shikamaru.mp3",
        image: "assets/images/naruto.jpg"
    },
    {
        word: "SUNSHINE",
        song: "assets/audio/sunshine.mp3",
        image: "assets/images/mimikyu.png"
    },
    {
        word: "NOBLESSE",
        song: "assets/audio/noblesse.mp3",
        image: "assets/images/noblesse.jpg"
    },
    {
        word: "GENSHIN IMPACT",
        song: "assets/audio/genshinImpact.mp3",
        image: "assets/images/genshinImpact.jpg"
    },
    {
        word: "BLACK CLOVER",
        song: "assets/audio/blackClover.mp3",
        image: "assets/images/blackClover.jpg"
    }
]

function pickSecretWord() {
    var randomWord = secretWordObjArr[Math.floor(Math.random() * secretWordObjArr.length)]
    secretWord = randomWord
    console.log(secretWord);
}

function handleSecretWord() {
    hiddenWord = secretWord.word.split('').map(
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
        updateImg();
        getNewSong();
        newWord();
        wins++
        userWins.innerText = "Wins: " + wins;
    }
}

function getNewSong() {
    audio.pause();
    audio = new Audio(secretWord.song)
    audio.play();
}

function updateImg() {
    imgName.innerText = secretWord.word;
    image.src = secretWord.image
    image.style.display = "block";
}

function getSong() {
    audio = new Audio(secretWord.song);
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
    guessesLeft = secretWord.word.length;
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
        image.style.display = "none";
        imgName.innerText = "";
        audio.pause();
        newWord();
        remainingGuesses.innerText = "Tap any key to start!";
    }
}
resetScore();
pickSecretWord();
getSong();
handleSecretWord();
guessesLeft = secretWord.word.length;

document.onkeyup = function (event) {
    gameStart();
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        if (userGuessArray.indexOf(userInput) === -1 && secretWord.word.indexOf(userInput) === -1 && guessesLeft >= 1) {
            pushIncorrectGuess();
            handleGuess();
            updateRemainingGuesses();
            checkLoss();
        }
        else if (correctGuessArray.indexOf(userInput) === -1 && secretWord.word.indexOf(userInput) > -1) {
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

