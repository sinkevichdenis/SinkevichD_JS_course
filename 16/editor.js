class Editor {
	constructor(homeElem, selector) {
		this.editingElements = [...homeElem.querySelectorAll(selector)];
		if (!this.editingElements.length) {
			this.editingElements = [homeElem];
		}
		this.textarea = null;
		this.buffer = null;
		this.editingStatus = false;
		this.init();
	}

	init() {
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
		this.buffer = elem.innerHTML;
		this.editingStatus = true;

		this.textarea = document.createElement('textarea');
		this.textarea.style.width = (elem.clientWidth) ?  (elem.clientWidth + 'px') : '170px';
		this.textarea.style.height = (elem.clientHeight) ?  (elem.clientHeight + 'px') : '20px';

		this.textarea.value = this.buffer;
		elem.innerHTML = '';
		elem.appendChild(this.textarea);
		elem.insertAdjacentHTML('beforeEnd', this.createButtons());
		this.textarea.focus();
	}

	createButtons() {
		return '<div class="edit-controls">' +
			'<button class="edit-ok">OK</button>' +
			'<button class="edit-cancel">Cancel</button></div>';
	}

	endEdit(elem, flag) {
		flag ? (elem.innerHTML = this.textarea.value) : (elem.innerHTML = this.buffer);
		this.editingStatus = false;
	}

}

new Editor(document.getElementById('bagua-table'), 'tr');
new Editor(document.getElementById('bagua-table'), 'strong');