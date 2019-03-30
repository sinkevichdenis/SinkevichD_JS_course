'use strict';

let btnMeasureStart = document.querySelector('.measure_btn-start');
let btnMeasureStop = document.querySelector('.measure_btn-stop');
let placeMsg = document.querySelector('.measure_msg');
let userInput = document.querySelector('#count');
let btnMeasureResult = document.querySelector('.measure_btn-result');
let placeResult = document.querySelector('.measure_place-result');
let placeDisplayTime2 = document.querySelector('#measure_time');

let msgStart = 'Для начала работы тонометра нажмите СТАРТ.';

let numSecInit = 5;
let initTimer = new Timer(numSecInit);
let numSecMain = 15;
let mainTimer = new Timer(numSecMain);

/**
 * all process of timer's working
 */
function doMeasure() {
	mainTimer.start(finishTimerCount, { element: placeDisplayTime2, msg: 'Измерение:' }, 'done')();
}

/**
 * do when timer stop to count
 */
function finishTimerCount() {
	stopMeasure();
	changeVisButtons();
	changeVisResult();
	placeMsg.innerHTML = 'Измерение закончено. Повторить?';
}

/**
 * stop timer and renew timer's options
 */
function stopMeasure() {
	initTimer.stop();
	initTimer.setTime(numSecInit);
	mainTimer.stop();
	mainTimer.setTime(numSecMain);
}

/**
 * change result place's visibility
 */
function changeVisResult() {
	placeResult.classList.toggle('measure_place__open');
	placeResult.classList.toggle('measure_place__closed');
}

/**
 * change control buttons's visibility
 */
function changeVisButtons(){
	document.querySelectorAll('.measure_place-btn').forEach((item) => {
		item.classList.toggle('measure_place__open');
		item.classList.toggle('measure_place__closed');
	});
}

/**
 * block of Event listeners
 */
(function MeasureListeners() {
	btnMeasureStart.addEventListener('click', function () {
		placeMsg.innerHTML = '';
		initTimer.start( doMeasure, { element: placeDisplayTime2, msg: 'До начала отсчета осталось:' }, 'done')();
	});

	btnMeasureStop.addEventListener('click', function () {
		stopMeasure();
		placeMsg.innerHTML = msgStart;
		placeDisplayTime2.innerHTML = '';
	});

	document.querySelectorAll('.measure_btn').forEach((item) => {
		item.addEventListener('click', changeVisButtons);
	});

	btnMeasureResult.addEventListener('click', function () {
		changeVisResult();
		alert(`Ваш пульс ${userInput.value * 4} ударов в минуту.`);
	});
})();


