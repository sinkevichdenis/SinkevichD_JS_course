'use strict';

let randomBtn = document.querySelector('#random_btn');
let randomTimePlace = document.querySelector('#random_time');
let numSecRand = 20;
let randomTimer = new Timer(numSecRand);

/**
 * periodic function for timer
 */
function startRandom() {
	let num = Math.ceil(Math.random()*100);
	randomTimePlace.innerHTML = randomTimer.getTime('До конца работы осталось');

	if (+randomTimer.getTime() === 0) {
		changeVisBtnRandom();
		randomTimer.setTime(numSecRand);
		randomTimePlace.innerHTML = 'СТОП';
	}
	errorFunc(num);
}

/**
 * testing function with error
 * @param num
 */
function errorFunc(num) {
	try {
		if (num % 2) {
			console.log(`Success! Odd number (${num})`);
		} else {
			throw new Error(`This is even number (${num})`);
		}
	} catch(e) {
		console.log(e.message + e.stack);
	}
}

/**
 * change control buttons's visibility
 */
function changeVisBtnRandom() {
	randomBtn.classList.toggle('random_btn__open');
	randomBtn.classList.toggle('random_btn__closed');
}
/**
 * block of Event listeners
 */
(function MeasureListeners() {
	randomBtn.addEventListener('click', function() {
		changeVisBtnRandom();
		randomTimer.start(startRandom)();
	});
})();
