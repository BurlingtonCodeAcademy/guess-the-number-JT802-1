const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

initialize();

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

compGame();

async function compGame() {

  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");

  let min = 1;
  let max = 100;
  let guessComp = (Math.floor(Math.random() * (max - min + 1)) + min); //Random number generator for range 1-100 (Too limiting?)

  let compQuestion = await ask("Is your secret number: " + guessComp + "?" + "\n(Y)es or (N)o: "); { //Why does a typed response of "y" or "n" (lowercase-y or -n) make the game quit? (see lines 52-53) Getting lowercase-y or -n back seems to be the only instance where this occurs.

    console.log(compQuestion);
    while (compQuestion === "N") {
      let higherLower = await ask("Is the number (H)igher or (L)ower: ");
      if (higherLower === "H") {
        min = guessComp;
        guessComp = (Math.floor(Math.random() * (max - min + 1)) + min)
        compQuestion = await ask("Is your secret number: " + guessComp + "?" + "\n(Y)es or (N)o: ");
      } else if (higherLower === "L") {
        max = guessComp;
        guessComp = (Math.floor(Math.random() * (max - min + 1)) + min);
        compQuestion = await ask("Is your secret number: " + guessComp + "?" + "\n(Y)es or (N)o: ");
      } else {
        higherLower = await ask("Is the number (H)igher or (L)ower: ");
        console.log("Tsk. Tsk. No cheating!")
      } //Not sure the else (anti-cheat) is ever hit, even though I think its scope is correct.
    } 
    console.log("Awesome. Humans are cool! So are bow-ties and fezzes. Thanks for playing!")
    process.exit();
  }
}

humanGame();

async function humanGame() {

  console.log("Let's play a game where I (computer) make up a number, and you (human) try to guess it.");

  let min = 1;
  let max = 100;
  let guessHuman = (Math.floor(Math.random() * (max - min + 1)) + min); //Same random number generator as before.

  let humanQuestion = await ask("Is my secret number: " + guessHuman + "?" + "\n(Y)es or (N)o: "); { //Why does a typed response of "y" or "n" (lowercase-y or -n) make the game quit? (see lines 85-86) Getting lowercase-y or -n back seems to be the only instance where this occurs.

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