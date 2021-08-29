var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(event) {
  if (!started) {
      started = true;
      nextcolor();
      showGamePattern();
    $("#level-title").text("Level " + level);
  console.log(gamePattern);
  }
});

$(".btn").click(function(event) {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(gameLevel) {
  if (gamePattern[gameLevel] === userClickedPattern[gameLevel]) {
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function (event) {
      nextcolor();
    }, 1000);
  }
} else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function(event) {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
  }
}

function nextcolor() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function animatePress(nextcolor) {
  $("#" + nextcolor).addClass("pressed");
  setTimeout(function(event) {
    $("#" + nextcolor).removeClass("pressed");
  },100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
