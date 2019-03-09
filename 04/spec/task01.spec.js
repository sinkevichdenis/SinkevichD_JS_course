'use strict';

describe('task01.js -> doDivision -> divide Num1 on Num2 and show result', function() {
	it ('should return remainder of division', function() {
		expect(doDivision(5, 3)).toContain('2');
		expect(doDivision(2.5, 2)).toContain('0.5');
		expect(doDivision(-13, 2)).toContain('-1');
		expect(doDivision(3, 5)).toContain('3');
	});

	it ('should return remainder message', function() {
		expect(doDivision(3, 5)).toContain('Делится с остатком:');
	});

	it ('should return result of division', function() {
		expect(doDivision(6, 3)).toContain('2');
		expect(doDivision(-12, 2)).toContain('-6');
	});

	it ('should return integer message', function() {
		expect(doDivision(10, 5)).toContain('Делится:');
	});
});

describe('task01.js -> countVowels -> count all vowels in string', function() {
	it('should return number of vowels', function() {
		spyOn(window, 'prompt').and.returnValue('аоеёуиюяэы/АОЕЁУИЮЯЭЫ');
		spyOn(console, 'log');
		countVowels();
		expect(console.log).toHaveBeenCalledWith(20);
	});

	it('should return 0 because of only consonants in string', function() {
		spyOn(window, 'prompt').and.returnValue('бвгджзйклмнпрстфхцчшщ/БВГДЖЗЙКЛМНПРСТФХЦЧШЩ');
		spyOn(console, 'log');
		countVowels();
		expect(console.log).toHaveBeenCalledWith(0);
	});

	it('should return msg of empty string (after null)', function() {
		spyOn(window, 'prompt').and.returnValue(null);
		spyOn(console, 'log');
		countVowels();
		expect(console.log).toHaveBeenCalledWith('String is empty');
	});

	it('should return msg of empty string', function() {
		spyOn(window, 'prompt').and.returnValue('');
		spyOn(console, 'log');
		countVowels();
		expect(console.log).toHaveBeenCalledWith('String is empty');
	});
});

describe('task01.js -> deleteWords -> delete words from string', function() {
	it ('should call 3 console.log', function() {
		spyOn(console, 'log');
		deleteWords('d f g d', 'd');
		expect(console.log.calls.count()).toEqual(3);
	});

	it('should return right string', function() {
		spyOn(console, 'log');
		deleteWords('d f g d', 'd');
		expect(console.log).toHaveBeenCalledWith('finish: f g');

		deleteWords('dad lf lf la dad g dad', 'dad lf');
		expect(console.log).toHaveBeenCalledWith('finish: la g');
	});
});