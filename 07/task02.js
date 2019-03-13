'use strict';

function mult(a, b, c, d) {
	return a * b * c * d ;
}

function partitial(func, ...partialArgs) {
	return function(...args) {
		return func.apply(this, partialArgs.concat(args));
	};
}

console.log(mult(2, 3, 4, 5)); // 120
let mult23 = partitial(mult, 2, 3);
console.log(mult23(4, 5)); //120
