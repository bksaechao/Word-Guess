var wordGuess = {

    allSecretWords: [
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
    ],

    alphabet: "abcdefghijklmnopqrstuvwxyz".toUpperCase(),
    userGuessArray: [],
    correctGuessArray: [],
    letterGuessed: null,
    secretWord: null,
    audio: null,
    guessesLeft: 0,
    wins: 0,
    loss: 0,

    setupGame: function () {
        this.pickSecretWord();
        this.displaySecretWord();
        this.handleGuessesLogic();
        this.audio = new Audio(this.secretWord.song);
    },

    pickSecretWord: function () {
        var randomWord = this.allSecretWords[Math.floor(Math.random() * this.allSecretWords.length)]
        this.secretWord = randomWord
        console.log("Secret Word: " + this.secretWord.word);
    },

    displaySecretWord: function () {
        var hiddenWord = this.secretWord.word.split('').map(
            function (letter) {
                if (letter === " ") {
                    return "\xa0"
                } else {
                    return " _ ";
                }
            }).join("");
        document.getElementById("mystery-word").innerText = hiddenWord;
    },

    handleGuessesLogic: function () {
        if (this.secretWord.word.length > 10) {
            this.guessesLeft = 8;
        } else {
            this.guessesLeft = this.secretWord.word.length - 1;
        }
    },

    displayGame: function () {
        document.getElementById("remaining-guesses").innerText = "Guesses Left: " + this.guessesLeft;
        document.getElementById("wins").innerText = "Wins: " + this.wins;
        document.getElementById("loss").innerText = "Loss: " + this.loss;
        document.getElementById('btn').style.display = "block";
    },

    checkLetter: function (letter) {
        this.handleCorrectGuess(letter);
        this.handleIncorrectGuess(letter);
    },

    handleCorrectGuess: function (letter) {
        if (this.correctGuessArray.indexOf(letter) === -1 && this.secretWord.word.indexOf(letter) > -1) {
            this.correctGuessArray.push(letter);
            this.handleSecretWord();
            this.checkWin();
        } else if(this.correctGuessArray.indexOf(letter) > -1) {
            this.handleAlreadyGuessed();
            this.backToGuesses();
        }
    },

    handleIncorrectGuess: function (letter) {
        if (this.userGuessArray.indexOf(letter) === -1 && this.secretWord.word.indexOf(letter) === -1 && this.guessesLeft >= 1) {
            this.userGuessArray.push(letter);
            this.updateGuesses();
            this.guessesLeft--;
            document.getElementById("remaining-guesses").innerText = "Guesses Left: " + this.guessesLeft;
            this.checkLoss();
        } else if(this.userGuessArray.indexOf(letter) > -1) {
            this.handleAlreadyGuessed();
            this.backToGuesses();
        }
    },

    newWord: function () {
        this.userGuessArray = [];
        this.correctGuessArray = [];
        document.getElementById("user-guesses").innerText = "";
        this.pickSecretWord();
        this.handleGuessesLogic();
        document.getElementById("remaining-guesses").innerText = "Guesses Left: " + this.guessesLeft;
        this.displaySecretWord();
    },

    handleSecretWord: function () {
        var hiddenWord = this.secretWord.word.split('').map(
            function (letter) {
                if (wordGuess.correctGuessArray.indexOf(letter) > -1) {
                    return letter
                } else if (letter === " ") {
                    return '\xa0'
                } else {
                    return " _ "
                }
            }).join('');
        document.getElementById("mystery-word").innerText = hiddenWord;
    },

    updateGuesses: function () {
        var guesses = this.userGuessArray.map(
            function (letter) {
                return letter
            }
        ).join(' ');
        document.getElementById("user-guesses").innerText = guesses;
    },

    checkWin: function () {
        if (document.getElementById("mystery-word").innerText.includes("_")) { }
        else {
            this.updateImg();
            this.getNewSong();
            this.newWord();
            this.wins++
            document.getElementById("wins").innerText = "Wins: " + this.wins;
        }
    },

    checkLoss: function () {
        if (this.guessesLeft === 0) {
            this.audio.pause()
            this.newWord();
            this.loseReset();
            this.loss++
            document.getElementById("loss").innerText = "Loss: " + this.loss;
        }
    },

    getNewSong: function () {
        this.audio.pause();
        this.audio = new Audio(this.secretWord.song)
        this.audio.play();
    },

    updateImg: function () {
        document.getElementById("secret-img-name").innerText = this.secretWord.word;
        document.getElementById("secret-image").src = this.secretWord.image
        document.getElementById("secret-image").style.display = "block";
    },

    loseReset: function () {
        this.audio.pause();
        document.getElementById("secret-img-name").innerText = "Word Guess";
        document.getElementById("secret-image").style.display = "none";
    },

    resetScore: function () {
        document.getElementById('btn').onclick = function () {
            this.wins = 0
            this.loss = 0
            document.getElementById("wins").innerText = "Wins: " + this.wins;
            document.getElementById("loss").innerText = "Loss: " + this.loss;
            document.getElementById("secret-image").style.display = "none";
            document.getElementById("secret-img-name").innerText = "Word Guess";
            wordGuess.audio.pause();
            wordGuess.newWord();
            document.getElementById("remaining-guesses").innerText = "Tap any key to start!";
        }
    },

    handleWrongInput: function () {
        setTimeout(function () {
            document.getElementById("user-guesses").innerText = "INVALID INPUT!"
            document.getElementById("user-guesses").style.color = "pink"; 
            document.getElementById("user-guesses").style.opacity = "0.8"; 
        });
    },

    handleAlreadyGuessed: function () {
        setTimeout(function () {
            document.getElementById("user-guesses").innerText = "YOU ALREADY TRIED THAT"
            document.getElementById("user-guesses").style.color = "pink";
            document.getElementById("user-guesses").style.opacity = "0.8"; 
        });
    },

    backToGuesses: function () {
        setTimeout(function () {
            document.getElementById("user-guesses").style.color = "darkred";
            wordGuess.updateGuesses();
        }, 500)
    }
}

wordGuess.setupGame();
wordGuess.resetScore();

document.onkeyup = function (event) {
    wordGuess.displayGame();
    userInput = event.key.toUpperCase();
    if (wordGuess.alphabet.includes(userInput)) {
        wordGuess.letterGuessed = userInput
        wordGuess.checkLetter(wordGuess.letterGuessed);
    } else {
        wordGuess.handleWrongInput();
        wordGuess.backToGuesses();
    }
}

