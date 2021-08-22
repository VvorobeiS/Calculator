'use strict';

const btnCalculate = document.getElementById('start');
const btnCancel = document.getElementById('cancel');
const btnIncomeAdd = document.getElementsByTagName('button')[0];
const btnExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const selectDepositBank = document.querySelector('.deposit-bank');
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
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const inputs = document.querySelectorAll('input');
const inputsValue = document.querySelectorAll('.result-total');

const inputDepositPercent = document.querySelector('.deposit-percent');
let inputIncomeTitle = document.querySelector('.income-title');
let inputIncomeAmount = document.querySelector('.income-amount');
let inputExpensesTitle = document.querySelector('.expenses-title');
let inputExpensesAmount = document.querySelector('.expenses-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let inputsText = document.querySelectorAll('input[type = text]');

// Функция для проверки введеного типа данных
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = Number(inputSalaryAmount.value);
    this.getExpenses();
    this.getIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }

  showResult() {
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
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesAdd.style.display = 'none';
    }
  }

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomeAdd.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      inputExpensesTitle = item.querySelector('.expenses-title').value;
      inputExpensesAmount = item.querySelector('.expenses-amount').value;
      if (inputExpensesTitle !== '' && inputExpensesAmount !== '') {
        this.expenses[inputExpensesTitle] = Number(inputExpensesAmount);
      }
    });
  }

  getIncome() {
    // Узнаем о дополнительном заработке
    incomeItems.forEach((item) => {
      inputIncomeTitle = item.querySelector('.income-title').value;
      inputIncomeAmount = item.querySelector('.income-amount').value;
      if (inputIncomeTitle !== '' && inputIncomeAmount !== '') {
        this.income[inputIncomeTitle] = Number(inputIncomeAmount);
      }
    });
  }

  getAddExpenses() {
    let addExpenses = inputExpensesIncome.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    inputAdditionalIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = inputDepositPercent.value;
      this.moneyDeposit = inputDepositAmount.value;
    }
  }

  getExpensesMonth() {
    // Получаем сумму расходов за месяц
    for (let num in this.expenses) {
      this.expensesMonth += Number(this.expenses[num]);
    }
    return this.expensesMonth;
  }

  getIncomeMonth() {
    // Получаем сумму доп.дохода за месяц
    for (let num in this.income) {
      this.incomeMonth += Number(this.income[num]);
    }
    return this.incomeMonth;
  }

  getRange() {
    periodAmount.innerHTML = inputPeriodSelect.value;
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    // Вычисляем бюджет на месяц
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;

    // Вычисляем бюджет на день
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    // Вычиялем количество месяцев для достижения цели
    return Math.ceil(inputTargetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
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
  }

  calcPeriod() {
    return this.budgetMonth * inputPeriodSelect.value;
  }

  calcPeriodUpdate() {
    return this.calcPeriod();
  }

  changePercent() {
    const valueDepositBank = this.value;
    if (valueDepositBank === 'other') {
      inputDepositPercent.style.display = 'inline-block';
      btnCalculate.disabled = true;
      inputDepositPercent.addEventListener('input', function () {
        if (
          !isNumber(inputDepositPercent.value) ||
          inputDepositPercent.value < 0 ||
          inputDepositPercent.value > 100 ||
          !isNumber(inputSalaryAmount.value)
        ) {
          btnCalculate.disabled = true;
        } else {
          btnCalculate.disabled = false;
        }
      });
    } else if (valueDepositBank !== 'other' && !isNumber(inputSalaryAmount.value)) {
      inputDepositPercent.style.display = 'none';
      inputDepositPercent.value = valueDepositBank;
      inputDepositPercent.removeEventListener('input');
    } else {
      inputDepositPercent.style.display = 'none';
      inputDepositPercent.value = valueDepositBank;
      inputDepositPercent.removeEventListener('input');
      btnCalculate.disabled = false;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      selectDepositBank.style.display = 'initial';
      inputDepositAmount.style.display = 'initial';
      this.deposit = true;
      selectDepositBank.addEventListener('change', this.changePercent);
    } else {
      selectDepositBank.style.display = 'none';
      inputDepositAmount.style.display = 'none';
      selectDepositBank.value = '';
      inputDepositAmount.value = '';
      this.deposit = false;
      selectDepositBank.removeEventListener('change', this.changePercent);
    }
  }

  reset() {
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
    selectDepositBank.value = '';
    inputDepositAmount.value = '';
    inputDepositPercent.value = '';
    selectDepositBank.style.display = 'none';
    inputDepositAmount.style.display = 'none';
    inputDepositPercent.style.display = 'none';
    inputPeriodSelect.value = 1;
    periodAmount.textContent = inputPeriodSelect.value;
    btnCalculate.style.display = 'initial';
    btnCalculate.disabled = inputSalaryAmount.value === '';
    btnCancel.style.display = 'none';
  }

  eventsListeners() {
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
    depositCheck.addEventListener('change', () => {
      this.depositHandler();
    });
  }
}

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
