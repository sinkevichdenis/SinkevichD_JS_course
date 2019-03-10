'use strict';

describe('task03-classForm.js -> getString -> test getting string from user', function() {
	let result;
	let isFirstCall;
	let testFunction = getString;

	beforeEach(function() {
		isFirstCall = false;
	});

	it('should work with normal string and return getString', function() {
		spyOn(window, 'prompt');
		spyOn(window, 'isGoodString').and.returnValue(true);
		spyOn(window, 'deleteSpaces').and.returnValue('string');
		result = testFunction('');

		expect(isGoodString).toHaveBeenCalled();
		expect(deleteSpaces).toHaveBeenCalled();
		expect(result).toEqual(jasmine.any(String));
	});

	it('should return getString', function() {
		spyOn(window, 'prompt');
		spyOn(window, 'deleteSpaces').and.returnValue('string');
		spyOn(window, 'isGoodString').and.callFake( function() {
			let result = isFirstCall;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(isGoodString.calls.count()).toEqual(2);
		expect(deleteSpaces).toHaveBeenCalled();
		expect(result).toEqual(jasmine.any(String));
	});

});

describe('task03-classForm.js -> isGoodString -> test good string', function() {
	let value;
	let testFunction = isGoodString;

	it('should return true', function () {
		value = 'string';
		spyOn(window, 'alert');

		expect(testFunction(value)).toBeTruthy();
	});

	it('should return false because of empty string', function () {
		value = '';
		spyOn(window, 'alert');

		expect(testFunction(value)).toBeFalsy();
	});

	it('should return false because of null', function () {
		value = null;
		spyOn(window, 'alert');

		expect(testFunction(value)).toBeFalsy();
	});

	it('should not show alert', function () {
		value = 'string';
		spyOn(window, 'alert');

		expect(alert).not.toHaveBeenCalled();
	});

	it('should show alert because of empty string', function () {
		value = '';
		spyOn(window, 'alert');

		testFunction(value);
		expect(alert).toHaveBeenCalledWith('Вы ввели пустую строку');
	});

	it('should show alert because of null', function () {
		value = null;
		spyOn(window, 'alert');

		testFunction(value);
		expect(alert).toHaveBeenCalledWith('Вы отказались ввести строку');
	});
});

describe('task03-classForm.js -> deleteSpaces -> test deleting spaces', function() {
	let value;
	let result;
	let testFunction = deleteSpaces;

	it ('should NOT return the same string', function() {
		value = 't t t t';
		expect(testFunction(value)).not.toEqual(value);
	});

	it ('should return the same string', function() {
		value = 't t t t';
		result = 'tttt';
		expect(testFunction(value)).toEqual(result);
	});
});

describe('task03-classForm.js -> showResult-> test showing result', function() {
	let value;
	let testFunction = showResult;

	it('should show alert because of true', function() {
		value = true;
		spyOn(window, 'alert');

		testFunction(value);
		expect(alert).toHaveBeenCalledWith('Yes. It is palindrome.');
	});

	it('should show alert because of false', function() {
		value = false;
		spyOn(window, 'alert');

		testFunction(value);
		expect(alert).toHaveBeenCalledWith('No. It is simple string.');
	});
});

describe('task03-classForm.js -> isPalindrome2 -> test one of palindroms function', function() {
	let value;
	let testFunction = isPalindrome2;

	it ('should NOT return the same string', function() {
		value = 't t juyu';
		spyOn(window, 'getString').and.returnValue(value);
		spyOn(window, 'showResult');
		testFunction();

		expect(showResult).toHaveBeenCalledWith(false);
	});

	it ('should return the same string', function() {
		value = 'tttt';
		spyOn(window, 'getString').and.returnValue(value);
		spyOn(window, 'showResult');
		testFunction();

		expect(showResult).toHaveBeenCalledWith(true);
	});
});