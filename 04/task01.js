'use strict';

function doDivision(a, b) {
	let result = a % b;
	return (result) ? `Делится с остатком: ${result}` : `Делится: ${a / b}`;
}

function censor() {
	let arrString = prompt('Введите строку:').split('');
	let arrExcept = ['а', 'о', 'е', 'ё', 'у', 'и', 'ю', 'я', 'э', 'ы'];
	let resultArray = [];

	resultArray = arrString.filter(char =>
		arrExcept.includes(char));

	console.log(resultArray.length);
}