let money = 55000;
let income = 'фриланс';
let addExpenses = 'Гсм, Спортпит, Обучение';
let deposit = false;
let mission = 500000;
let period = 12;
let budgetDay = money / 30;

// Вызываем (alert)
alert('ДЗ сдано!');

// Передаем сообщение в консоль
console.log('ДЗ сдано!');
console.log('Период равен', period, 'месяцев и цель заработать', mission, 'рублей.');
console.log(budgetDay);

// Выводим тип данных в консоль
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// Выводим длину строки в консоль
console.log(addExpenses.length);

// Приводим строку к нижнему регистру, разбиваем на массив и выводим в консоль
console.log(addExpenses.toLowerCase().split(', '));
