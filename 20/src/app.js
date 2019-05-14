import { TodoModel } from './todo.model';
import { TodoView } from './todo.view';
import { TodoController } from './todo.controller';
import { TodoViewTable } from './todo.viewTable';

window.addEventListener('load', () => {
	let getElem = function (id) {
		return document.getElementById(id);
	};

	const config = {
		activeList: null,
		archiveList: null,
		changeView: getElem('tableViewInput'),

		addButton: getElem('addBtn'),
		modButton: getElem('modifyBtn'),
		delButton: getElem('deleteBtn'),
		completeButton: getElem('completeBtn'),
		remakeButton: getElem('remakeBtn'),
	};

	const model = new TodoModel(
		['Make todo-list', 'Make final project', 'Do one more cup of coffee', 'Don\'t go crazy'],
		['Do cup of coffee']
	);

	let render = function() {
		let view = (config.changeView.checked) ?  new TodoViewTable(model, config) : new TodoView(model, config);
		const controller = new TodoController(model, view);
	};

	render();

	config.changeView.addEventListener('click', () => {
		render();
	});

});
