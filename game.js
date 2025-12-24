var buttons = ["red", "blue", "green", "yellow"];
var gameSequence = [];
var playerSequence = [];
var started = false;
var level = 0;
var acceptInput = false;
var highScore = localStorage.getItem("highScore") || 0;
$("#score").text("High-Score : " + highScore);

$(document).keypress(function (event) {
  if (!started) {
    started = true;
    level = 0;
    gameSequence = [];
    nextButton();
  }
});

function nextButton() {
  playerSequence = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * buttons.length);
  var colorGenerated = buttons[randomNumber];
  gameSequence.push(colorGenerated);

  // flashButton(colorGenerated);
  // playSound(colorGenerated);

  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(function () {
    flashButton(gameSequence[i]);
    playSound(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
      acceptInput = true;
    }
  }, 800);
}

function flashButton(color) {
  $("." + color).addClass("pressed");
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  if (!started || !acceptInput) return;

  var clickedColor = this.classList[1];
  playerSequence.push(clickedColor);

  flashButton(clickedColor);
  playSound(clickedColor);

  checkClicks(playerSequence.length - 1);
});

function checkClicks(index) {
  if (playerSequence[index] === gameSequence[index]) {
    if (playerSequence.length === gameSequence.length) {
      setTimeout(nextButton, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  if (level > highScore) {
    highScore = level - 1;
    localStorage.setItem("highScore", highScore);
    $("#score").text("High Score: " + highScore);
  }

  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press any key to restart");
  started = false;
  gameSequence = [];
}
