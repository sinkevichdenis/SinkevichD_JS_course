'use strict';

// create working object
let form = new Form();
form.buttonCheck.addEventListener('click', stopDefAction);
form.buttonCheck.addEventListener('click', isFormEnd);

form.buttonShow.addEventListener('click', stopDefAction);
form.buttonShow.addEventListener('click', showData);

function stopDefAction(evt) {
	evt.preventDefault();
}

// если я подставляю form.showProfile или form.isFormComplited в eventListener, то ничего не работает
function showData() {
	form.showProfile();
}

function isFormEnd() {
	form.isFormComplited();
}
