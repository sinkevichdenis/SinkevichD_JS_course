'use strict';

/**
 * class of methods to work with distance server
 */
class Xhr extends XMLHttpRequest {
	constructor (url) {
		super();

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
		super.open('GET', path, true);
		super.send();

		super.onload = () => {
			console.log(super.responseText);
			return func(JSON.parse(super.responseText));
		};
	}

	/**
	 * send data to server
	 * @param obj {object} - data for sending
	 * @param contentType - type of encoding
	 * @param isAllowCred {boolean} - allow to send user's cookie
	 */
	post(obj, contentType = 'application/json', isAllowCred = false) {
		super.open('POST', this.url, true);
		super.setRequestHeader('Content-Type', contentType);
		super.withCredentials = isAllowCred;
		super.send(JSON.stringify(obj));

		super.onreadystatechange = () => {
			if (super.readyState === 4 && super.status === 201) {
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

		super.open('POST', this.url, true);
		super.send(formData);


		super.onreadystatechange = () => {
			if (super.readyState === 4 && super.status === 201) {
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
		super.open('PUT', `${this.url}/${id}`, true);
		super.setRequestHeader('Content-Type', contentType);
		super.send(JSON.stringify(obj));

		super.onload = () => {
			if (super.readyState === 4 && super.status === 201) {
				console.log('Data was changed');
			}

			if (func) {
				return func(JSON.parse(super.responseText));
			}
		};
	}

	/**
	 * delate data on server
	 * @param id
	 * @param func
	 */
	delete(id, func) {
		super.open('DELETE', `${this.url}/${id}`, true);
		super.send();

		super.onload = () => {
			if (super.readyState === 4 && super.status === 201) {
				console.log('Data was deleted');
			}

			if (func) {
				return func(JSON.parse(super.responseText));
			}
		};
	}
}