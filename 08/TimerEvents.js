'use strict';


let btnStart = document.querySelector('.timer_btn-start');
let btnStop = document.querySelector('.timer_btn-stop');
let btnPause = document.querySelector('.timer_btn-pause');
let placeTime = document.querySelector('.timer_place-time');

let time = 60;
/*global Timer*/
let timer = new Timer(time);


/**
 * change button's visibility
 */
function changeVisibleButtons() {
	document.querySelectorAll('.timer_place-btn').forEach((item) => {
		item.classList.toggle('timer_place__open');
		item.classList.toggle('timer_place__closed');
	});
}

/**
 * show timer's finish
 */
function showResult() {
	placeTime.innerHTML = timer.getTime('Осталось:');

	if (timer.isFinish()) {
		placeTime.innerHTML = 'СТОП! Еще раз?';
		changeVisibleButtons();
		timer.setTime(time);
	}
}

/**
 * block of Event listeners
 */
(function TimerListeners() {
	btnStart.addEventListener('click', function () {
		timer.start(showResult)();
	});

	btnPause.addEventListener('click', function() {
		timer.stop();
		placeTime.innerHTML = 'Пауза';
	});

	btnStop.addEventListener('click', function() {
		timer.stop();
		timer.setTime(time);
		placeTime.innerHTML = 'Таймер остановлен';
	});

	document.querySelectorAll('.timer_btn').forEach((item) => {
		item.addEventListener('click', changeVisibleButtons);
	});
})();

