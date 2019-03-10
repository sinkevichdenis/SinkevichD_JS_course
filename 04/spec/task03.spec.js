'use strict';
/**
 * create example of form to work tests with focus() and select()
 */
(function createForm() {
	document.write(`<form class="form" style="display: none;">
        <label>
            <span> Имя </span>
            <input  class="input_name"
            size="20">
        </label>
        <label>
            <span> Фамилия </span>
            <input class="input_surname"
                   name="my_surname"
                   size="20">
        </label>
        <label>
            <span> Email </span>
            <!--use type "text" instead of "email" to disconnect browser email validation-->
            <input class="input_email"
                   size="20">
        </label>
        <label>
            <span> Password </span>
            <input class="input_password"
                   type="password"
                   size="20">
        </label>
        <div>
            <button class="button_check">Check form (ex. 3)</button>
            <button class="button_show">Show form data (ex. 3)</button>
        </div>
    </form>`);
})();

describe('task03-classForm.js -> Form.prototype.checkPassword -> check password rules', function() {
	let form;
	let value;

	beforeEach(function() {
		/* global Form */
		form = new Form();
	});

	it('should return string because of normal string', function() {
		value = 'rrrrr';
		form.password = value;
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		expect(form.checkPassword(form.password)).toEqual(value);
	});

	it('should return false because of empty string', function() {
		value = '';
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		spyOn(window, 'alert');
		expect(form.checkPassword(form.password)).toBeFalsy();
		expect(alert).toHaveBeenCalled();
	});

	it('should return false because of string < 5 symbol', function() {
		value = 'rrrr';
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		spyOn(window, 'alert');
		expect(form.checkPassword(form.password)).toBeFalsy();
		expect(alert).toHaveBeenCalled();
	});
});

describe('task03-classForm.js -> Form.prototype.checkEmail -> check email rules', function() {
	let form;
	let value;

	beforeEach(function () {
		form = new Form();
	});

	it('should return string because of normal string', function() {
		value = 'rrr@rr';
		form.email = value;
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		expect(form.checkEmail(form.email)).toEqual(value);
	});

	it('should return false because of empty string', function() {
		value = '';
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		spyOn(window, 'alert');
		expect(form.checkEmail(form.email)).toBeFalsy();
		expect(alert).toHaveBeenCalled();
	});

	it('should return false because of string < 5 symbol', function() {
		value = 'rrrrrrr';
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		spyOn(window, 'alert');
		expect(form.checkEmail(form.email)).toBeFalsy();
		expect(alert).toHaveBeenCalled();
	});

	it('should return false because of @@', function() {
		value = 'rr@@r';
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		spyOn(window, 'alert');
		expect(form.checkEmail(form.email)).toBeFalsy();
		expect(alert).toHaveBeenCalled();
		expect(alert).toHaveBeenCalledWith('E-mail must contain only 1 symbol @ and be longer than 4 symbols.');
	});

	it('should return false because of space', function() {
		value = 'rr  @rr';
		spyOn(form, 'deleteSpaces').and.returnValue(value);
		spyOn(window, 'alert');
		expect(form.checkEmail(form.email)).toBeFalsy();
		expect(alert).toHaveBeenCalledWith('E-mail mustn\'t contain any spaces.');
	});
});


describe('task03-classForm.js -> Form.prototype.deleteSpaces -> delete spaces after and before words', function() {
	let form;

	beforeEach(function () {
		form = new Form();
	});

	it('should return normal string (1)', function() {
		form.name.value = '     ttt    ';
		spyOn(form, 'checkEmptyString').and.returnValue(form.name);
		expect(form.deleteSpaces(form.name)).toEqual('ttt');
	});

	it('should return normal string (2)', function() {
		form.name.value = '     t tt    ';
		spyOn(form, 'checkEmptyString').and.returnValue(form.name);
		expect(form.deleteSpaces(form.name)).toEqual('t tt');
	});

	it('should return empty string', function() {
		form.name.value = '        ';
		spyOn(form, 'checkEmptyString').and.returnValue(form.name);
		expect(form.deleteSpaces(form.name)).toEqual('');
	});
});

describe('task03-classForm.js -> Form.prototype.showProfile -> show result profile', function() {
	let form;

	beforeEach(function () {
		form = new Form();
	});

	it('should return true answer', function() {
		form.status = true;
		spyOn(window, 'alert');
		form.showProfile();
		expect(alert).not.toHaveBeenCalledWith('Data is not complited!');
	});

	it('should return false answer', function() {
		form.status = false;
		spyOn(window, 'alert');
		form.showProfile();
		expect(alert).toHaveBeenCalledWith('Data is not complited!');
	});
});

describe('task03-classForm.js -> Form.prototype.isFormComplited -> is form data normal', function() {
	let form;

	beforeEach(function () {
		form = new Form();
	});

	it('should return status = false because of empty string', function() {
		form.profile = {
			'name': '',
			'surname': '',
			'email': '112@11',
			'password': '124134'
		};
		spyOn(form, 'getProfile');
		spyOn(window, 'alert');
		form.isFormComplited();
		expect(form.status).toBeFalsy();
	});

	it('should return status = false because of false', function() {
		form.profile = {
			'name': false,
			'surname': 'ege',
			'email': false,
			'password': '124134'
		};
		spyOn(form, 'getProfile');
		spyOn(window, 'alert');
		form.isFormComplited();
		expect(form.status).toBeFalsy();
	});

	it('should return status = true', function() {
		form.profile = {
			'name': 'egew',
			'surname': 'ege',
			'email': '112@11',
			'password': '124134'
		};
		spyOn(form, 'getProfile');
		spyOn(window, 'alert');
		form.isFormComplited();
		expect(form.status).toBeTruthy();
	});
});