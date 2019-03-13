'use strict';

function sequence(start, step) {
	let counter = start || 0;
	let num = step || 1;
	let checkCall = 0;

	return function () {
		if(checkCall++) {
			return counter += num;
		} else {
			return counter;
		}
	};
}

let generator = sequence(10, 3);
let generator2 = sequence(7, 1);

console.log('tast01 sequence(10, 3)', generator()); // 10
console.log('tast01 sequence(10, 3)', generator()); // 13
console.log('tast01 sequence(10, 3)', generator()); // 16
console.log('tast01 sequence(10, 3)', generator()); // 19
console.log('tast01 sequence(7, 1)', generator2()); // 7
console.log('tast01 sequence(7, 1)', generator2()); // 8
console.log('tast01 sequence(7, 1)', generator2()); // 9