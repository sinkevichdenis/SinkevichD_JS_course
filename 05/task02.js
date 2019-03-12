'use strict';
/* global moment */

(function () {
	let input = document.getElementById('input_nextBirthday');
	let text = document.getElementById('text_nextBirthday');
	let nowYear;
	let nextBdTime;

	/**
	 *  return date of next birthday
	 * @returns {*|moment.Moment|number}
	 */
	function countNextBirthday() {
		nowYear = moment().year();
		nextBdTime = moment(input.value).year(nowYear);

		if(moment().diff(nextBdTime) > 0) {
			nextBdTime = nextBdTime.add(1, 'y');
		}

		return nextBdTime;
	}

	/**
	 * show number of days until next birthday
	 */
	function showNextBd() {
		let result;
		nextBdTime = countNextBirthday();

		result = moment().diff(nextBdTime);

		if (isNaN(result)) {
			text.innerHTML = 'Your enter invalid date';
			return;
		}

		result = Math.ceil( Math.abs (moment.duration( result ).as('day') ));

		if (result > 365 ) {
			text.innerHTML = 'There is your Birthday today! Congratulations!';
			return;
		}

		text.innerHTML = `Until your birthday remains ${result} days.`;
	}


	input.addEventListener('blur', showNextBd);
	input.addEventListener('change', showNextBd);
})();
