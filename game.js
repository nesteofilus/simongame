var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function (event) {
  if (!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  // buat cek per index kalo misalnya user pencetnya bener ga, contoh index ke 0 game patternnya itu red.
  // nah dicek juga user index ke 0 nya red juga ga. kalo iya baru masuk ke dalem if

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    // buat cek kalo misalnya gamenya udah 4 button, nah user udah pencet 4 kali ato belom.

    if (userClickedPattern.length == gamePattern.length) {
      // kalo udah masuk sini berarti level clear, lanjut ke level selanjutnya
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }

  function startOver() {
    gamePattern = [];
    started = false;
    level = 0;

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}
