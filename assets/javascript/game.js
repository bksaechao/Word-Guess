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
    console.log("Secret Word: " + secretWord.word);
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

function loseReset() {
    audio.pause();
    imgName.innerText = "Word Guess";
    image.style.display = "none";
}

function checkLoss() {
    if (guessesLeft === 0) {
        audio.pause()
        newWord();
        loseReset();
        loss++
        userLoss.innerText = "Loss: " + loss;
    }
}

function newWord() {
    userGuessArray = [];
    correctGuessArray = [];
    userGuesses.innerText = "";
    pickSecretWord();
    handleGuessesLogic();
    updateRemainingGuesses();
    handleSecretWord();
}

function handleGuessesLogic() {
    if (secretWord.word.length > 10) {
        guessesLeft = 8;
    } else {
        guessesLeft = secretWord.word.length - 1;
    }
}

function updateRemainingGuesses() {
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
        imgName.innerText = "Word Guess";
        audio.pause();
        newWord();
        remainingGuesses.innerText = "Tap any key to start!";
    }
}

function handleWrongInput() {
    setTimeout(function() {
        userGuesses.innerText = "INVALID INPUT!"
        userGuesses.style.color = "purple";
        userGuesses.style.opacity = .5;  
    });
}

function handleAlreadyGuessed() {
    setTimeout(function() {
        userGuesses.innerText = "YOU ALREADY TRIED THAT"
        userGuesses.style.color = "purple";
        userGuesses.style.opacity = .5;  
    });
}

function backToGuesses() {
    setTimeout(function() {
        userGuesses.style.color = "darkred";
        userGuesses.style.opacity = 1;
        handleGuess();   
    }, 2000)
}



resetScore();
pickSecretWord();
getSong();
handleSecretWord();
handleGuessesLogic();

document.onkeyup = function (event) {
    gameStart();
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        if (userGuessArray.indexOf(userInput) === -1 && secretWord.word.indexOf(userInput) === -1 && guessesLeft >= 1) {
            pushIncorrectGuess();
            handleGuess();
            guessesLeft--;
            updateRemainingGuesses();
            checkLoss();
        }
        else if (correctGuessArray.indexOf(userInput) === -1 && secretWord.word.indexOf(userInput) > -1) {
            pushCorrectGuess();
            handleSecretWord();
            checkWin();
        } else {
            handleAlreadyGuessed();
            backToGuesses();
        }
    } else {
        handleWrongInput();
        backToGuesses();
    }
}

