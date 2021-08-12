'use strict';

let btnCalculate = document.getElementById('start');
let btnIncomeAdd = document.getElementsByTagName('button')[0];
let btnExpensesAdd = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
let valueBudgetMonth = document.getElementsByClassName('result-total')[0];
let valueBudgetDay = document.getElementsByClassName('result-total')[1];
let valueExpensesMonth = document.getElementsByClassName('result-total')[2];
let valueAdditionalIncome = document.getElementsByClassName('result-total')[3];
let valueAdditionalExpenses = document.getElementsByClassName('result-total')[4];
let valueIncomePeriod = document.getElementsByClassName('result-total')[5];
let valueTargetMonth = document.getElementsByClassName('result-total')[6];
let inputSalaryAmount = document.querySelector('.salary-amount');
let inputIncomeTitle = document.querySelector('.income-title');
let inputIncomeAmount = document.querySelector('.income-amount');
let inputExpensesTitle = document.querySelector('.expenses-title');
let inputExpensesAmount = document.querySelector('.expenses-amount');
let inputExpensesIncome = document.querySelector('.additional_expenses-item');
let inputDepositAmount = document.querySelector('.deposit-amount');
let inputDepositPercent = document.querySelector('.deposit-percent');
let inputTargetAmount = document.querySelector('.target-amount');
let inputPeriodSelect = document.querySelector('.period-select');

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  budget: money,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    // Узнаем о дополнительном заработке
    if (confirm('Имеется ли у вас дополнительный источник дохода?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный истоник дохода?', 'Фриланс');
      } while (isNumber(itemIncome) || itemIncome === '');
      let cashIncome;
      do {
        cashIncome = +prompt('Сколько в месяц вам приносит дополнительный источник дохода?', 10000);
      } while (!isNumber(cashIncome) || cashIncome === 0);
      appData.addIncome[itemIncome] = cashIncome;
    }
    // Узнаем расходы
    appData.addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      'одежда,сто,такси'
    );
    appData.addExpenses = appData.addExpenses.split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let expenses;
    let amount = 0;
    for (let i = 0; i < 2; i++) {
      expenses = prompt('Введите обязательную статью раходов.');
      while (isNumber(expenses) || expenses === '') {
        expenses = prompt('Введите обязательную статью раходов.');
      }
      amount = prompt('Во сколько это обойдется?', 5000);
      while (!isNumber(amount) || amount === 0) {
        amount = prompt('Во сколько это обойдется?', 5000);
      }
      appData.expenses[expenses] = Number(amount);
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = +prompt('Какой у вас годовой процент?', 12);
      } while (!isNumber(appData.percentDeposit) || appData.percentDeposit === 0);
      do {
        appData.moneyDeposit = +prompt('Какая у вас заложенна сумма?', 10000);
      } while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0);
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
    appData.budgetMonth = money - appData.expensesMonth;
    return;
  },
  getBudget: function () {
    // Вычисляем бюджет на день
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getAccumulatedMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.calcSavedMoney();

// Выводим все данные в консоль;
console.log('Cумма всех обязательных расходов за месяц:', appData.expensesMonth);
console.log('Цель:', appData.getTargetMonth());
console.log('Уровень дохода:', appData.getStatusIncome());
console.log(appData.addExpenses.map((n) => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ' ' + appData[key]);
}
