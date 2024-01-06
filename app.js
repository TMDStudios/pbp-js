// Main
const numbersGame = document.getElementById("startNumbersGame");
const calculator = document.getElementById("startCalculator");
const guessThePhrase = document.getElementById("startGuessThePhrase");
const usernameAndPassword = document.getElementById("startUsernameAndPassword");

numbersGame.addEventListener('click', () => {
    alert("Starting Numbers Game");
});
calculator.addEventListener('click', () => {
    alert("Starting Calculator");
});
guessThePhrase.addEventListener('click', () => {
    alert("Starting Guess the Phrase");
});
usernameAndPassword.addEventListener('click', () => {
    alert("Starting Username and Password");
});
