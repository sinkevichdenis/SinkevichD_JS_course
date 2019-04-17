export class FormGroup {
	constructor(id, helper) {
		this.helper = helper;
		this.formControls = [];
		this.isValid = this.getStatus.bind(this)();
		this.form = document.getElementById(id);

		this._init.bind(this)();
	}

	registerControls (control) {
		this.formControls.push(control);
	}

	_init() {
		let classChanger = new this.helper(this.form, ['error']);

		this.form.addEventListener('submit', event => {
			event.preventDefault();

			this.isValid = this.getStatus();
			if (this.isValid) {
				classChanger.removeClass();
				console.log('Data was sent');
				return true;
			}

			console.log('Form is not valid');
			classChanger.addClass();
			this.formControls.forEach(control => {
				control.startCheck();
			});

			return false;
		});
	}

	getStatus() {
		try {
			if(this.formControls.length === 0) {
				throw new Error('No detected form control elements');
			}

			let status = true;
			console.log(this.formControls);
			this.formControls.forEach(item => {
				if (!item.isValid) {
					status = false;
					return false;
				}
			});

			return status;

		} catch(e) {
			console.log(e.message);
			return true;
		}
	}
}