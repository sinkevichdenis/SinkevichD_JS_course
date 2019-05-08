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
				this.processingLinks(document.querySelector('.navigation'), '[data-href]', '');
				window.dispatchEvent(new HashChangeEvent('hashchange'));
			});

	}

	initRoutes() {
		this.router.addRoute('', this.renderAllArticlesPage.bind(this));
		this.router.addRoute('#article', this.renderSinglePage.bind(this));
		this.router.addRoute('404', this.renderOtherPage.bind(this, '.error'));
		this.router.addRoute('#about', this.renderOtherPage.bind(this, '.about'));
	}

	/**
	 * create list of articles for render
	 * @returns {*[]}
	 */
	createArticlesList() {
		let data = [...this.articles];
		let exceptHref = [...arguments];
		return data.filter(item => {
			return !exceptHref.includes(item.href);
		});
	}

	renderAllArticlesPage(exceptions) {
		this.generateArticlesHTML(this.createArticlesList(exceptions));
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
			this.renderAllArticlesPage(index);
		} else {
			this.renderErrorPage();
		}
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
		console.log(elem);
		elem.querySelectorAll(selector).forEach((item) => {
			item.addEventListener('click', (event) => {
				console.log(item);
				event.preventDefault();
				window.location.hash = `${prefix}${item.dataset.href}`;
			});
		});
	}

}

new App();