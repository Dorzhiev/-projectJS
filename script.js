'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money; //месячный доход
let start = function() {
    do{
        money = prompt('Ваш месячный доход?', 60000);
    } while (!isNumber (money));
};
start();

let appData = {
    budget: money,
    budgetDay: 0,   //бюджет на день
    budgetMonth: 0,   //бюджет на месяц
    expensesMonth: 0,   //расходы на месяц
    income: {},   //дополнительные доходы
    addIncome: [],   //дополнительные доходы
    expenses: {},   //дополнительные расходы
    addExpenses: [],   //возможные расходы
    deposit: false,   //
    mission: 500000,   //
    period: 3,   //
    asking: function() {   //
        appData.addExpenses = prompt('Перечислите возможные расходы', 'Оплата за съем, Кредит, Проезд');
        appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i ++) {

            let itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик');
            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 3000);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;
        }
    },

    getExpensesMonth: function() {    //считаем сумму всех обязательных расходов 
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        return appData.mission / appData.budgetMonth;
    },
    
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200){
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }
    
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('расходы за месяц: ' + appData.expensesMonth); 

// const accumulatedMonth = appData.getBudget();
// console.log( 'Цель заработать, ' +  appData.mission + ' рублей');
// appData.getTargetMonth();
// const budgetDay = accumulatedMonth / 30;

// console.log('Бюджет на день: ' + budgetDay);
console.log(appData.getStatusIncome());

if(appData.getTargetMonth() <= 0) {
    console.log('Цель не будет достигнута.');
} else {
    console.log(`Цель будет достигнута через ${Math.ceil(appData.getTargetMonth())} месяцев`);
}

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}