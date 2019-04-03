'use strict';

/**
 * usual timer
 * @param seconds - whole duration of timer's work in seconds
 * @param period - period for iteration's repeat in seconds
 * @returns {{getTime: function(*=), setTime: function(*), start: function(*=), stop: function()}}
 * @constructor
 */
function Timer(seconds = 60, period = 1) {
	let time = seconds;
	let periodTime = period;
	let idInt = null;
	let status = true;

	/**
	 * show remain time with msg
	 * @param msg
	 * @returns {string}
	 */
	function showTime(msg = '') {
		return `${msg} ${time}`;
	}

	/**
	 * display remain time with msg into element
	 * @param elem
	 */
	function showTimeMsg(elem) {
		if (elem) {
			try {
				(elem.element).innerHTML = showTime(elem.msg) + ' сек';
			} catch(e) {
				console.log(e.message);
			}
		}
	}

	/**
	 *  start periodic function
	 * @param func
	 * @param elem - (object) element's description for displaying last time
	 * @param done - if !!done == true, func() will be started after timer's ending
	 * @returns {Function}
	 */
	function startFunc(func, elem, done) {
		if (idInt === null){
			status = false;
			!done && func();
			showTimeMsg(elem);

			idInt = setInterval(() => {
				time -= periodTime;
				showTimeMsg(elem);

				if (time <= 0) {
					stopInterval();
					renewTime(seconds, period);
					func();
					return false;
				}
				!done && func();

			}, periodTime * 1000);
		} else {
			throw new Error('Timer has already started!');
		}
	}

	/**
	 * stop interval and renew start valuables
	 */
	function stopInterval() {
		clearInterval(idInt);
		status = true;
		idInt = null;
	}

	/**
	 *  renew time options
	 * @param x
	 * @param y
	 */
	function renewTime(x, y) {
		x ? (time = x) : (time = seconds);
		y ? (periodTime = y) : (periodTime = period);
	}

	return {
		getTime: (msg) => {
			return showTime(msg);
		},
		setTime: (x, y) => {
			renewTime(x, y);
		},
		start: (func, elem = '', done = '') => {
			return startFunc(func, elem, done);
		},
		stop: () => {
			stopInterval();
		},
		isFinish: () => {
			return status;
		}
	};
}