import { Router } from './router';

class App {
	constructor() {
		this.articles = [];
		this.router = new Router();
		this.init();
		this._templateHtml = null;
	}

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
				window.dispatchEvent(new HashChangeEvent('hashchange'));
			});

	}

	initRoutes() {
		this.router.addRoute('', this.renderAllArticlesPage.bind(this));
		this.router.addRoute('404', this.renderErrorPage.bind(this));
		this.router.addRoute('#article', this.renderSinglePage.bind(this));
	}

	renderAllArticlesPage(exception) {
		this.generateArticlesHTML(this.articles, exception);
		document.querySelector('.all-articles').classList.add('visible');
	}

	renderSinglePage() {
		const page = document.querySelector('.single-article');
		const index = location.hash.split('#article/')[1].trim();

		if (this.articles.length) {
			this.articles.forEach((item) => {
				if (item.href === index) {
					page.querySelector('h1').innerText = item.title;
					page.querySelector('img').setAttribute('src', item.image.large);
					page.querySelector('p').innerText = item.content;
				}
			});
		}
		page.classList.add('visible');
		this.renderAllArticlesPage(index);
	}

	renderErrorPage() {
		const page = document.querySelector('.error');
		page.classList.add('visible');
	}

	generateArticlesHTML(data, except) {
		if (document.getElementById('articles-template')) {
			this._templateHtml = document.getElementById('articles-template').innerHTML;
		}

		const list = document.querySelector('.all-articles .articles-list');
		const template = Handlebars.compile(this._templateHtml );
		let html = '';

		data.forEach(item => {
			if(item.href !== except){
				html += template(item);
			}
		});

		list.innerHTML = html;
		this.processingLinks(list, 'li', 'article/');
	}

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