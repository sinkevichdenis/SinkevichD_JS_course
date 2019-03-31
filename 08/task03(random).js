'use strict';

let randomBtn = document.querySelector('#random_btn');
let randomTimePlace = document.querySelector('#random_time');
let numSecRand = 20;
let randomTimer = new Timer(numSecRand);
let randomTimerFinish = new Timer(numSecRand);

/**
 * periodic function for timer
 */
function startRandom() {
	let num = Math.ceil(Math.random()*100);
	errorFunc(num);
}

/**
 * stop periodic function and renew interface
 */
function stopRandom() {
	changeVisBtnRandom();
	randomTimer.setTime(numSecRand);
	randomTimePlace.innerHTML = 'СТОП';
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
		randomTimer.start( startRandom, { element: randomTimePlace, msg: 'До конца работы осталось' })();
		randomTimerFinish.start( stopRandom, { element: randomTimePlace, msg: '' }, 'done')();
	});
})();
