'use strict';

/**
 * create main class
 * @constructor
 */
function Form() {
	this.buttonCheck = document.querySelector('.button_check');
	this.buttonShow = document.querySelector('.button_show');
	this.name = document.querySelector('.input_name');
	this.surname = document.querySelector('.input_surname');
	this.email = document.querySelector('.input_email');
	this.password = document.querySelector('.input_password');
	this.status = false;
	this.profile = {};
}

/**
 * create object with user data
 */
Form.prototype.getProfile = function () {
	this.profile = {
		'name': this.deleteSpaces(this.name),
		'surname': this.deleteSpaces(this.surname),
		'email': this.checkEmail(this.email),
		'password': this.checkPassword(this.password)
	};
};

/**
 * check if data in form has mistakes
 * @returns {boolean}
 */
Form.prototype.isFormComplited = function () {
	this.getProfile();
	let obj = this.profile;
	for (let key in obj) {
		if (obj[key] === '') {
			alert('All string must contain text.');
			return this.status = false;
		}
		if (obj[key] === false) {
			return this.status = false;
		}
	}
	alert(true);
	return this.status = true;
};

/**
 * show final profile
 */
Form.prototype.showProfile = function () {
	if (this.status) {
		alert(JSON.stringify(this.profile));
	} else {
		alert('Data is not complited!');
	}
};

/**
 * check string from object is not empty
 * @param elem
 * @returns {*}
 */
Form.prototype.checkEmptyString = function (elem) {
	if (elem.value.length === 0) {
		elem.focus();
	}
	return elem;
};

/**
 * delete all spaces after and before words
 * @param elem
 * @returns str
 */
Form.prototype.deleteSpaces = function (elem) {
	let str = this.checkEmptyString(elem).value;

	while(str.length !== 0 && str.lastIndexOf(' ') === (str.length - 1)) {
		str = str.substring(0, str.length - 1);
	}

	while(str.indexOf(' ') === 0) {
		str = str.substring(1, str.length);
	}
	return str;
};

/**
 * check email's rules
 * @param elem
 * @returns str, bool
 */
Form.prototype.checkEmail = function (elem) {
	let str = this.deleteSpaces(elem);

	if (str.indexOf('@') !== str.lastIndexOf('@')
		|| str.indexOf('@') === -1
		|| str.length <= 4) {
		alert('E-mail must contain only 1 symbol @ and be longer than 4 symbols.');
		this.email.focus();
		this.email.select();
		return false;

	} else if (str.indexOf(' ') !== -1) {
		alert('E-mail mustn\'t contain any spaces.');
		this.email.focus();
		this.email.select();
		return false;
	}
	return str;
};

/**
 * check password's rules
 * @param elem
 * @returns str, bool
 */
Form.prototype.checkPassword = function (elem) {
	let str = this.deleteSpaces(elem);

	if (str.length === 0
		|| str.length < 5) {
		alert('Password must be longer than 5 characters!');
		this.password.focus();
		this.password.select();
		return false;
	}
	return str;
};
