var modal = document.getElementById("myModal");
var btn = document.getElementById("start-btn");
var span = document.getElementsByClassName("close")[0];
var catForm = document.getElementById("cat-form");
var chooseForm = document.getElementById("choose-form");
var word;
var puzzle = [];
var mistakes = 0;
var letter = false;
var maxGuess = 9;
var categories = [
  ["Frozen", "Legally Blonde", "Rocky", "Cinderella", "Picth Perfect", "The Blind Side", "Clueless"],
  ["Apple", "Cake", "Strawberry cake", "Baked ziti", "pasta", "spaghetti"],
  ["Javascript", "Python", "Java", "SQL", "scratch", "HTML"],
  ["Taylor Swift", "Shawn Mendes", "Ariana Grande", "Bruno Mars", "Dua Lipa", "Kelsea Ballerini"],
  ["Fearless", "Speak Now", "Red", "Reputation", "Lover"],
  ["If at first you don't succeed try try again", "Paint the town red", "Beat around the bush", "A chain is only as strong as its weakest leak", "The pot calling the kettle black", "Sticks and stones may break my bones but names will never hurt me"]
];

function setInputWord() {
  var inputWord = document.getElementById("inputWord").value;
  setWord(inputWord);
  modal.style.display = "none";
  restartGame();
}

function checkCategoryPicked() {
  var category = document.getElementById("categories").value;
  console.log("Category is " + category);
  if (category === "movies") {
    randomPicker(0);
  }
  if (category === "food") {
    randomPicker(1);
  }
  if (category === "coding-languages") {
    randomPicker(2);
  }
  if (category === "singers") {
    randomPicker(3);
  }
  if (category === "TS-albums") {
    randomPicker(4);
  }
  if (category === "quotes") {
    randomPicker(5);
  }
  modal.style.display = "none";
  document.getElementById("catIs").innerHTML = "Category is: " + category;
  restartGame();
}


function randomPicker(num) {
  var randWord = categories[num][Math.floor(Math.random() * categories.length)];
  console.log(randWord);
  setWord(randWord);
}


//function submitCatForm(){
//    document.getElementById('cat-form').submit();
//}


function generateCatForm() {
  chooseForm.style.display = "none";
  catForm.style.display = "block";
}

function generateChooseForm() {
  catForm.style.display = "none";
  chooseForm.style.display = "block";
}

function startGamebtn() {
  resetGame();
  modal.style.display = "block";
}

function disableStartbtn() {
  document.getElementById("start-btn").disabled = true;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function addOnLoad() {
  generateButtons();
  setupCanvas();
}

function updateLivesLabel() {
  var lives = document.getElementById("gameStatus");
  var remainingLives = maxGuess - mistakes;
  lives.innerHTML = "You have " + remainingLives + " lives remaining";

}

function setWord(selectedWord) {
  word = selectedWord.toLowerCase();
  console.log(word);
  var convertedWord = word.replace(/\w/g, "_");
  convertedWord = convertedWord.replace(/\s/g, " ");
  console.log(convertedWord);
  puzzle = convertedWord.split('');
  console.log(puzzle.join(" "));
  updatePuzzle();

}

function checkGuess(guess) {
  document.getElementById(guess).setAttribute('disabled', true);
  console.log(guess);
  for (let i = 0; i < word.length; i++) {
    if (guess == word[i]) {
      puzzle[i] = guess;
      letter = true;
    }
  }
  updatePuzzle();
  updateMistakes();
  checkGameOver();
  checkWin();
  if (letter == true) {
    letter = false;
  }
  console.log("this is the puzzle variable ");
  console.log(puzzle);
}

function updatePuzzle() {
  document.getElementById("puzzle").innerHTML = puzzle.join(" ");
}

function generateButtons() {
  let alphabetButtons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `<button class = "btn btn-alpha" id = '` + letter + `' onClick = "checkGuess('` + letter + `')">` + letter + `</button>`).join('');
  document.getElementById("alphabet").innerHTML = alphabetButtons;
  console.log(alphabetButtons);

}


function updateMistakes() {
  if (letter == false) {
    mistakes += 1;
    drawArray[mistakes - 1]();
    updateLivesLabel();
    console.log(mistakes);
  }
}

function disableLetterButtons() {
  var numItems = document.getElementsByClassName("btn-alpha").length;
  for (let i = 0; i < numItems; i++) {
    document.getElementsByClassName("btn-alpha")[i].setAttribute('disabled', true);
  }
}

function enableLetterButtons() {
  var numItems = document.getElementsByClassName("btn-alpha").length;
  for (let i = 0; i < numItems; i++) {
    document.getElementsByClassName("btn-alpha")[i].removeAttribute('disabled');
  }
}

function checkGameOver() {
  if (mistakes == maxGuess) {
    document.getElementById("gameStatus").innerHTML = "Game over!";
    disableLetterButtons();
  }
}

function checkWin() {
  if (puzzle.join("") == word) {
    document.getElementById("gameStatus").innerHTML = "You won!";
    disableLetterButtons();
  }
}

function resetGame() {
  mistakes = 0;
  document.getElementById("puzzle").innerHTML = "";
  word = "";
  puzzle = [];
  clearCanvas();
  disableLetterButtons();
  document.getElementById("gameStatus").innerHTML = "Click on Start Game button to begin a new game";
  document.getElementById("catIs").innerHTML = "";
}

function restartGame() {
  enableLetterButtons();
  setupCanvas();
  updateLivesLabel();
}

function clearCanvas() {
  var stickFigure = document.getElementById("stickFigure");
  var canvasContext = stickFigure.getContext("2d");
  canvasContext.clearRect(0, 0, 500, 300);
}

function setupCanvas() {
  var stickFigure = document.getElementById("stickFigure");
  var canvasContext = stickFigure.getContext("2d");
  //post
  canvasContext.beginPath();
  canvasContext.arc(130, 40, 30, 1 * Math.PI, 1.8 * Math.PI)
  canvasContext.moveTo(100, 30);
  canvasContext.lineTo(100, 130);
  canvasContext.moveTo(50, 130);
  canvasContext.lineTo(150, 130);
  canvasContext.stroke();
}

function draw(x1, y1, x2, y2) {
  var stickFigure = document.getElementById("stickFigure");
  var canvasContext = stickFigure.getContext("2d");
  canvasContext.moveTo(x1, y1);
  canvasContext.lineTo(x2, y2);
  canvasContext.stroke();
}

function head() {
  var stickFigure = document.getElementById("stickFigure");
  var canvasContext = stickFigure.getContext("2d");
  canvasContext.beginPath();
  canvasContext.arc(150, 43, 22, 0, 2 * Math.PI);
  canvasContext.stroke();
}

function body() {
  draw(150, 64, 150, 100);
}

function rightLeg() {
  draw(150, 100, 160, 125);
}

function leftLeg() {
  draw(150, 100, 140, 125);
}

function rightArm() {
  draw(150, 82, 170, 70);
}

function leftArm() {
  draw(150, 82, 130, 70);
}


function rightEye() {
  draw(153, 30, 163, 40);
  draw(163, 30, 153, 40);
}

function leftEye() {
  draw(136, 30, 146, 40);
  draw(146, 30, 136, 40);
}

function mouth() {
  var stickFigure = document.getElementById("stickFigure");
  var canvasContext = stickFigure.getContext("2d");
  canvasContext.beginPath();
  canvasContext.arc(150, 55, 10, 1 * Math.PI, 0 * Math.PI)
  canvasContext.stroke();
}

drawArray = [head, body, rightArm, leftArm, rightLeg, leftLeg, rightEye, leftEye, mouth];