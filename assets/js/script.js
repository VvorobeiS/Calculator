'use strict';

// Объявляем пременные
let money = 55000;
let income = 'фриланс';
let addExpenses = 'Гсм, Спортпит, Обучение';
let deposit = false;
let mission = 500000;
let period = 12;
let budgetDay = money / 30;

// Вызываем (alert)
alert('ДЗ сдано!');

// Перетираем значения объявленных переменных
money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью раходов.');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью раходов.');
let amount2 = +prompt('Во сколько это обойдется?');

// Объявляем-перетираем переменые
let budgetMonth = money - (amount1 + amount2);
let missionMonth = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth / 30);

// Передаем данные в консоль
console.log('ДЗ сдано!');
console.log('Период равен', period, 'месяцев и цель заработать', mission, 'рублей.');
console.log(budgetDay);
console.log(money);
console.log(addExpenses);
console.log(deposit);
console.log(expenses1);
console.log(amount1);
console.log(expenses2);
console.log(amount2);
console.log(budgetMonth);
console.log(missionMonth);
console.log(budgetDay);

// Конструкция условий
if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay === 1200) {
  console.log('Ваш уровень дохода выше среднего');
} else if (budgetDay > 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay === 600) {
  console.log('Ваш уровень дохода выше низкого');
} else if (budgetDay > 0) {
  console.log('К сожалению у вас уровень низкий уровень дохода');
} else {
  console.log('Что то пошло не так');
}

// Выводим тип данных в консоль
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// Выводим длину строки в консоль
console.log(addExpenses.length);

// Приводим строку к нижнему регистру, разбиваем на массив и выводим в консоль
console.log(addExpenses.toLowerCase().split(', '));
