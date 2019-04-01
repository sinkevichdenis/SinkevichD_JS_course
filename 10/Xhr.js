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
	 * @param paramObj
	 * @param func - callback function
	 * @returns {object}
	 */
	getData(paramObj, func) {
		const path = this.url + '?' + paramObj.param.join('&');

		super.open('GET', path, true);
		super.send();


		super.onload = () => {
			console.log(super.responseText);
			return func(JSON.parse(super.responseText));
		};
	}

	/**
	 * send data to server
	 * @param obj
	 * @param headers
	 */
	sendData(obj, headers = ['Content-Type', 'application/json']) {
		super.open('POST', this.url, true);
		super.setRequestHeader(...headers);
		super.send(JSON.stringify(obj));

		super.onreadystatechange = () => {
			if (super.readyState === 4 && super.status === 201) {
				console.log('Data was sent');
			}
		};
	}

	/**
	 * change data onserver
	 * @param id
	 * @param obj
	 * @param headers
	 */
	changeData(id, obj, headers = ['Content-Type', 'application/json']) {
		super.open('PUT', `${this.url}/${id}`, true);
		super.setRequestHeader(...headers);
		super.send(JSON.stringify(obj));

		super.onreadystatechange = () => {
			if (super.readyState === 4 && super.status === 201) {
				console.log('Data was changed');
			}
		};
	}

	/**
	 * delate data on server
	 * @param id
	 */
	deleteData(id) {
		super.open('DELETE', `${this.url}/${id}`, true);
		super.send();

		super.onreadystatechange = () => {
			if (super.readyState === 4 && super.status === 201) {
				console.log('Data was deleted');
			}
		};
	}
}