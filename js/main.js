// "use strict";

var  $canvas = $('.canvas'),
       fas = ['superpowers', 'superpowers', 'bicycle', 'bicycle', 'coffee', 'coffee', 's15', 's15', 'btc', 'btc','heart','heart','gamepad','gamepad','creative-commons','creative-commons'],
       cardMatch = [],
       attempts = 0;
       deck = fas.length,
       $controls = $('.controls')
       matched = 0;
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
}

// this function create a grid
function makeGrid(num) {
	// let's clean the canvas on every submit
	$canvas.empty();

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
	match();
}; 

function match() {
	// let's flip the card on the click of the card
	$canvas.find('.card').on('click', function(){
		// find the card that is open and toggle it with
		// the flip class
		$(this).addClass('opened').toggleClass('flip');
		// grab the html of the card that is opend
		card = $(this).context.innerHTML;
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
			// let queue up the cardMatche array to catch the cards flipped
			// and compare them
			cardMatch = [];
			// endGame();
		};
		attempts++;
		console.log(attempts);
		$('.attempts').html(attempts);
	})
};

// I hope it's not a cheat to use this
$controls.find('.restart').on('click', function(){
	swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, Restart Game!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      makeGrid(deck);
    }
  })
})

function endGame() {

	let fullDeck = fas.length / 2;

	if (fullDeck === matched) {
		swal({
	    allowEscapeKey: false,
	    allowOutsideClick: false,
	    title: 'Are you sure?',
	    text: "Your progress will be Lost!",
	    type: 'warning',
	    showCancelButton: true,
	    confirmButtonColor: '#02ccba',
	    cancelButtonColor: '#f95c3c',
	    confirmButtonText: 'Yes, Restart Game!'
	  }).then(function(isConfirm) {
	    if (isConfirm) {
	      makeGrid(deck);
	    }
	  })
	} else {
		console.log('no, we need more. We only have ' + matched + ' And we need ' + fullDeck);
	}
}
// match();
makeGrid(deck);


