import * as ValidatorsExpObj from './validator.js';

export function FormControl(type, id, validators, helper) {
	switch (type) {
	case 'input':
		return new FormControlInput(id, validators, helper);
	default:
		throw new Error('Invalid form type!');
	}
}

class FormControlInput {
	constructor (id, validators, helper) {
		this.validators = new Set(validators);
		this.helper = helper;
		this.control = document.getElementById(id);
		this.validationErrors = new Set();
		this.isValid = this.getValidation.bind(this)();

		this._init.bind(this)();
	}

	_init() {
		const self = this;
		this.control.addEventListener('input', this.startCheck.bind(self));
	}

	startCheck () {
		let classChanger = new this.helper(this.control, ['error']);

		this.isValid = this.getValidation.bind(this)();
		console.log(this.isValid);

		if (!this.isValid) {
			classChanger.addClass();
		} else {
			classChanger.removeClass();
		}

		const errorContainer = this.control.parentNode.querySelector('.error-list');
		let text = '';
		console.log(this.validationErrors);
		this.validationErrors.forEach(error => {
			text += `<span>${error}</span><br />`;
		});

		errorContainer.innerHTML = text;
	}

	/**
	 * get validation all form
	 */
	getValidation() {
		let isValid = true;

		this.validators.forEach(item => {
			let validator = new ValidatorsExpObj[item]();
			isValid = this.testValidator.call(this, validator);
		});
		return isValid;
	}

	/**
	 * get validation every item
	 */
	testValidator(validator){
		let isValid = true;

		if (!(validator.test(this.control.value))) {
			isValid = false;
			this.validationErrors.add(validator.toString());
		} else {
			this.validationErrors.delete(validator.toString());
		}
		return isValid;
	}
}
