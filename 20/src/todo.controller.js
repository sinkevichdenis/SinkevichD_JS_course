export class TodoController {
	constructor(model, view) {
		this._model = model;
		this._view = view;
		console.log('controller');
		this.onEvents();
	}

	onEvents() {
		this._view.clearEvents();
		this._view.on('todoListModified', idx => this.updateSelected(idx));
		this._view.on('archiveListModified', idx => this.updateSelected(idx, 'archive'));
		this._view.on('addButtonClicked', () => this.addItem());
		this._view.on('delButtonClicked', () => this.delItem(this._model.selectedIndex));
		this._view.on('modButtonClicked', () => this.modifyItem());
		this._view.on('completeButtonClicked', () => {
			console.log('COUNTLOOP');
			this.completeItem();
		});
		this._view.on('remakeButtonClicked', () => this.remakeItem());
		console.log('controlEvent',this._view.getEvents());
		this._view.show();
	}

	addItem(prevItem) {
		let text = '';
		prevItem ? text = 'Change item:' : text = 'Add item:';
		const item = window.prompt(text, prevItem);
		if (item) {
			this._model.addItem(item);
		}
	}

	delItem(index, flag) {
		if (index !== -1) {
			return this._model.removeItemAt(index, flag);
		}
	}

	modifyItem() {
		const index = this._model.selectedIndex;

		if (index !== -1) {
			const item = this._model.removeItemAt(index);
			this.addItem(item);
		}
	}

	completeItem() {
		if (this._model.selectedIndex !== -1) {
			let item = this.delItem(this._model.selectedIndex);
			this._model.addItem(item, 'archive');
			this._model.selectedIndex = -1;
		}
	}

	remakeItem() {
		if (this._model.archiveSelectedIndex !== -1) {
			let item = this.delItem(this._model.archiveSelectedIndex, 'archive');
			this._model.addItem(item);
			this._model.archiveSelectedIndex = -1;
		}
	}

	updateSelected(index, flag) {
		if (flag) {
			this._model.archiveSelectedIndex = index;
		} else {
			this._model.selectedIndex = index;
		}
	}
}

