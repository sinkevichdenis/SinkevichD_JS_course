class Editor {
	constructor(homeElem, selector) {
		this.editCondition = {
			homeElem: homeElem,
			selector: selector,
		};
		this.textarea = null;
		this.buffer = null;
		this.editingStatus = false;
		this.init();
		this.makeObserve(this.editCondition.homeElem);
	}

	updateCondition(condition) {
		this.editingElements = [...condition.homeElem.querySelectorAll(condition.selector)];
		if (!this.editingElements.length) {
			this.editingElements = [condition.homeElem];
		}
	}

	init() {
		this.updateCondition(this.editCondition);
		this.editingElements.forEach(elem => {
			elem.addEventListener('click', (event) => {
				event.stopPropagation();
				!this.editingStatus && this.makeEditable(elem);

				if (event.target.className === 'edit-cancel') {
					this.endEdit(elem, false);
					return false;
				}

				if (event.target.className === 'edit-ok') {
					this.endEdit(elem, true);
					return false;
				}
			});
		});
	}

	makeEditable(elem) {
		elem.classList.add('edit-td');
		this.buffer = elem.innerHTML;
		this.editingStatus = true;

		this.textarea = document.createElement('textarea');
		this.textarea.style.width = (elem.clientWidth) ?  (elem.clientWidth + 'px') : '170px';
		this.textarea.style.height = (elem.clientHeight) ?  (elem.clientHeight + 'px') : '20px';

		this.textarea.value = this.buffer;
		elem.innerHTML = '';

		let td = document.createElement('td');
		td.setAttribute('colspan', 3);
		td.appendChild(this.textarea);
		td.insertAdjacentHTML('beforeEnd', this.createButtons());

		elem.appendChild(td);
		this.textarea.focus();
	}

	createButtons() {
		return '<div class="edit-controls">' +
			'<button class="edit-ok">OK</button>' +
			'<button class="edit-cancel">Cancel</button></div>';
	}

	endEdit(elem, flag) {
		flag ? (elem.innerHTML = this.textarea.value) : (elem.innerHTML = this.buffer);
		elem.classList.remove('edit-td');
		this.editingStatus = false;
	}

	makeObserve(target){
		const observer = new MutationObserver(() => this.init());
		const config = {
			subtree: true,
			attributes: true,
			childList: true,
			characterData: true,
		};
		observer.observe(target, config);
	}
}
new Editor(document.getElementById('bagua-table'), 'tr');
new Editor(document.getElementById('bagua-table'), 'strong');