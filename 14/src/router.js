export class Router {
	constructor() {
		this.routes = {
		};
		this.mainContentPages = document.querySelectorAll('.main-content .page');

		window.addEventListener('hashchange', () => {
			this.render(decodeURI(window.location.hash));
			window.scrollTo(0, 0);
		});
	}

	addRoute(route, action) {
		this.routes[route] = action;
	}

	render(url) {
		let temp = url.split('/')[0];
		[...this.mainContentPages].forEach((page) => {
			page.classList.remove('visible');
		});

		this.routes[temp] ? this.routes[temp]() : this.routes['404']();
	}
}