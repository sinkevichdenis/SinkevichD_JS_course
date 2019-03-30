'use strict';

const SHOW_PLACE = document.querySelector('.weather_place');
const TITLE_PLACE = document.querySelector('.weather_title');
const KEY_ID = '595e9af527f3090cb8632eb0e4960744';
const URL = 'http://api.openweathermap.org/data/2.5/forecast';

const SEARCH_OBJ = {
	name: 'Гродно',
	param: [
		'lat=53.68',
		'lon=23.82',
		'cnt=10',
		'lang=ru',
		'units=metric',
		`APPID=${KEY_ID}`
	]
};

function createTitle(path, obj){
	path.innerHTML =  `Погода в ${SEARCH_OBJ.name} <br /> ${obj.dt_txt}`
}

function loadData(url, obj) {
	return function () {
		const xhr = new XMLHttpRequest();
		const path = url + '?' + obj.param.join('&');

		xhr.open('GET', path, true);
		xhr.send();

		xhr.onload = function() {
			renderData(JSON.parse(xhr.responseText), SHOW_PLACE);
		};
	};
}

function renderData(object, div) {
	let obj =object.list[5];
	createTitle(TITLE_PLACE, obj);

	div.innerHTML  = `
		<table class="weather_table">
			<tr><td>${obj.weather[0].description}</td></tr>
			<tr>
				<td>Температура </td><td>${obj.main.temp} C</td>
			</tr>
			<tr>
				<td>Влажность </td><td>${obj.main.humidity} %</td>
			</tr>
			<tr>
				<td>Ветер </td><td>${obj.wind.speed} м/с</td>
			</tr>
		</table>`;
}

let timer = new Timer(5000, 360);
document.addEventListener('DOMContentLoaded', timer.start(loadData(URL, SEARCH_OBJ)));

document.addEventListener('unload', function() {
	timer.stop();
	timer.setTime();
});
