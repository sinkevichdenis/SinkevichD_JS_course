'use strict';

/**
 * usual timer
 * @param seconds - whole duration of timer's work in seconds
 * @param period - period for iteration's repeat in seconds
 * @returns {{getTime: function(*=), setTime: function(*), start: function(*=), stop: function()}}
 * @constructor
 */
function Timer(seconds, period) {
	let time = seconds || 60;
	let periodTime = period || 1;
	let idInt;
	let status = true;

	/**
	 * show result msg of periodic function
	 * @param msg
	 * @returns {string}
	 */
	function showTime(msg = '') {
		return `${msg} ${time}`;
	}

	/**
	 *  start function (default - periodic function, with 'done' - function will start after timer's finish)
	 * @param func
	 * @param done
	 * @returns {Function}
	 */
	function startFunc(func, done) {
		return function () {
			status = false;
			!done && func();

			idInt = setInterval(() => {
				time -= periodTime;
				if (time <= 0) {
					clearInterval(idInt);
					status = true;
					done && func();
				}
				!done && func();
			}, periodTime * 1000);
		};
	}

	return {
		getTime: (msg, elem) => {
			return showTime(msg, elem);
		},
		setTime: (x, y) => {
			x && (time = x);
			y && (periodTime = y);
		},
		start: (func, done = '') => {
			return startFunc(func, done);
		},
		stop: () => {
			clearInterval(idInt);
			status = true;
		},
		isFinish: () => {
			return status;
		}
	};
}