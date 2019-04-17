/**
 * class of methods to work with distance server
 */
export class Xhr {
	constructor (url) {
		if (url) {
			this.url = url;
		} else {
			throw new Error('URL didn\'t found');
		}
	}

	/**
	 * check request status
	 */
	_status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(new Error(response.statusText));
		}
	}

	/**
	 * get data from server
	 * @param paramObj {object} - object with parameters for URL (e.g.{name: '', param: ['lat=53.68']})
	 * @param func - callback function for working with response object
	 * @returns {object}
	 */
	get(paramObj, func) {
		const path = this.url + '?' + paramObj.param.join('&');
		fetch(path)
			.then(this._status)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				return func(data);
			})
			.catch(err => console.log('Fetch Error', err));
	}


	/**
	 * send data to server
	 * @param obj {object} - data for sending
	 * @param contentType - type of encoding
	 * @param isAllowCred {boolean} - allow to send user's cookie
	 */
	post(obj, contentType = 'application/json', isAllowCred = false) {
		let descObj = {
			method: 'post',
			headers: {
				'Content-type': contentType
			},
			body: obj,
			credentials: isAllowCred
		};

		fetch(this.url, descObj)
			.then(this._status)
			.then(() => console.log('Data was sent'))
			.catch(err => console.log('Request failed', err));
	}

	/**
	 * change data onserver
	 * @param id
	 * @param obj
	 * @param contentType - type of encoding
	 * @param func
	 */
	put(id, obj, contentType = 'application/json',  func) {
		let descObj = {
			method: 'put',
			headers: {
				'Content-type': contentType
			},
			body: obj
		};

		fetch(`${this.url}/${id}`, descObj)
			.then(this._status)
			.then(response => {
				console.log('Data was changed');
				if (func) {
					return func(response.json());
				}
			})
			.catch(err => console.log('Request failed', err));
	}

	/**
	 * delete data on server
	 * @param id
	 * @param func
	 */
	delete(id, func) {
		let descObj = {
			method: 'delete'
		};

		fetch(`${this.url}/${id}`, descObj)
			.then(this._status)
			.then(response => {
				console.log('Data was deleted');
				if (func) {
					return func(response.json());
				}
			})
			.catch(err => console.log('Request failed', err));
	}
}
