function CommonValidator(msg) {
	this.errorMessage = msg || 'Common error message';
	this.toString = function() {
		return this.errorMessage;
	};
}

function Required() {
	CommonValidator.call(this, 'This field is required.');
	this.test = function(value) {
		return value.length > 0;
	};
}

function MinLength(value) {
	CommonValidator.call(this, 'Min length should be 7');
	this.test = function(value) {
		return value.length >= 7;
	};
}

function Email() {
	CommonValidator.call(this, 'Invalid e-mail address');
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	this.test = function(value) {
		return reg.test(value);
	};
}
