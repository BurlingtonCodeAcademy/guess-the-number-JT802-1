const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

initialize(); //this allows a player to set a min and max

async function initialize() {
  console.log("\n") //There are quite a few console.log("\n") written throughout. I know it seems verbose, but it is just my attempt to prettify terminal output.
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



async function compGame() {
  console.log("\n");
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
  console.log("\n");

  let userMin = await ask("What number do you want for the minimum? ")
  console.log("\n");
  while (isNaN(parseInt(userMin))) {
    userMin = await ask("Please enter numbers only. ")
  }
  let userMax = await ask("What number do you want for the maximum? ")
  console.log("\n");
  while (isNaN(parseInt(userMax))) {
    userMax = await ask("Please enter numbers only. ")
  }
  let min = parseInt(userMin);
  let max = parseInt(userMax);
  let guessComp = (Math.floor(Math.random() * (max - min + 1)) + min); //Random number generator (able to ask user to set min and max)

  let compQuestion = await ask("Is your secret number: " + guessComp + "?" + "\n(Y)es or (N)o: "); //revised logic to be more specific

  while (compQuestion === "N" || compQuestion === "n") { //fixed argument here due to mixing up !== and === conditionals
    console.log("\n")
    let higherLower = await ask("Is the number (H)igher or (L)ower: ");
    if (higherLower === "H" || higherLower === "h") {
      console.log("\n")
      min = guessComp;
      guessComp = (Math.floor(Math.random() * (max - min + 1)) + min)
      compQuestion = await ask("Is your secret number: " + guessComp + "?" + "\n(Y)es or (N)o: ");
    } else if (higherLower === "L" || higherLower === "l") {
      console.log("\n")
      max = guessComp;
      guessComp = (Math.floor(Math.random() * (max - min + 1)) + min);
      compQuestion = await ask("Is your secret number: " + guessComp + "?" + "\n(Y)es or (N)o: ");
    } else {
      console.log("Tsk. Tsk. No cheating!")
    }
  }
  console.log('\n');
  console.log("Awesome. Humans are cool! So are bow-ties and fezzes. Thanks for playing!")
  console.log("\n")
  process.exit();
}


async function humanGame() {
  console.log("\n")
  console.log("Let's play a game where I (computer) make up a number, and you (human) try to guess it.");
  console.log("\n")

  let min = 1;
  let max = 100;
  let guessHuman = (Math.floor(Math.random() * (max - min + 1)) + min); //same number generator used previously

  let humanQuestion = await ask("What do you think my secret number is? ");

  while (isNaN(parseInt(humanQuestion))) {
    humanQuestion = await ask("Please enter numbers only. ")
  }

  while (parseInt(humanQuestion) !== guessHuman) { //this forces input to be a numeral
    console.log("\n")
    if (humanQuestion > guessHuman) {
      humanQuestion = await ask("Your guess is too high. Please try again. ")
    } else if (humanQuestion < guessHuman) {
      humanQuestion = await ask("Your guess is too low. Please try again. ")
    }
  }
  console.log("\n")
  console.log("Awesome. Computers rule! Thanks for playing!")
  console.log("\n")
  process.exit();

}