var gamePattern = [];

var buttonColours = ['red', 'blue', 'green', 'yellow'];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function (event) {
	if (!started) {
		nextSequence();
		started = true;
	}
});

$('.btn').on('click', function () {
	var userChosenColour = $(this).attr('id');
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];

	var randomNumber = Math.floor(Math.random() * 4);

	var randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	var chosenButton = $('#' + randomChosenColour);
	$(chosenButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);

	$('#level-title').text('Level ' + level);

	level++;
}

function playSound(name) {
	var audio = new Audio('./sounds/' + name + '.mp3');
	audio.play();
}

function animatePress(currentColour) {
	$('.btn#' + currentColour).addClass('pressed');

	setTimeout(function () {
		$('.btn#' + currentColour).removeClass('pressed');
	});
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
		console.log('success');

		if (userClickedPattern.length == gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 500);
		}
	} else {
		playSound('wrong');

		$('body').addClass('game-over');
		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 200);

		$('#level-title').text('Game Over, Press Any Key to Restart');

		startOver();
		console.log('wrong');
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
