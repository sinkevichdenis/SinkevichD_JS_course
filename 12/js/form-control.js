import * as ValidatorsObject from './validator.js';


export function FormControl(type, id, validators, helper) {
	switch (type) {
	case 'input':
		return new FormControlInput(id, validators, helper);
	default:
		throw new Error('Invalid form type!');
	}
}

function FormControlInput(id, validators, helper) {
	this.control = document.getElementById(id);

	this.validationErrors = [];

	this.isValid = getValidation.bind(this)();

	this.startCheck = function() {
		let classChanger = new helper(this.control, ['error']);

		this.isValid = getValidation.bind(this)();
		console.log(this.isValid);

		if (!this.isValid) {
			classChanger.addClass();
		} else {
			classChanger.removeClass();
		}

		const errorContainer = this.control.parentNode.querySelector('.error-list');
		let text = '';
		console.log(this.validationErrors);
		this.validationErrors.forEach(function(error){
			text += `<span>${error}</span><br />`;
		});

		errorContainer.innerHTML = text;
	};

	/**
	 * get validation all form
	 */
	function getValidation() {
		let isValid = true;

		validators.forEach((item) => {
			let validator = new ValidatorsObject[item]();
			isValid = testValidator.call(this, validator);
		});
		return isValid;
	}

	/**
	 * get validation every item
	 */
	function testValidator(validator){
		let isValid = true;

		if (!(validator.test(this.control.value))) {
			isValid = false;
			if (this.validationErrors.indexOf(validator.toString()) === -1) {
				this.validationErrors.push(validator.toString());
			}
		} else {
			let errorIndex = this.validationErrors.indexOf(validator.toString());
			if (errorIndex !== -1) {
				this.validationErrors.splice(errorIndex, 1);
			}
		}
		return isValid;
	}

	_init.bind(this)();

	function _init() {
		const self = this;
		this.control.addEventListener('input', this.startCheck.bind(self));
	}
}