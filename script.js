const money = prompt('Ваш месячный доход?', 40000); //месячный доход
console.log(typeof money);
const income = 'фриланс';
console.log(typeof income);
const addExpenses = prompt('Перечислите возможные расходы', 'Оплата за съем, Кредит, Проезд');
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase().split(' '));
const deposit = confirm('Есть ли у вас депозит в банке?', true);
console.log(typeof deposit);
const expenses1 ='Введите обязательную статью расходов?';
const expenses2 ='Введите обязательную статью расходов?';
const amount1 = prompt('Во сколько это обойдется?', 3000);
const amount2 =prompt('Во сколько это обойдется?', 1000);
const budgetMonth = Math.ceil(money - amount1 - amount2);//бюджет на месяц 
const mission =  7000000;
console.log( 'Цель заработать, ' +  mission + ' рублей');
const period = Math.floor(7000000 / budgetMonth);
console.log(`Период равен ${period} месяцев`);
const budgetDay = Math.floor(money / 30);
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200){
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}