'use strict';
/* global moment */

/**
 * show how many seconds remain to day's end
 */
function countTime() {
	let nowTime;
	let nextTime;
	let result;
	let place = document.getElementById('nextDay');

	moment.locale('ru');
	nowTime = moment();
	nextTime = moment().add(1, 'day').hour(0).minutes(0).seconds(0);
	result = nowTime.diff(nextTime)/1000;
	result = Math.abs(+result.toFixed(0));

	place.innerHTML = `${result} сек`;
}

setInterval(countTime, 1000);
countTime();

/*
moment.locale('ru');
console.log(moment().format('LLLL'));
console.log(moment().add(1, 'day').format('LLLL'));
console.log(moment().add(1, 'day').hour(0).minutes(0).seconds(0).format('LLLL'));*/
