'use strict';
/* global moment */

(function() {
	let place = document.getElementById('showResult');
	const Users = [
		{
			id: '1', name: 'Nina', dob: '1985-03-01'
		},
		{
			id: '2', name: 'Alex', dob: '1989-04-21'
		},
		{
			id: '15', name: 'Андрей', dob: '1980-10-15'
		},
		{
			id: '9', name: 'Ivan', dob: '1992-01-10'
		},
		{
			id: '10', name: 'Zina', dob: '1999-07-25'
		},
		{
			id: '7', name: 'Николай', dob: '2000-09-20'
		},
	];

	/**
	 * sort arr of objects about object's key
	 * @param arr - working array
	 * @param key - choose sorting object's keys ('id' | 'name' | 'dob')
	 * @param dir - choose sorting direction ('asc' | 'desc')
	 * @returns {*} return array
	 */
	function usersSort(arr, key, dir = 'asc') {
	//  param1 = Users, key = 'id' | 'name' | 'dob', dir = 'asc' | 'desc'
		let users = arr.slice(0);

		let typeSort = function (a, b) {
			switch (key) {
			case 'id':
				return a[key] - b[key];
			case 'name':
				if (a[key] > b[key]) return 1;
				if (a[key] < b[key]) return -1;
				break;
			case 'dob':
				if (moment(a[key]) > moment(b[key])) return 1;
				if (moment(a[key]) < moment(b[key])) return -1;
				break;
			}
		};

		users = users.sort(typeSort);
		if (dir !== 'asc') {
			return users.reverse();
		}
		return users;
	}

	/**
	 * transform result array into string
	 * @param arr
	 * @returns {string}
	 */
	function toTextResult(arr) {
		let result = arr.map((item) => JSON.stringify(item));
		return result.join('<br>');
	}

	place.innerHTML = 'Результаты сортировки:'
		+ '<br><br> (Users, \'name\', \'asc\') <br>'
		+ toTextResult( usersSort(Users, 'name', 'asc'))
		+ '<br><br> (Users, \'id\', \'desc\') <br>'
		+ toTextResult( usersSort(Users, 'id', 'desc'))
		+ '<br><br> (Users, \'dob\', \'asc\') <br>'
		+ toTextResult( usersSort(Users, 'dob', 'asc'));

})();