'use strict';


let btnStart = document.querySelector('.timer_btn-start');
let btnStop = document.querySelector('.timer_btn-stop');
let btnPause = document.querySelector('.timer_btn-pause');
let placeTitleTime = document.querySelector('.timer_place-time');
let placeDisplayTime = document.querySelector('#timer_time');

/*global Timer*/
let timer = new Timer(5);


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
	placeTitleTime.innerHTML = 'СТОП! Еще раз?';
	placeDisplayTime.innerHTML = '';
	changeVisibleButtons();
	timer.setTime();
}

/**
 * block of Event listeners
 */
(function TimerListeners() {
	btnStart.addEventListener('click', function () {
		placeTitleTime.innerHTML = 'Таймер';
		timer.start( showResult, { element: placeDisplayTime, msg: 'Осталось:' }, 'done')();
	});

	btnPause.addEventListener('click', function() {
		timer.stop();
		placeTitleTime.innerHTML = 'Пауза';
	});

	btnStop.addEventListener('click', function() {
		timer.stop();
		timer.setTime();
		placeTitleTime.innerHTML = 'Таймер остановлен';
		placeDisplayTime.innerHTML = '';
	});

	document.querySelectorAll('.timer_btn').forEach((item) => {
		item.addEventListener('click', changeVisibleButtons);
	});
})();

