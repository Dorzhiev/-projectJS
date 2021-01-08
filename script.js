'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money; //месячный доход
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы', 'Оплата за съем, Кредит, Проезд');
console.log(addExpenses.toLowerCase().split(', '));
const deposit = confirm('Есть ли у вас депозит в банке?', true);
const mission =  1000000;

const start = function() {
    do{
        money = prompt('Ваш месячный доход?');
    } while (!isNumber (money));
};
start();

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const expenses = [];
const getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i ++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'Садик');
        sum += +prompt('Во сколько это обойдется?', 3000);
        while (!isNumber(sum)) {                                //проверка на число
            sum = +prompt('Во сколько это обойдется?', 3000);
        }
    }
    console.log(expenses);
    return sum;
};

const expensesAmount = getExpensesMonth();
console.log('расходы за месяц: ' + expensesAmount); 

const getAccumulatedMonth = function() {
    return money - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth();


console.log( 'Цель заработать, ' +  mission + ' рублей');

const getTargetMonth = function() {
    let sum = Math.floor(mission / accumulatedMonth);
    if(sum <= 0) {
        console.log('Цель не будет достигнута.');
    } else {
        console.log(`Цель будет достигнута через ${sum} месяцев`);
    }
};
getTargetMonth();

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
