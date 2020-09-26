//For "Guess the number" project: I want this function to allow user to choose between running the compGame (computer guesses) OR humanGame (human guesses).


initialize();
compGame();
humanGame();

async function initialize() {
    let userChoice = await ask("Would you like to play a game where the computer (A) guesses the number, or the human (B) does? ")
    if (userChoice === "A") {
        compGame();
    } else if (userChoice === "B") {
        humanGame();
    } else {
        console.log("Silly human! Please try again.")
        initialize();
    }
};