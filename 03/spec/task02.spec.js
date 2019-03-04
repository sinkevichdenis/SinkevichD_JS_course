'use strict';

describe('task02.js -> getNameData -> test getting name (string) from user', function (){
	let value;
	let result;
	let isFirstCall;
	let testFunction = getNameData;

	beforeEach(function() {
		value = null;
		isFirstCall = false;
	});

	it('should work with string', function() {
		value = 'string';

		spyOn(window, 'prompt').and.returnValue(value);
		result = testFunction('');
		expect(window.prompt.calls.count()).toEqual(1);
		expect(result).toEqual(value);
	});

	it('should work with number', function() {
		value = 10;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 'name' : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(result).toEqual(jasmine.any(String));
	});

	it('should work with null', function() {
		value = null;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 'name' : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(result).toEqual(jasmine.any(String));
	});

	it('should work with empty string', function() {
		value = '';

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 'name' : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(result).toEqual(jasmine.any(String));
	});

	it('should work with string contained only spaces', function() {
		value = '    ';

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 'name' : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(result).toEqual(jasmine.any(String));
	});
});

describe('task02.js -> getAge -> test getting Age (number) from user', function (){
	let value;
	let result;
	let isFirstCall;
	let testFunction = getAge;

	beforeEach(function() {
		value = null;
		isFirstCall = false;
	});

	it('should work with and return integer number', function() {
		value = 50;

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

	it('should work with null', function() {
		value = null;

		spyOn(window, 'prompt').and.returnValue(value);
		result = testFunction('');

		expect(window.prompt).toHaveBeenCalled();
		expect(result).toEqual('Unknown');
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
		expect(window.prompt.calls.argsFor(1)).toEqual([' Введите количество полных лет!!!']);
	});

	it('should work with number <= 0 (check 0)', function() {
		value = 0;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Что-то с трудом в это верится. ']);
	});

	it('should work with number <= 0 (check 1)', function() {
		value = 1;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(1);
		expect(window.prompt.calls.argsFor(1)).not.toEqual(['Что-то с трудом в это верится. ']);
	});

	it('should work with number >= 120 (check 120)', function() {
		value = 120;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(2);
		expect(window.prompt.calls.argsFor(1)).toEqual(['Что-то с трудом в это верится. ']);
	});

	it('should work with number >= 120 (check 119)', function() {
		value = 119;

		spyOn(window, 'prompt').and.callFake(function() {
			let result = isFirstCall ? 45 : value;
			isFirstCall = true;
			return result;
		});
		result = testFunction('');

		expect(window.prompt.calls.count()).toEqual(1);
		expect(window.prompt.calls.argsFor(1)).not.toEqual(['Что-то с трудом в это верится. ']);
	});
});

describe('task02.js -> isMan -> test getting sex from user', function (){
	let testFunction = isMan;

	it('should return true', function() {
		spyOn(window, 'confirm').and.returnValue(true);
		expect(testFunction('')).toBeTruthy();
		expect(confirm).toHaveBeenCalled();
	});

	it('should return false', function() {
		spyOn(window, 'confirm').and.returnValue(false);
		expect(testFunction('')).toBeFalsy();
		expect(confirm).toHaveBeenCalled();
	});

});

describe('task02.js -> showSex -> test showing user sex', function (){
	let testFunction = showSex;
	let profile = {};

	beforeEach(function(){
		profile.sex = true;
	});

	it('should return true', function(){
		expect(testFunction(profile)).toBe('Мужчина');
	});

	it('should return false', function() {
		profile.sex = false;
		expect(testFunction(profile)).toBe('Женщина');
	});

});

describe('task02.js -> isRetired -> test user age for retire', function (){
	let testFunction = isRetired;
	let profile = {};

	beforeEach(function(){
		profile.sex = null;
		profile.age = null;
	});

	it('should return retired man', function(){
		profile.sex = true;
		profile.age = 63;
		expect(testFunction(profile)).toBeTruthy();
	});

	it('should return NOT retired man', function(){
		profile.sex = true;
		profile.age = 62;
		expect(testFunction(profile)).toBeFalsy();
	});

	it('should return retired woman', function(){
		profile.sex = false;
		profile.age = 58;
		expect(testFunction(profile)).toBeTruthy();
	});

	it('should return NOT retired woman', function(){
		profile.sex = false;
		profile.age = 57;
		expect(testFunction(profile)).toBeFalsy();
	});

});

describe('task02.js -> showRetired -> test showing user is retired', function () {
	let testFunction = showRetired;

	it('should return true', function() {
		spyOn(window, 'isRetired').and.returnValue(true);
		showRetired();
		expect(testFunction('')).toEqual('Да');
	});

	it('should return false', function() {
		spyOn(window, 'isRetired').and.returnValue(false);
		showRetired();
		expect(testFunction('')).toEqual('Нет');
	})

});

describe('task02.js -> showAgeData -> test user age for retire', function () {
	let testFunction = showAgeData;
	let profile = {};

	beforeEach(function(){
		profile.age = null;
	});

	it('should return unknown age', function() {
		profile.age = 'string';
		expect(testFunction(profile)).not.toContain('Через');
	});

	it('should return normal age', function() {
		profile.age = 50;
		expect(testFunction(profile)).toContain('Через');
	});

});

describe('task02.js -> createProfile -> test creation profile object', function (){
	let example = {
		'surname': 'string',
		'name': 'string',
		'fatherName': 'string',
		'age': 10,
		'sex': true,
	};

	it('should create profile object', function() {
		spyOn(window, 'getNameData').and.returnValue('string');
		spyOn(window, 'getAge').and.returnValue(10);
		spyOn(window, 'isMan').and.returnValue(true);
		expect(createProfile()).toEqual(example);
	})
});

describe('task02.js -> showProfile -> test showing result profile', function () {
	let example = {
		'surname': 'string',
		'name': 'string',
		'fatherName': 'string',
		'age': 10,
		'sex': true,
	};
	let testFunction = showProfile;
	let result;

	it('should create profile object', function() {
		spyOn(window, 'createProfile').and.returnValue(example);
		spyOn(window, 'alert');
		result = testFunction();
		expect(alert).toHaveBeenCalled();
	});
});