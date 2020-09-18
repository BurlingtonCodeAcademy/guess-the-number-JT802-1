const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
} //boilerplate code included here to see if the reversed program choice runs independently like the forward choice does.

humanGame();

async function humanGame() {

    console.log("Let's play a game where I (computer) make up a number, and you (human) try to guess it.");

    let min = 1;
    let max = 100;
    let guessHuman = (Math.floor(Math.random() * (max - min + 1)) + min); //Same random number generator as before.

    let humanQuestion = await ask("Is my secret number: " + guessHuman + "?" + "\n(Y)es or (N)o: "); { //Why does a typed response of "y" or "n" (lowercase-y or -n) make the game quit? (see lines 37-38) Getting lowercase-y or -n back is the only instance where this occurs.

        console.log(humanQuestion);
        while (humanQuestion === "N") {
            let higherLower = await ask("Is the number (H)igher or (L)ower: ");
            if (higherLower === "H") {
                min = guessHuman;
                guessHuman = (Math.floor(Math.random() * (max - min + 1)) + min)
                humanQuestion = await ask("Is the secret number: " + guessHuman + "?" + "\n(Y)es or (N)o: ");
            } else if (higherLower === "L") {
                max = guessHuman;
                guessHuman = (Math.floor(Math.random() * (max - min + 1)) + min);
                humanQuestion = await ask("Is the secret number: " + guessHuman + "?" + "\n(Y)es or (N)o: ");
            } else {
                higherLower = await ask("Is the number (H)igher or (L)ower: ");
                console.log("Tsk. Tsk. No cheating!")
            } //Not sure the else (anti-cheat) is ever hit, even though I think its scope is correct.
        }
        console.log("Awesome. Computers rule! Thanks for playing!")
        process.exit();
    }
}