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

function checkGuess() {
    if (userGuessArray.indexOf(userInput) === -1 && mysteryWord.innerText.indexOf(userInput) === -1) {
        if (secretWord.includes(userInput)){
            mysteryWord.append(userInput);
            console.log(mysteryWord);
        } else {
            userGuessArray.push(userInput);
            userGuesses.innerText = userGuessArray;
        }
    } else {
        console.log("YOU ALREADY PICKED THAT LETTER")
    }
}

function updateScore() {
    remainingGuesses.innerText = "Guesses Left: " + guessesLeft;
    if (guessesLeft === 0) {
        remainingGuesses.innerText = "Game Over!"
    }
}



// function checkLetter() {
//     // if the user input matches a letter in the secret word
//     if (secretWord.includes(userInput)) {
//         //add the users input to the mystery word area
//         mysteryWord.append(userInput);
//     } else {
//         userGuessArray.push(userInput);
//         userGuesses.innerText = userGuessArray;
//         guessesLeft--;
//         updateScore();
//     }
// }

pickSecretWord();
guessesLeft = secretWord.length;
updateScore();

document.onkeyup = function (event) {
    userInput = event.key.toUpperCase();
    // checks if a letter is picked
    if (alphabet.includes(userInput)) {
        //if the guessesLeft are above 0 this code will run
        if (guessesLeft > 0) {
            checkGuess();
            // checkLetter();
            // checkDuplicate();
        } else { }
    } else {
        console.log(userInput + " IS A WRONG INPUT!")
    }
}
