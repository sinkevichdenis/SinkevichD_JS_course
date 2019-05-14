import { TemplateView } from './template.view';

export class TodoView extends TemplateView{
	constructor(model, elements) {
		super(model, elements);

		super.createLists('select');
		super.onGeneralEvents();
		this.onRenderListsEvents();
	}

	onRenderListsEvents() {
		this._elements.activeList.addEventListener('change', e => {
			this.emit('todoListModified', e.target.selectedIndex);
		});
		this._elements.archiveList.addEventListener('change', e => {
			this.emit('archiveListModified', e.target.selectedIndex);
		});

		//console.log('todo', this.getEvents());
	}

	createElement(selector, tag, id) {
		if (document.getElementById(id)){
			document.getElementById(id).remove();
		}

		let element = document.createElement(tag);
		element.setAttribute('id', id);
		element.setAttribute('size', 10);
		document.querySelector(selector).insertAdjacentElement('afterbegin', element);
		return element;
	}

	rebuildList(place, items) {
		const list = place;
		list.options.length = 0;
		items.forEach(item => list.options.add(new Option(item)));
	}
}
