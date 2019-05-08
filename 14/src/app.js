import { Router } from './router';

class App {
	constructor() {
		this.articles = [];
		this.router = new Router();
		this.init();
		this._templateHtml = null;
	}

	/**
	 * get data from json-server and init page
	 */
	init(){
		fetch('http://localhost:3006/articles', {
			headers: {
				'Content-Type': 'application-json'
			}
		})
			.then(response => response.json())
			.then(data => {
				this.articles = data;
				this.initRoutes();
				this.initSearch();
				this.processingLinks(document.querySelector('.navigation'), '[data-href]', '');
				window.dispatchEvent(new HashChangeEvent('hashchange'));
			});

	}

	initRoutes() {
		this.router.addRoute('', this.renderAllArticlesPage.bind(this, item => item));
		this.router.addRoute('#article', this.renderSinglePage.bind(this));
		this.router.addRoute('#search', this.renderSearchPage.bind(this));
		this.router.addRoute('404', this.renderOtherPage.bind(this, '.error'));
		this.router.addRoute('#about', this.renderOtherPage.bind(this, '.about'));
	}

	/**
	 * init search process
	 */
	initSearch() {
		const input = document.getElementById('search');
		let timerId;

		input.addEventListener('input', (event) => {
			timerId && clearInterval(timerId);
			timerId = setTimeout(() => {
				window.location.hash = `#search/${event.target.value.trim()}`;
			}, 200);
		});

		window.addEventListener('hashchange', () => {
			if (!window.location.hash.includes('#search')) {
				input.value = '';
			} else {
				input.value = decodeURI(window.location.hash.split('#search/')[1]);
			}

			if (input.value === '' && window.location.hash === '#search/') {
				window.location.hash = '';
			}
		});

/*		input.addEventListener('blur', () => {
			if (input.value === '' && window.location.hash === '#search/') {
				window.location.href = window.location.origin;
			}
		});*/
	}

	/**
	 * filter articles to render
	 * @param fn
	 * @returns {*[]}
	 */
	filterArticleList(fn) {
		let data = [...this.articles];
		data = data.filter(fn);

		if (data.length === 0) {
			this.renderOtherPage('.error');
		}

		return data;
	}

	renderAllArticlesPage(fn) {
		this.generateArticlesHTML(this.filterArticleList(fn));
		document.querySelector('.all-articles').classList.add('visible');
	}

	renderSinglePage() {
		const page = document.querySelector('.single-article');
		const index = location.hash.split('#article/')[1].trim();
		let currentArticle = null;

		if (this.articles.length) {
			currentArticle = this.articles.filter((item) => {
				return item.href === index;
			});
		}

		if (currentArticle.length !== 0){
			page.querySelector('h1').innerText = currentArticle[0].title;
			page.querySelector('img').setAttribute('src', currentArticle[0].image.large);
			page.querySelector('p').innerText = currentArticle[0].content;
			page.classList.add('visible');
			this.renderAllArticlesPage(elem => !elem.href.includes(index));
		} else {
			this.renderOtherPage('.error');
		}
	}

	renderSearchPage() {
		let tmp = window.location.hash.split('#search/')[1];
		tmp = decodeURI(tmp).toLowerCase().trim();

		this.renderAllArticlesPage(item => item.title.toLowerCase().includes(tmp));
	}

	renderOtherPage(selector) {
		const page = document.querySelector(selector);
		page.classList.add('visible');
	}

	/**
	 * generate articles HTML from template
	 * @param {array} data
	 */
	generateArticlesHTML(data) {
		if (document.getElementById('articles-template')) {
			this._templateHtml = document.getElementById('articles-template').innerHTML;
		}

		const list = document.querySelector('.all-articles .articles-list');
		const template = Handlebars.compile(this._templateHtml );
		let html = '';

		data.forEach(item => html += template(item));
		list.innerHTML = html;
		this.processingLinks(list, 'li', 'article/');
	}

	/**
	 * processing links and renew hash
	 * @param elem
	 * @param selector
	 * @param prefix
	 */
	processingLinks(elem, selector, prefix) {
		elem.querySelectorAll(selector).forEach((item) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.hash = `${prefix}${item.dataset.href}`;
			});
		});
	}
}

new App();