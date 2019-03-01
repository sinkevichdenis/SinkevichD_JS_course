'use strict';

/** get word's forms for number
 *
 * @param num (number) - number of something which we count
 * @param word1 (string) - word's form
 * @param word2 (string) - word's form
 * @param word5 (string) - word's form
 * @returns {*} (string) - one of word's forms
 */
function getNumWord(num, word1, word2, word5) {
	let dd = num % 100,
		d = num % 10;

	switch (true) {
	case (dd >= 11) && (dd <= 19):
		return word5;
	case (d >= 2) && (d <= 4):
		return word2;
	case d === 1:
		return word1;
	default:
		return word5;
	}
}
/** get number from user
 *
 * @param question (string) - default question for prompt
 * @returns {number,null} - null or integer number >= 0
 */
function getNumberApples(question) {
	let apples = prompt(question);

	do {
		if (apples === null) {
			return apples;
		} else {
			apples = +apples;
		}

		switch (true) {
		case (isNaN(apples)):
			apples = prompt('Введите число, а не текст! ' + question);
			break;
		case (apples % 1 > 0):
			apples = prompt('Введите целое число! Огрызки - это не яблоки!');
			break;
		case (apples < 0):
			apples = prompt('Количество не может быть отрицательным! ' + question);
			break;
		}

	} while ( !Number.isInteger(apples) || apples < 0 );

	return apples;
}

/** display result with word's forms with help alert window
 *
 */
function showWordFormResult() {
	let apples = getNumberApples('Сколько у вас яблок?');

	if (apples === null) {
		alert ('Не хочешь говорить - ну и не надо...');
	} else {
		alert('У вас ' + apples + ' ' + getNumWord(apples, 'яблоко', 'яблока', 'яблок') + '!');
	}
}