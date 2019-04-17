/**
 * class of methods to work with distance server
 */
export class Xhr {
	constructor (url) {
		this.super = new XMLHttpRequest();

		if (url) {
			this.url = url;
		} else {
			throw new Error('URL didn\'t found');
		}
	}

	/**
	 * get data from server
	 * @param paramObj {object} - object with parameters for URL (e.g.{name: '', param: ['lat=53.68']})
	 * @param func - callback function for working with response object
	 * @returns {object}
	 */
	get(paramObj, func) {
		const path = this.url + '?' + paramObj.param.join('&')
		this.super.open('GET', path, true);
		this.super.send();

		this.super.onload = () => {
			console.log(this.super.responseText);
			return func(JSON.parse(this.super.responseText));
		};
	}

	/**
	 * send data to server
	 * @param obj {object} - data for sending
	 * @param contentType - type of encoding
	 * @param isAllowCred {boolean} - allow to send user's cookie
	 */
	post(obj, contentType = 'application/json', isAllowCred = false) {
		this.super.open('POST', this.url, true);
		this.super.setRequestHeader('Content-Type', contentType);
		this.super.withCredentials = isAllowCred;
		this.super.send(JSON.stringify(obj));

		this.super.onreadystatechange = () => {
			if (this.super.readyState === 4 && this.super.status === 201) {
				console.log('Data was sent');
			}
		};
	}

	/**
	 * send form's data to server
	 * @param form - form as DOM-element
	 * @param addObj {object} - object with additional key-value
	 */
	postForm(form, addObj) {
		let formData = new FormData(form);

		if (addObj && typeof addObj === 'object') {
			for (let key in addObj) {
				if (addObj.hasOwnProperty(key)) {
					formData.append(key, addObj[key]);
				}
			}
		}

		this.super.open('POST', this.url, true);
		this.super.send(formData);


		this.super.onreadystatechange = () => {
			if (this.super.readyState === 4 && this.super.status === 201) {
				console.log('Form\'s data was sent');
			}
		};
	}

	/**
	 * change data onserver
	 * @param id
	 * @param obj
	 * @param contentType - type of encoding
	 * @param func
	 */
	put(id, obj, contentType = 'application/json',  func) {
		this.super.open('PUT', `${this.url}/${id}`, true);
		this.super.setRequestHeader('Content-Type', contentType);
		this.super.send(JSON.stringify(obj));

		this.super.onload = () => {
			if (this.super.readyState === 4 && this.super.status === 201) {
				console.log('Data was changed');
			}

			if (func) {
				return func(JSON.parse(this.super.responseText));
			}
		};
	}

	/**
	 * delete data on server
	 * @param id
	 * @param func
	 */
	delete(id, func) {
		this.super.open('DELETE', `${this.url}/${id}`, true);
		this.super.send();

		this.super.onload = () => {
			if (this.super.readyState === 4 && this.super.status === 201) {
				console.log('Data was deleted');
			}

			if (func) {
				return func(JSON.parse(this.super.responseText));
			}
		};
	}
}