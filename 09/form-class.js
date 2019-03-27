function FormClassChanger(obj) {
	this.object = obj;

	this.addClass = function(classes) {
		try {
			if (!Array.isArray(classes)) {
				throw new Error('Param should be an array of strings');
			}

			let classList = this.object.classList;
			classes.forEach(function(item){
				if (classList.contains(String(item))) {
					return false;
				}

				classList.add(String(item));
			});
		} catch (e) {
			console.log(e.message);
			return false;
		}

	};

	this.removeClass = function(classes) {
		try {
			if (!Array.isArray(classes)) {
				throw new Error('Param should be an array of strings');
			}

			let classList = this.object.classList;
			console.log(classList);
			classes.forEach(function(item){
				if (classList.contains(String(item))) {
					classList.remove(String(item));
				}
				return true;

			});
		} catch (e) {
			console.log(e.message);
			return false;
		}

	};
}