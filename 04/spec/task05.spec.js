'use strict';
/**
 * create example of form to work tests with focus() and select()
 */
(function createForm() {
	document.write(`<form class="form" style="display: none;">
        <label>
            <span> ID </span><span class="input_id">0 </span>
        </label>
        <label>
            <span> Название </span>
            <input  class="input_item"
                    size="20">
        </label>
        <label>
            <span> Единица упаковки *</span>
            <input class="input_unit"
                   type="number"
                   size="10">
        </label>
        <label>
            <span> Кол-во упаковок </span>
            <input class="input_unit-number"
                   type="number"
                   size="10">
        </label>
        <label>
            <span> Штук в упаковке </span>
            <input class="input_number"
                   type="number"
                   size="10">
        </label>
        <label>
            <span> Цена за штуку </span>
            <input class="input_cost"
                   type="number"
                   size="10">
        </label>
        <div><br />
            Единицы упаковки (введите номер): <br />
            1 - кг <br />
            2 - коробка <br />
            3 - ящик <br />
            4 - мешок <br />
        </div>
        <div>
            <button class="button_add">Add item <br /> (ex. 5)</button>
            <button class="button_clear">Clear list <br /> (ex. 5)</button>
            <button class="button_count">Count all (ex. 5)</button>
        </div>
    </form>`);
})();

describe('task05-classShop.js -> Shop.prototype.addItem -> add new product in list', function() {
	let shop;

	beforeEach(function () {
		/* global Shop */
		shop = new Shop();
	});

	it('should add items in list', function () {
		spyOn(shop, 'renewId');
		shop.addItem();
		shop.addItem();
		expect(shop.productList.length).toEqual(2);
	});

	it('should renew ID', function () {
		spyOn(shop, 'renewId');
		shop.addItem();
		shop.addItem();
		shop.addItem();
		expect(shop.renewId).toHaveBeenCalledTimes(3);
	});
});

describe('task05-classShop.js -> Shop.prototype.showCost -> show result msg', function() {
	let shop;

	beforeEach(function () {
		/* global Shop */
		shop = new Shop();
	});

	it('show result msg ', function () {
		spyOn(window, 'alert');
		shop.showCost();
		expect(alert).toHaveBeenCalled();
	});

});

describe('task05-classShop.js -> Shop.prototype.countCost -> count cost of all products', function() {
	let shop;

	beforeEach(function () {
		/* global Shop */
		shop = new Shop();

		shop.productList = [{
			'id': 0,
			'item': 'ete',
			'unit': 1,
			'unitNumber': 2,
			'number': 10,
			'cost': 10,
		}, {
			'id': 1,
			'item': 'tet',
			'unit': 2,
			'unitNumber': 2,
			'number': 5,
			'cost': 5,
		}];
	});

	it('count cost of all products', function () {
		expect(shop.countCost()).toEqual(250);
	});
});