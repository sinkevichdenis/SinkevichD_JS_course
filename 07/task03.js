'use strict';

const elem = document.getElementById('elem');

function func(surname, name) {
	alert(this.value + ', ' + surname + ' ' + name);
}

func = func.bind(elem);

func('Иванов', 'Иван'); //тут должно вывести 'привет, Иванов Иван'
func('Петров', 'Петр'); //тут должно вывести 'привет, Петров Петр'
