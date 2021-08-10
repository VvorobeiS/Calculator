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

// Добавляем объект
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  budget: money,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    // Узнаем расходы
    appData.addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'Одежда, спортинвертарь, отдых'
    );
    appData.addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expenses;
    let amount = 0;
    for (let i = 0; i < 2; i++) {
      expenses = prompt('Введите обязательную статью раходов.');
      amount = prompt('Во сколько это обойдется?', 5000);
      while (!isNumber(amount)) {
        amount = prompt('Во сколько это обойдется?', 5000);
      }
      appData.expenses[expenses] = Number(amount);
    }
  },
  getExpensesMonth: function () {
    // Получаем сумму расходов за месяц
    for (let num in appData.expenses) {
      appData.expensesMonth += appData.expenses[num];
    }
    return appData.expensesMonth;
  },
  getAccumulatedMonth: function () {
    // Вычисляем бюджет на месяц
    return money - appData.expensesMonth;
  },
  getBudget: function () {
    // Вычисляем бюджет на день
    appData.budgetDay = Math.floor(appData.getAccumulatedMonth() / 30);
  },
  getTargetMonth: function () {
    // Вычиялем количество месяцев для достижения цели
    let targetMonth = Math.ceil(appData.mission / appData.getAccumulatedMonth());
    if (targetMonth > 0) {
      return `Цель будет достигнута за ${targetMonth} месяцев`;
    } else {
      return 'Цель не будет достигнута';
    }
  },
  getStatusIncome: function () {
    // Узнаем уровень дохода
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay > 0) {
      return 'К сожалению у вас уровень низкий уровень дохода';
    } else {
      return 'Что то пошло не так';
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getAccumulatedMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// Выводим все данные в консоль;
console.log('Cумма всех обязательных расходов за месяц:', appData.expensesMonth);
console.log('Цель:', appData.getTargetMonth());
console.log('Уровень дохода:', appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ' ' + appData[key]);
}
