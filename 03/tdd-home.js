'use strict';

/**
 * should find sum of positive number in array
 * @param arr
 * @returns {number}
 */
/* exported positiveSum */
function positiveSum(arr) {
	let result = 0;

	if(arr.length === 0) return result;

	arr.forEach(x => (x > 0) && (result += x));
	return result;
}

/**
 * should return strings 'Even' or  'Odd'
 * @param num
 * @returns {string}
 */
/* exported evenOrOdd */
function  evenOrOdd(num) {
	return (num % 2) ? 'Odd' : 'Even';
}

/**
 * Input: year, output: century
 * @param year
 * @returns {number}
 */
/* exported centuryFromYear */
function centuryFromYear(year) {
	return Math.ceil(year / 100);
}

/**
 * It should remove all values from list a, which are present in list b'
 * @param arrMain
 * @param arrExcept
 * @returns {Array}
 */
/* exported arrayDiff */
function arrayDiff(arrMain, arrExcept) {
	let result = [];

	chekpoint:
	for (let i = 0; i < arrMain.length; i++) {
		for (let j = 0; j < arrExcept.length; j++) {
			if ( arrMain[i] === arrExcept[j] ) continue chekpoint;
		}
		result.push(arrMain[i]);
	}
	return result;
}