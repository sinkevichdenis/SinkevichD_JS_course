'use strict';

function Timer(period) {
	let time = period || 60;
	let idInt;
	let idTo;

	function showTime(msg = '') {
		return `${msg} ${time}  `;
	}

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