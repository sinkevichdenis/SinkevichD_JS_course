'use strict';

/**
 * divide number1 on number2 and show result
 * @param a (number)
 * @param b (number)
 * @returns {string}
 */
function doDivision(a, b) {
	let result = a % b;
	return (result) ? `Делится с остатком: ${result}` : `Делится: ${a / b}`;
}

/**
 *  count all vowels in string
 */
function censor() {
	let arrExcept = ['а', 'о', 'е', 'ё', 'у', 'и', 'ю', 'я', 'э', 'ы'];
	let arrString = prompt('Введите строку:');
	let resultArray = [];

	if (!arrString) {
		console.log('String is empty');
		return;
	}

	arrString = arrString.toLowerCase().split('');
	resultArray = arrString.filter(char => arrExcept.includes(char));

	console.log(resultArray.length);
}

/**
 * delete words from string
 * @param str (string) - string to repairing
 * @param strToArr (string) - string to deleting words
 */
//можно было решить также через filter, но я взял другой метод
function deleteWords(str, strToArr) {
	let arr = strToArr.split(' ');
	console.log(`start: ${str}`);

	for (let i = 0; i < arr.length; i++) {
		let index = str.indexOf(arr[i]);
		if (index !== -1) {
			str = str.substring(0, index) + str.substring(index + arr[i].length + 1);
		}
	}
	console.log(`finish: ${str}`);
}

deleteWords('Удалить из строки набор слов (фильтр запрещенных слов)', 'Удалить из строки запрещенных');

/*
let result = 'Удалить из строки набор слов (фильтр запрещенных слов)';
let arrExcept = ['Удалить', 'из', 'строки', 'запрещенных'];*/
