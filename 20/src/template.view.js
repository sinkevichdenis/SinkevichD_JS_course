import { EventEmiter } from './event-emiter';

export class TemplateView extends EventEmiter {
	constructor(model, elements) {
		super();
		this._model = model;
		this._elements = elements;
	}

	onGeneralEvents() {

		this._model.clearEvents();
		this._model.on('itemAdded', () => this.rebuildList(this._elements.activeList, this._model.getItems()));
		this._model.on('itemRemoved', () => this.rebuildList(this._elements.activeList, this._model.getItems()));
		this._model.on('archiveItemAdded', () => this.rebuildList(this._elements.archiveList, this._model.getArchiveItems()));
		this._model.on('archiveItemRemoved', () => this.rebuildList(this._elements.archiveList, this._model.getArchiveItems()));
		console.log('viewEvent', this._model.getEvents());

		this._elements.addButton.addEventListener('click', () => this.emit('addButtonClicked'));
		this._elements.modButton.addEventListener('click', () => this.emit('modButtonClicked'));
		this._elements.delButton.addEventListener('click', () => this.emit('delButtonClicked'));
		this._elements.completeButton.addEventListener('click', () => this.emit('completeButtonClicked'));
		this._elements.remakeButton.addEventListener('click', () => this.emit('remakeButtonClicked'));

		//console.log('temple', this.getEvents());
	}

	createLists(tag) {
		this._elements['activeList'] = this.createElement('.active-container', tag, 'activeList');
		this._elements['archiveList'] = this.createElement('.archive-container', tag, 'archiveList');
	}

	show() {
		this.rebuildList(this._elements.activeList, this._model.getItems());
		this.rebuildList(this._elements.archiveList, this._model.getArchiveItems());
	}
}
