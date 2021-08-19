'use strict';

const btnCalculate = document.getElementById('start');
const btnCancel = document.getElementById('cancel');
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
const inputs = document.querySelectorAll('input');
const inputsValue = document.querySelectorAll('.result-total');
let inputExpensesTitle = document.querySelector('.expenses-title');
let inputExpensesAmount = document.querySelector('.expenses-amount');
let inputIncomeTitle = document.querySelector('.income-title');
let inputIncomeAmount = document.querySelector('.income-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let inputsText = document.querySelectorAll('input[type = text]');

// Функция для проверки введеного типа данных
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
  this.budget = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
};

AppData.prototype.start = function () {
  this.budget = Number(inputSalaryAmount.value);
  this.getExpenses();
  this.getIncome();
  this.getAddExpenses();
  this.getAddIncome();
  this.getExpensesMonth();
  this.getIncomeMonth();
  this.getBudget();
  this.showResult();
};

AppData.prototype.showResult = function () {
  valueBudgetMonth.value = this.budgetMonth;
  valueBudgetDay.value = this.budgetDay;
  valueExpensesMonth.value = this.expensesMonth;
  valueAdditionalExpenses.value = this.addExpenses.join(', ');
  valueAdditionalIncome.value = this.addIncome.join(', ');
  valueTargetMonth.value = this.getTargetMonth();
  valueIncomePeriod.value = this.calcPeriodUpdate();
  inputPeriodSelect.addEventListener('input', () => {
    valueIncomePeriod.value = this.calcPeriodUpdate();
  });
  inputsText = document.querySelectorAll('input[type = text]');
  inputsText.forEach(function (item) {
    if (!item.disabled) {
      item.disabled = true;
    }
  });
  btnCalculate.style.display = 'none';
  btnCancel.style.display = 'initial';
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    btnExpensesAdd.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    btnIncomeAdd.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () {
  expensesItems.forEach((item) => {
    inputExpensesTitle = item.querySelector('.expenses-title').value;
    inputExpensesAmount = item.querySelector('.expenses-amount').value;
    if (inputExpensesTitle !== '' && inputExpensesAmount !== '') {
      this.expenses[inputExpensesTitle] = Number(inputExpensesAmount);
    }
  });
};

AppData.prototype.getIncome = function () {
  // Узнаем о дополнительном заработке
  incomeItems.forEach((item) => {
    inputIncomeTitle = item.querySelector('.income-title').value;
    inputIncomeAmount = item.querySelector('.income-amount').value;
    if (inputIncomeTitle !== '' && inputIncomeAmount !== '') {
      this.income[inputIncomeTitle] = Number(inputIncomeAmount);
    }
  });
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = inputExpensesIncome.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  inputAdditionalIncome.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = +prompt('Какой у вас годовой процент?', 12);
    } while (!isNumber(this.percentDeposit) || this.percentDeposit === 0);
    do {
      this.moneyDeposit = +prompt('Какая у вас заложенна сумма?', 10000);
    } while (!isNumber(this.moneyDeposit) || this.moneyDeposit === 0);
  }
};

AppData.prototype.getExpensesMonth = function () {
  // Получаем сумму расходов за месяц
  for (let num in this.expenses) {
    this.expensesMonth += Number(this.expenses[num]);
  }
  return this.expensesMonth;
};

AppData.prototype.getIncomeMonth = function () {
  // Получаем сумму доп.дохода за месяц
  for (let num in this.income) {
    this.incomeMonth += Number(this.income[num]);
  }
  return this.incomeMonth;
};

AppData.prototype.getRange = function () {
  periodAmount.innerHTML = inputPeriodSelect.value;
};

AppData.prototype.getBudget = function () {
  // Вычисляем бюджет на месяц
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;

  // Вычисляем бюджет на день
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  // Вычиялем количество месяцев для достижения цели
  return Math.ceil(inputTargetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
  // Узнаем уровень дохода
  if (this.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (this.budgetDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (this.budgetDay > 0) {
    return 'К сожалению у вас уровень низкий уровень дохода';
  } else {
    return 'Что то пошло не так';
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * inputPeriodSelect.value;
};

AppData.prototype.calcPeriodUpdate = function () {
  return this.calcPeriod();
};

AppData.prototype.reset = function () {
  this.budget = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;

  inputsText.forEach(function (item) {
    if ((item.disabled = true)) {
      item.disabled = false;
    }
  });

  inputsValue.forEach(function (item) {
    if (!item.disabled) {
      item.disabled = true;
    }
  });

  let inputs = document.querySelectorAll('input');
  inputs.forEach(function (item) {
    if (item.value !== '') {
      item.value = '';
    }
  });

  for (let i = incomeItems.length - 1; i > 0; i--) {
    incomeItems[i].remove();
  }
  for (let i = expensesItems.length - 1; i > 0; i--) {
    expensesItems[i].remove();
  }

  btnIncomeAdd.style.display = 'initial';
  btnExpensesAdd.style.display = 'initial';
  depositCheck.checked = false;
  inputPeriodSelect.value = 1;
  periodAmount.textContent = inputPeriodSelect.value;
  btnCalculate.style.display = 'initial';
  btnCalculate.disabled = inputSalaryAmount.value === '';
  btnCancel.style.display = 'none';
};

AppData.prototype.eventsListeners = function () {
  btnCalculate.disabled = !isNumber(inputSalaryAmount.value);
  inputSalaryAmount.addEventListener('input', function () {
    if (!isNumber(inputSalaryAmount.value)) {
      btnCalculate.disabled = true;
    } else {
      btnCalculate.disabled = false;
    }
  });
  btnCalculate.addEventListener('click', () => {
    this.start();
  });
  btnCancel.addEventListener('click', () => {
    this.reset();
  });
  btnExpensesAdd.addEventListener('click', () => {
    this.addExpensesBlock();
  });
  btnIncomeAdd.addEventListener('click', () => {
    this.addIncomeBlock();
  });
  inputPeriodSelect.addEventListener('input', () => {
    this.getRange();
  });
};

const appData = new AppData();

appData.eventsListeners();

// Выводим все данные в консоль;
// console.log('Cумма всех обязательных расходов за месяц:', appData.expensesMonth);
// console.log('Цель:', appData.getTargetMonth());
// console.log('Уровень дохода:', appData.getStatusIncome());
// console.log(appData.addExpenses.map((n) => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));
// console.log('Наша программа включает в себя данные:');

// for (let key in appData) {
// console.log(key + ' ' + appData[key]);
// }
