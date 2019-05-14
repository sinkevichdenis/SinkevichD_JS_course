export class EventEmiter {
	constructor() {
		this._events = {};
	}

	on(event, listener) {
		(this._events[event] || (this._events[event] = [])).push(listener);
		return this;
	}

	emit(event, arg) {
		(this._events[event] || []).forEach(listener => listener(arg));
		return this;
	}

	getEvents () {
		return this._events;
	}

	clearEvents () {
		console.log('before', this._events);
		//Object.keys(this._events).forEach(key => delete this._events[key]);
		delete this._events;
		this._events = {};
		console.log('after', this._events);
	}
}