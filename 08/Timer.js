'use strict';

/**
 * usual timer
 * @param period
 * @returns {{getTime: function(*=), setTime: function(*), start: function(*=), stop: function()}}
 * @constructor
 */
function Timer(period) {
	let time = period || 60;
	let idInt;
	let idTo;

	/**
	 * show result msg of periodic function
	 * @param msg
	 * @returns {string}
	 */
	function showTime(msg = '') {
		return `${msg} ${time}`;
	}

	/**
	 *  start periodic function
	 * @param func
	 * @returns {Function}
	 */
	function startTimer(func) {
		return function () {
			func();
			idInt = setInterval(() => {
				time--;
				func();
			}, 1000);

			idTo = setTimeout(() => {
				clearInterval(idInt);
			}, time * 1000);
		};
	}

	return {
		getTime: (msg) => {
			return showTime(msg);
		},
		setTime: (x) => {
			time = x;
		},
		start: (func) => {
			return startTimer(func);
		},
		stop: () => {
			clearInterval(idInt);
			clearTimeout(idTo);
		}
	};
}