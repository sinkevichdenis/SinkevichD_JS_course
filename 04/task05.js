'use strict';

// create working object
/* global Shop */
let shop = new Shop();
shop.btnAdd.addEventListener('click', stopDefAction);
shop.btnAdd.addEventListener('click', addItem);

shop.btnCount.addEventListener('click', stopDefAction);
shop.btnCount.addEventListener('click', showCost);

shop.btnClear.addEventListener('click', stopDefAction);
shop.btnClear.addEventListener('click', clearList);

function stopDefAction(evt) {
	evt.preventDefault();
}

// если я подставляю shop.addItem или shop.countList в eventListener, то ничего не работает
function addItem() {
	shop.addItem();
}

function showCost() {
	shop.showCost();
}

function clearList() {
	shop.clearList();
}

