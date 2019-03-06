'use strict';

let isFirstCall = false;
let fakePosValue;
let fakeNegValue;

function fakeFunc() {
	let result = isFirstCall ? fakePosValue : fakeNegValue;
	isFirstCall = true;
	return result;
}

describe('task01.js -> getNumWord -> test getting word forms', function () {
	let word1 = 'word1';
	let word2 = 'word2';
	let word5 = 'word5';
	let testFunction = (num) => getNumWord(num, word1, word2, word5);

	it('should return word1', function() {
		expect(testFunction(1)).toEqual(word1);
		expect(testFunction(101)).toEqual(word1);
	});

	it('should return word2', function() {
		expect(testFunction(2)).toEqual(word2);
		expect(testFunction(3)).toEqual(word2);
		expect(testFunction(4)).toEqual(word2);
		expect(testFunction(22)).toEqual(word2);
		expect(testFunction(33)).toEqual(word2);
		expect(testFunction(44)).toEqual(word2);
		expect(testFunction(102)).toEqual(word2);
		expect(testFunction(203)).toEqual(word2);
		expect(testFunction(304)).toEqual(word2);
	});

	it('should return word5', function() {
		expect(testFunction(11)).toEqual(word5);
		expect(testFunction(15)).toEqual(word5);
		expect(testFunction(19)).toEqual(word5);
		expect(testFunction(111)).toEqual(word5);
		expect(testFunction(215)).toEqual(word5);
		expect(testFunction(319)).toEqual(word5);
		expect(testFunction(0)).toEqual(word5);
		expect(testFunction(20)).toEqual(word5);
		expect(testFunction(45)).toEqual(word5);
		expect(testFunction(-5)).toEqual(word5);
		expect(testFunction(-1)).toEqual(word5);
	});
});

describe('task01.js -> getNumberApples -> test getting number from user', function () {
	let value;
	let result;
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
		fakePosValue = 45;
		fakeNegValue = 'some text';

		spyOn(window, 'prompt').and.callFake(fakeFunc);
		testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Введите число, а не текст! ']);
	});

	it('should work with floating point', function() {
		fakePosValue = 45;
		fakeNegValue = 15.5;

		spyOn(window, 'prompt').and.callFake(fakeFunc);
		testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Введите целое число! Огрызки - это не яблоки!']);
	});

	it('should work with negative number', function() {
		fakePosValue = 45;
		fakeNegValue = -10;

		spyOn(window, 'prompt').and.callFake(fakeFunc);
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