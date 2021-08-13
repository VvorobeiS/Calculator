'use strict';

const btnCalculate = document.getElementById('start');
const btnIncomeAdd = document.getElementsByTagName('button')[0];
const btnExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const valueBudgetMonth = document.getElementsByClassName('result-total')[0];
const valueBudgetDay = document.getElementsByClassName('result-total')[1];
const valueExpensesMonth = document.getElementsByClassName('result-total')[2];
const valueAdditionalIncome = document.getElementsByClassName('result-total')[3];
const valueAdditionalExpenses = document.getElementsByClassName('result-total')[4];
const valueIncomePeriod = document.getElementsByClassName('result-total')[5];
const valueTargetMonth = document.getElementsByClassName('result-total')[6];
const inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
const inputSalaryAmount = document.querySelector('.salary-amount');
const inputExpensesIncome = document.querySelector('.additional_expenses-item');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let inputExpensesTitle = document.querySelector('.expenses-title');
let inputExpensesAmount = document.querySelector('.expenses-amount');
let inputIncomeTitle = document.querySelector('.income-title');
let inputIncomeAmount = document.querySelector('.income-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

// Функция для проверки введеного типа данных
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Добавляем объект
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  start: function () {
    appData.budget = Number(inputSalaryAmount.value);

    appData.getExpenses();
    appData.getIncome();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getBudget();
    // appData.getInfoDeposit();
    // appData.getStatusIncome();
    // appData.calcSavedMoney();
    appData.showResult();
  },
  showResult: function () {
    valueBudgetMonth.value = appData.budgetMonth;
    valueBudgetDay.value = appData.budgetDay;
    valueExpensesMonth.value = appData.expensesMonth;
    valueAdditionalExpenses.value = appData.addExpenses.join(', ');
    valueAdditionalIncome.value = appData.addIncome.join(', ');
    valueTargetMonth.value = appData.getTargetMonth();
    let calcPeriodUpdate = function () {
      valueIncomePeriod.value = appData.calcPeriod();
    };
    inputPeriodSelect.addEventListener('input', calcPeriodUpdate);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesAdd.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomeAdd.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      inputExpensesTitle = item.querySelector('.expenses-title').value;
      inputExpensesAmount = item.querySelector('.expenses-amount').value;
      if (inputExpensesTitle !== '' && inputExpensesAmount !== '') {
        appData.expenses[inputExpensesTitle] = Number(inputExpensesAmount);
      }
    });
  },
  getIncome: function () {
    // Узнаем о дополнительном заработке
    incomeItems.forEach(function (item) {
      inputIncomeTitle = item.querySelector('.income-title').value;
      inputIncomeAmount = item.querySelector('.income-amount').value;
      if (inputIncomeTitle !== '' && inputIncomeAmount !== '') {
        appData.income[inputIncomeTitle] = Number(inputIncomeAmount);
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = inputExpensesIncome.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    inputAdditionalIncome.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
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
      appData.expensesMonth += Number(appData.expenses[num]);
    }
    return appData.expensesMonth;
  },
  getIncomeMonth: function () {
    // Получаем сумму доп.дохода за месяц
    for (let num in appData.income) {
      appData.incomeMonth += Number(appData.income[num]);
    }
    return appData.incomeMonth;
  },
  getRange: function () {
    periodAmount.innerHTML = inputPeriodSelect.value;
  },
  getBudget: function () {
    // Вычисляем бюджет на месяц
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    // Вычисляем бюджет на день
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    // Вычиялем количество месяцев для достижения цели
    return Math.ceil(inputTargetAmount.value / appData.budgetMonth);
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
  calcPeriod: function () {
    return appData.budgetMonth * inputPeriodSelect.value;
  }
};

btnCalculate.disabled = true;
inputSalaryAmount.addEventListener('keyup', function () {
  if (inputSalaryAmount.value === '') {
    btnCalculate.disabled = true;
  } else {
    btnCalculate.disabled = false;
  }
});
btnCalculate.addEventListener('click', appData.start);
btnExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnIncomeAdd.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('input', appData.getRange);

// Выводим все данные в консоль;
// console.log('Cумма всех обязательных расходов за месяц:', appData.expensesMonth);
// console.log('Цель:', appData.getTargetMonth());
// console.log('Уровень дохода:', appData.getStatusIncome());
// console.log(appData.addExpenses.map((n) => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));
// console.log('Наша программа включает в себя данные:');

// for (let key in appData) {
// console.log(key + ' ' + appData[key]);
// }
