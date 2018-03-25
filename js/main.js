"use strict";

// game variables
var $canvas = $('.canvas'),
    $attemptsContainer = $('.attempts-box'),
    $restart = $('.restart'),
    fas = ['superpowers', 'superpowers', 'bicycle', 'bicycle', 'coffee', 'coffee', 's15', 's15', 'btc', 'btc','heart','heart','gamepad','gamepad','creative-commons','creative-commons'],
    cardMatch = [],
    attempts = 0,
    deck = fas.length,
    $controls = $('.controls'),
    matched = 0,
    fullDeck = fas.length / 2,
    flip = 0,
    firstStar = '',
    starCount = 1,
    endGameMessage = '';
// Timer variables
var pastTimes = [];
// Timer variables
var interval,
		time = 0,
    hundredsCount = 0,
		tensCount = 0,
		secondsCount = 0;
// Timer flags
var wasPaused = true,
		display = $('#display'),
    hundreds = $('#hundreds'),
		tens = $('#tens'),
		seconds = $('#seconds');
//hide the canvas on start
$canvas.hide();
$attemptsContainer.hide();
$restart.hide();
// reset the game
$controls.find('.restart').on('click', restartGame);
// shuffle the cards
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
// this function create a grid
function makeGameBoard(num) {
	// let's clean the canvas on every submit
	$canvas.empty();
  // show the canvas and other bits
  $canvas.fadeIn(function(){
    $(this).show();
  });
  $attemptsContainer.fadeIn(function(){
    $(this).show();
  })
  $restart.fadeIn(function(){
    $(this).show();
  })

	// let's clear out attemps and matches
	attempts = 0;
	matched = 0;

	// set attempts to 0 in the DOM
	$('.attempts').text(0);

	// shuffle the cards
	shuffle(fas);

	// build the grid of cards for play
	for (let i = 0; i < num ; i++) {
		$canvas.append('<li class="card"><i class="fa fa-' + fas[i] + '"></i></li>');
	}
  // reset stars
  

	gamePlay();
}; 
// this is what happens when we end the game
function endGame() {

	if (fullDeck === matched) {

    startCallback();
    // count stars
    countStars();

    let littleDigit = '';

    if (secondsCount < 9) {

      littleDigit = 0;

    } else {

      littleDigit = '';
    }

		swal({
	    allowEscapeKey: false,
	    allowOutsideClick: false,
	    title: `Nice Job!`,
	    footer: "Give it another go!",
      text: `You did it in ${hundredsCount}:${littleDigit}${secondsCount}:${tensCount} with only ${attempts} attempts and with ${starCount} stars. ${endGameMessage}`,
	    type: 'success',
	    showCancelButton: true,
	    confirmButtonColor: '#02ccba',
	    cancelButtonColor: '#f95c3c',
	    confirmButtonText: 'Let\'s do it!'
	  }).then((result) => {
	    if (result.value) {
        // reset the board
	      makeGameBoard(deck);
        // clear the timer
        resetCallback();
        // reset the stars
        resetStars();
        // star the timer
        startCallback();
	    } else if (result.dismiss === swal.DismissReason.cancel) {
        $canvas
        .empty()
        .append('<h2 class="thanks">Thanks for playing Recall.');
        $restart.fadeOut(function(){
          $(this).hide();
        })
      }
	  })
	} 
};
// start the game
function initGame() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you ready to play?',
    text: "C'mon, you got this!",
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, start Game!'
  }).then((result) => {
    if (result.value) {
      //build the game
      makeGameBoard(deck);
      // start the time if it's not already going.
      startCallback();
    };
  });
};
// we're gong to run the game with this code
function gamePlay() {
	// let's flip the card on the click of the card
	$canvas.find('.card').on('click', function(){
		// find the card that is open and toggle it with
		// the flip class
		$(this).addClass('opened').toggleClass('flip');

		// grab the html of the card that is opend
		let card = $(this).context.innerHTML;
		// push the card content into the the cardMatch array
		cardMatch.push(card);
		// lets test and see if the cards are alike
		if( cardMatch.length > 1) {

			if(card === cardMatch[0]) {
				// find the opened card and add a matched class
				// to a card that has a match
				$canvas
				.find('.flip')
				.addClass('matched');
				
				//confirm we're cooking with gas for debugging
				console.log('match');

				// iterate over the matches
				matched++;

				// use this function to remove a class of notMatched
				// if the card was previously lonely and without a mate
				setTimeout(function(){
					$canvas
					.find('.flip')
					.removeClass('notMatched')
				})
			} else {
				// or here we add the notMatched class so everyone can know how 
				// alone and pathetic this card really is
				$canvas
				.find('.flip')
				.addClass('notMatched')

				// confirm we're working
				console.log('try again');

				// here we're going to flip the card back around nice a quick like 
				// so as to make the game a tid bit harder
				setTimeout(function(){
					$canvas
					.find('.flip')
					.removeClass('flip');
				}, 300)
			}
			// let queue up the cardMatch array to catch the cards flipped
			// and compare them
			cardMatch = [];
			// endGame();
		};
	  // iterate the flips
    flip++;
    // add to attempts after 2 flips
    if (flip % 2) {
      // count the attempts
      attempts++;
      // update the board of attempts
      $('.attempts').html(attempts);
      // star taking away stars
      // ** I think there is a more elegant way to do this, but...
      if (attempts >= '20') {
        starRemover('1');
      } 
      if (attempts >= '25') {
        starRemover('2');
      }
      if (attempts >= '30') {
        starRemover('3');
      }
    };

		if(fullDeck === matched) {
			endGame();
		}
	})
	// take out the start btn
	$('.start').fadeOut(function(){
		$(this).hide();
	});
};
// let's take away some stars after attempts
function starRemover(starNum) {
  // loop through stars
  $('.star').each(function() {
  // set star var
  let star = $(this);
  // take out stars by removing class
    if (star.attr('data-star') == starNum) {
      star.removeClass('active');
    };
  });
};
// make the stars great again
function resetStars() {
  $('.star').each(function(){
    $(this).addClass('active');
  });
};
// make a timer
function startCallback(){
  /**
   * When the stopwatch starts, the wasPaused flag is set to false, 
   * time increases. The next time the startButton is clicked, time 
   * pauses, the wasPaused flag is set to true
   */
  if (wasPaused) {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
    wasPaused = false;
  } else {
    clearInterval(interval);
    wasPaused = true;
  }
};
// reset timer function
function resetCallback(){
  clearInterval(interval);
  wasPaused = true;
  tensCount = 0;
  secondsCount = 0;
  hundredsCount = 0;
  tens.html("00");
  seconds.html("00");
  hundreds.html("00")
};
// our timer code
function startTimer() {

  tensCount++;
  if (tensCount < 10) {
    tens.html('0' + tensCount);
  }
  if (tensCount > 9) {
    tens.html(tensCount);
  }
  if (tensCount > 99) {
    secondsCount++;
    seconds.html('0' + secondsCount);
    tensCount = 0;
    tens.html('0' + 0);
  }
  if (secondsCount > 9) {
    seconds.html(secondsCount);
  }
  if (secondsCount > 59) {
    hundredsCount++;
    hundreds.html('0' + hundredsCount);
    secondsCount = 0;
    seconds.html('0' + 0);
  }
  if (hundredsCount > 9) {
    hundredsCount.html(hundredsCount)
  }
};
// restart the whole thing, man
function restartGame() {
  // show the alert popup
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: 'warning',
    footer: 'Better hurry, your timer is running...',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, Restart Game!',
    onClose: console.log('foo')
  }).then((result) => {
    if (result.value) {
      //build the game
      makeGameBoard(deck);
      // reset the game first
      resetCallback();
      // restart the timer
      startCallback();      
    };
  });
};
// get a star count
function countStars() {
  starCount = $('.star.active').length

  // ending message
    switch (starCount) {
      case 0:
        endGameMessage = 'Dude, try again. Really. Like now.';
        break;
      case 1:
        endGameMessage = 'Really. I know you can do better';
        break;
      case 2:
        endGameMessage = 'I think you have more in you.';
        break;
      case 3:
        endGameMessage = 'Not too shabby.';
        break;
    } 
};
// let's get started
initGame()

