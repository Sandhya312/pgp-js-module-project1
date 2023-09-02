
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText1 = document.querySelector(".results__text1");
const resultText2 = document.querySelector(".results__text2");

const playAgainBtn = document.querySelector(".play-again");
const rePlayBtn = document.querySelector(".re-play");

const scoreNumber1 = document.querySelector(".score1");
const scoreNumber2 = document.querySelector(".score2");

const nextBtn = document.querySelector(".next-btn");

let score1;
let score2 ;
console.log(scoreNumber1.innerHTML,'score1',scoreNumber2.innerHTML,'score2');
//Local Storage
if(localStorage.getItem('score1')){
  score1= JSON.parse(localStorage.getItem('score1'));
  scoreNumber1.innerText = JSON.parse(localStorage.getItem('score1'));
}else{
  score1=0;
  localStorage.setItem('score1',0);
}

if(localStorage.getItem('score2')){
  score2= JSON.parse(localStorage.getItem('score2'));
  scoreNumber2.innerText = JSON.parse(localStorage.getItem('score2'));
}else{
  score2=0;
  localStorage.setItem('score2',0);
}


choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);

  });
});

function choose(choice) {
  console.log(scoreNumber1.innerHTML,'score1',scoreNumber2.innerHTML,'score2');

  const pcchoice = pcChoose();
  displayResults([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}

function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText1.innerText = "YOU WIN";
      resultText2.innerText = "AGAINST PC";
      resultDivs[0].classList.toggle("winner");
      keepScore1(1); 
      nextBtn.style.opacity="1";
      playAgainBtn.style.opacity="1";
      rePlayBtn.style.opacity="0";
    } else if (pcWins) {
      resultText1.innerText = "YOU LOST";
      resultText2.innerText = "AGAINST PC";
      resultDivs[1].classList.toggle("winner");
      keepScore2(1);
      playAgainBtn.style.opacity="1";
      rePlayBtn.style.opacity="0";
    } else {
      resultText1.innerText = "TIE UP";
      resultText2.innerText = "";
      playAgainBtn.style.opacity="0";
      rePlayBtn.style.opacity="1";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore1(point1) {
  score2 += point1;
  localStorage.setItem('score2',JSON.stringify(score2));
  scoreNumber2.innerText = JSON.parse(localStorage.getItem('score2'));
}

function keepScore2(point2) {
  score1 += point2;
  localStorage.setItem('score1',JSON.stringify(score1));
  scoreNumber1.innerText =JSON.parse(localStorage.getItem('score1'));
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  nextBtn.style.opacity="0";

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText1.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});