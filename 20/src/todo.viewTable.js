import { TemplateView } from './template.view';

export class TodoViewTable extends TemplateView {
	constructor(model, elements) {
		super(model, elements);

		super.createLists('div');
		super.onGeneralEvents();
		this.onRenderListsEvents();
	}

	onRenderListsEvents() {
		this._elements.activeList.addEventListener('change', e => {
			this.emit('todoListModified', e.target.dataset.index);
		});
		this._elements.archiveList.addEventListener('change', e => {
			this.emit('archiveListModified', e.target.dataset.index);
		});

		//console.log('table', this.getEvents());
	}

	createElement(selector, tag, id) {
		if (document.getElementById(id)){
			document.getElementById(id).remove();
		}

		let element = document.createElement(tag);
		element.setAttribute('id', id);
		element.setAttribute('style', 'width: 250px; min-height: 150px; background-color: red');
		document.querySelector(selector).insertAdjacentElement('afterbegin', element);
		return element;
	}

	rebuildList(place, items) {
		const div = place;
		items.forEach((item, index) => {
			let elem = document.createElement('input');
			elem.setAttribute('type', 'radio');
			elem.setAttribute('name', 'active');
			elem.setAttribute('data-index', index);

			let p = document.createElement('p');
			p.appendChild(elem);
			p.appendChild(document.createTextNode(item));

			div.insertAdjacentElement('beforeEnd', p);
		});
	}
}
