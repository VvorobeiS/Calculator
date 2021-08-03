'use strict';

// Вызываем (alert)
alert('ДЗ сдано!');

// Объявляем пременные
let money = (55000, +prompt('Ваш месячный доход?', 55000));
let income = 'фриланс';
let addExpenses =
  ('Гсм, Спортпит, Обучение',
  prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Одежда, спортинвертарь, отдых'));
let deposit = (false, confirm('Есть ли у вас депозит в банке?'));
let mission = 500000;
let period = 12;
let expenses1 = prompt('Введите обязательную статью раходов.', 'Гсм');
let amount1 = +prompt('Во сколько это обойдется?', '5000');
let expenses2 = prompt('Введите обязательную статью раходов.', 'Еда');
let amount2 = +prompt('Во сколько это обойдется?', '10000');
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = (money / 30, Math.floor(accumulatedMonth / 30));

// Объявляем функции
let getExpensesMonth = function () {
  return amount1 + amount2;
};
function getAccumulatedMonth() {
  return money - amount1 - amount2;
}
let getTargetMonth = function () {
  return mission / accumulatedMonth;
};
let getStatusIncome = function () {
  if (budgetDay > 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budgetDay === 1200) {
    return 'Ваш уровень дохода выше среднего';
  } else if (budgetDay > 600) {
    return 'У вас средний уровень дохода';
  } else if (budgetDay === 600) {
    return 'Ваш уровень дохода выше низкого';
  } else if (budgetDay > 0) {
    return 'К сожалению у вас уровень низкий уровень дохода';
  } else {
    return 'Что то пошло не так';
  }
};
let showTypeOf = function (data) {
  console.log(data, typeof data);
};

// Передаем данные в консоль
console.log(getExpensesMonth());
console.log(getTargetMonth());
console.log(accumulatedMonth);
console.log(budgetDay);
console.log(getStatusIncome());

// Выводим тип данных в консоль
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Приводим строку к нижнему регистру, разбиваем на массив и выводим в консоль
console.log(addExpenses.toLowerCase().split(', '));
