'use strict';

const money = +prompt('Ваш месячный доход?', 40000); //месячный доход
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы', 'Оплата за съем, Кредит, Проезд');
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase().split(', '));
const deposit = confirm('Есть ли у вас депозит в банке?', true);
const mission =  1000000;

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const expenses1 ='Введите обязательную статью расходов?';
const expenses2 ='Введите обязательную статью расходов?';
const amount1 = +prompt('Во сколько это обойдется?', 3000);
const amount2 = +prompt('Во сколько это обойдется?', 1000);

const getExpensesMonth = function() {
    return amount1 + amount2;
}
console.log('расходы за месяц: ' + getExpensesMonth()); 

const getAccumulatedMonth = function() {
    return money - getExpensesMonth();
}
const accumulatedMonth = getAccumulatedMonth();


console.log( 'Цель заработать, ' +  mission + ' рублей');

const getTargetMonth = function() {
    return Math.floor(mission / accumulatedMonth);
};
console.log(`Цель будет достигнута через ${getTargetMonth()} месяцев`);

const budgetDay = accumulatedMonth / 30;

console.log('Бюджет на день: ' + budgetDay);



let getStatusIncome = function() {
        if (budgetDay >= 1200){
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay <= 1200){
        return ('У вас средний уровень дохода');
    } else if (budgetDay <= 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};
console.log(getStatusIncome());
