'use strict';

describe('task01.js -> getNumWord -> test getting word forms', function () {
	let word1 = 'word1';
	let word2 = 'word2';
	let word5 = 'word5';
	let result = (num) => getNumWord(num, word1, word2, word5);

	it('should return word1', function() {
		expect(result(1)).toEqual(word1);
		expect(result(101)).toEqual(word1);
	});

	it('should return word2', function() {
		expect(result(2)).toEqual(word2);
		expect(result(3)).toEqual(word2);
		expect(result(4)).toEqual(word2);
		expect(result(22)).toEqual(word2);
		expect(result(33)).toEqual(word2);
		expect(result(44)).toEqual(word2);
		expect(result(102)).toEqual(word2);
		expect(result(203)).toEqual(word2);
		expect(result(304)).toEqual(word2);
	});

	it('should return word5', function() {
		expect(result(11)).toEqual(word5);
		expect(result(15)).toEqual(word5);
		expect(result(19)).toEqual(word5);
		expect(result(111)).toEqual(word5);
		expect(result(215)).toEqual(word5);
		expect(result(319)).toEqual(word5);
		expect(result(0)).toEqual(word5);
		expect(result(20)).toEqual(word5);
		expect(result(45)).toEqual(word5);
		expect(result(-5)).toEqual(word5);
		expect(result(-1)).toEqual(word5);
	});
});

describe('task01.js -> getNumberApples -> test getting number from user', function () {
	let value;
	let result;
	let isFirstCall;
	let testFunction = getNumberApples;

	beforeEach(function() {
		isFirstCall = false;
	});

	it('should work with and return integer number', function() {
		value = 10;

		spyOn(window, 'prompt').and.returnValue(value);
		result = testFunction('');

		expect(window.prompt).toHaveBeenCalled();
		expect(result).toEqual(value);
	});

	it('should work with number in string', function() {
		value = '10';

		spyOn(window, 'prompt').and.returnValue(value);
		result = testFunction('');

		expect(window.prompt).toHaveBeenCalled();
		expect(result).toEqual(+value);
	});

	it('should work with and return null', function() {
		value = null;

		spyOn(window, 'prompt').and.returnValue(value);
		result = testFunction('');

		expect(window.prompt).toHaveBeenCalled();
		expect(result).toBeNull();
	});

	it('should work with NaN', function() {
		value = 'some text';

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Введите число, а не текст! ']);
	});

	it('should work with floating point', function() {
		value = 15.5;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Введите целое число! Огрызки - это не яблоки!']);
	});

	it('should work with negative number', function() {
		value = -10;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Количество не может быть отрицательным! ']);
	});
});

describe('task01.js -> showWordFormResult -> test showing final result', function () {
	let text = 'Не хочешь говорить - ну и не надо...';
	let value;
	let testFunction = showWordFormResult;

	it('should return not value message', function() {
		value = null;

		spyOn(window, 'getNumberApples').and.returnValue(value);
		spyOn(window, 'alert');

		testFunction();
		expect(window.alert).toHaveBeenCalledWith(text);

	});

	it('should return normal message', function() {
		value = 10;

		spyOn(window, 'getNumberApples').and.returnValue(value);
		spyOn(window, 'alert');

		testFunction();
		expect(window.alert).not.toHaveBeenCalledWith(text);

	});


});