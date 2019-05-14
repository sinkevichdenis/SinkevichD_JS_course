import { EventEmiter } from './event-emiter';

export class TodoModel extends EventEmiter {
	constructor(items, archiveItems) {
		super();
		this._items = items || [];
		this._archiveItems = archiveItems || [];
		this.selectedIndex = -1;
		this.archiveSelectedIndex = -1;
	}

	getItems() {
		return this._items;
	}

	getArchiveItems () {
		return this._archiveItems;
	}

	addItem(item, flag) {
		if (flag) {
			this._archiveItems.push(item);
			this.emit('archiveItemAdded', item);
		} else {
			this._items.push(item);
			this.emit('itemAdded', item);
		}
	}

	removeItemAt(index, flag) {
		let item;

		if (flag) {
			item = this._archiveItems.splice(index, 1)[0];
			this.emit('archiveItemRemoved', item);
		} else {
			item = this._items.splice(index, 1)[0];
			this.emit('itemRemoved', item);
		}
		return item;
	}

}