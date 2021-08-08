'use strict';

// Функция для проверки введеного типа данных
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Получаем месячный доход
let money;
const start = function () {
  do {
    money = prompt('Ваш месячный доход?', 55000);
  } while (!isNumber(money));

  return money;
};
money = start();

// Узнаем о наличии депозита
let deposit = confirm('Есть ли у вас депозит в банке?');

// Узнаем возможные расходы
let addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую',
  'Одежда, спортинвертарь, отдых'
);

// Объявляем пременные
let income = 'фриланс';
let mission = 500000;
let period = 12;
let expenses = [];

// Выводим тип данных в консоль
const showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(income);
showTypeOf(deposit);

// Приводим строку к нижнему регистру, разбиваем на массив и выводим в консоль
console.log(addExpenses.toLowerCase().split(', '));

// Получаем обязательные статьи расходов и их сумму
const getExpensesMonth = function () {
  let num = 0;
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью раходов.');
    num = prompt('Во сколько это обойдется?', 5000);
    while (!isNumber(num)) {
      num = prompt('Во сколько это обойдется?', 5000);
    }
    sum += Number(num);
  }
  return sum;
};
let expensesAmount = getExpensesMonth();

// Вычисляем бюджет на месяц
const getAccumulatedMonth = function () {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

// Вычисляем бюджет на день
let budgetDay = Math.floor(accumulatedMonth / 30);

// Вычиялем количество месяцев для достижения цели
let targetMonth = Math.ceil(mission / accumulatedMonth);
const getTargetMonth = function () {
  if (targetMonth > 0) {
    return 'Цель будет достигнута за ' + targetMonth + ' месяцев';
  } else {
    return 'Цель не будет достигнута';
  }
};

// Узнаем уровень дохода
const getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budgetDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (budgetDay > 0) {
    return 'К сожалению у вас уровень низкий уровень дохода';
  } else {
    return 'Что то пошло не так';
  }
};

// Узнаем о достижении цели

// Выводим все данные в консоль
console.log(money);
console.log(expenses);
console.log(expensesAmount);
console.log(accumulatedMonth);
console.log(budgetDay);
console.log(getTargetMonth());
console.log(getStatusIncome());
