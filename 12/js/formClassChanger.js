export class FormClassChanger {
	constructor (obj, classes) {
		this.object = obj;
		this.classes = classes;
	}

	addClass() {
		try {
			if (!Array.isArray(this.classes)) {
				throw new Error('Param should be an array of strings');
			}

			let classList = this.object.classList;
			this.classes.forEach(function(item){
				if (classList.contains(String(item))) {
					return false;
				}

				classList.add(String(item));
			});
		} catch (e) {
			console.log(e.message);
			return false;
		}

	}

	removeClass() {
		try {
			if (!Array.isArray(this.classes)) {
				throw new Error('Param should be an array of strings');
			}

			let classList = this.object.classList;
			console.log(classList);
			this.classes.forEach(function(item){
				if (classList.contains(String(item))) {
					classList.remove(String(item));
				}
				return true;

			});
		} catch (e) {
			console.log(e.message);
			return false;
		}

	}
}