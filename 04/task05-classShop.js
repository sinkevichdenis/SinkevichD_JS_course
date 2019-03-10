'use strict';

/**
 * create main class
 * @constructor
 */
function Shop() {
	this.btnAdd = document.querySelector('.button_add');
	this.btnCount = document.querySelector('.button_count');
	this.btnClear = document.querySelector('.button_clear');
	this.item = document.querySelector('.input_item');
	this.unit = document.querySelector('.input_unit');
	this.number = document.querySelector('.input_number');
	this.unitNumber = document.querySelector('.input_unit-number');
	this.cost = document.querySelector('.input_cost');
	this.placeId = document.querySelector('.input_id');
	this.id = 0;
	this.productList = [];
}

/**
 * add new product in list
 */
Shop.prototype.addItem = function () {
	let itemToList = {
		'id': this.id++,
		'item': this.item.value,
		'unit': this.unit.value,
		'unitNumber': this.unitNumber.value,
		'number': this.number.value,
		'cost': this.cost.value,
	};
	this.productList.push(itemToList);
	this.renewId();
};

/**
 * renew id number
 */
Shop.prototype.renewId = function () {
	this.placeId.innerHTML = this.id;
};

/**
 * clear product's list
 */
Shop.prototype.clearList = function () {
	this.productList = [];
};

/**
 * count cost of all products
 * @returns {*|number}
 */
Shop.prototype.countCost = function () {
	return this.productList.reduce((acc, curr, index, item ) => {
		curr = item[index].unitNumber * item[index].number * item[index].cost;
		return acc + curr;
	}, 0);
};
/**
 * show result msg
 */
Shop.prototype.showCost = function () {
	let resultMsgArr;
	let resultMsg;
	let resultCost = this.countCost();

	resultMsgArr = this.productList.map((item, index) => {
		return `${index + 1}) ID: ${item.id}; `
		+ `Название: ${item.item}; `
		+ `Тип упаковки: ${showTypeUnit(item.unit)}; `
		+ `Кол-во упаковок: ${item.unitNumber}; `
		+ `Кол-во шт в 1 упаковке: ${item.number}; `
		+ `Цена за 1 шт: ${item.cost};\n`;
	});

	resultMsg = 'Список товаров: \n'
		+ `${resultMsgArr.join('\n')} \n`
		+ `Итоговая стоимость: ${resultCost}`;

	alert(resultMsg);
};

/**
 * choose variant of unit from code number
 * @param code - number
 * @returns {string}
 */
function showTypeUnit(code) {
	switch (+code) {
	case 1:
		return 'кг';
	case 2:
		return 'короб';
	case 3:
		return 'ящик';
	case 4:
		return 'мешок';
	default:
		return 'Неизвестен';
	}
}