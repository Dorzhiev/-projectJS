'use strict';

let startBtn = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus= document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.querySelector('.result-budget_month input'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items');


const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;   //бюджет на день
    this.budgetMonth = 0;   //бюджет на месяц
    this.expensesMonth = 0;   //расходы на месяц
    this.income = {};   //дополнительные доходы
    this.incomeMonth = 0;
    this.addIncome = [];   //дополнительные доходы
    this.expenses = {};   //дополнительные расходы
    this.addExpenses = [];   //возможные расходы
    this.deposit = false;   //
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function () {
        if (salaryAmount.value !== '') {
            startBtn.removeAttribute('disabled');
        }
};

AppData.prototype.startBtn = function() { //AppData.prototype.start поменял на startBtn
     if (salaryAmount.value === '') {
        startBtn.setAttribute('disabled', 'true'); 
        return;
     }
     let allInput = document.querySelectorAll('.data input[type = text]');
     allInput.forEach(function (item) {
         item.setAttribute('disabled', 'true');
     });
     expensesPlus.setAttribute('disabled', 'true');
     incomePlus.setAttribute('disabled', 'true');
     startBtn.style.display = 'none';
     cancel.style.display = 'block';

     this.budget = +salaryAmount.value;//зарплата 

     this.getExpenses();
     this.getIncome();
     this.getExpensesMonth();
     this.getAddExpenses();
     this.getAddIncome();
     this.getBudget();
     this.getInfoDeposit();
     this.getStatusIncome();
     this.showResult();
};

 AppData.prototype.showResult = function(){
        const _this = this;
        budgetMonthValue.value = this.budgetMonth; //доход за месяц
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth; //расход за месяц
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth()); //накопление за период
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = _this.calcPeriod();
      });
    };
    AppData.prototype.addExpensesBlock = function() { 
        let cloneExpensesItem = expensesItems[0].cloneNode(true);//метод cloneNode
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    };

    AppData.prototype.getExpenses = function(){
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses; 
            }
        });
    };

    AppData.prototype.addIncomeBlock = function() { 
        let cloneIncomeItem = incomeItems[0].cloneNode(true);//метод cloneNode
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    };

    AppData.prototype.getIncome = function() {
        const _this = this;
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        }); 
        for( let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };    
 
    AppData.prototype.getAddExpenses = function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getAddIncome = function() {
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };

    AppData.prototype.getExpensesMonth = function() {    //считаем сумму всех обязательных расходов 
        for (let key in appData.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };

    AppData.prototype.getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };

    AppData.prototype.getTargetMonth = function() {
        return targetAmount.value / this.budgetMonth;
    };
    
    AppData.prototype.getStatusIncome = function() {
        if (this.budgetDay >= 1200){
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200){
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    };
     AppData.prototype.getInfoDeposit = function () {
         if (this.deposit) {
             do {
                 this.percentDeposit = prompt('Какой годовой процент?', '12');
             } while (isNaN(this.percentDeposit) || this.percentDeposit === ' ' || this.percentDeposit ===null);
             do {
                 this.moneyDeposit = prompt('Какая сумма заполнена?', '1000');
             } while (isNaN(this.moneyDeposit) || this.moneyDeposit === ' ' || this.moneyDeposit === null);
         }
     };

    AppData.prototype.periodSelectRange = function (event){
        periodAmount.textContent = event.target.value;
    };

    AppData.prototype.calcPeriod = function() {
       return this.budgetMonth * periodSelect.value;
    };

    AppData.prototype.reset = function () {
        let inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');
            
        inputTextData.forEach(function(elem) {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function (elem) {
            elem.value = '';
        });

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomePlus.style.display = 'block';
        }

        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesPlus.style.display = 'block';
        }

        this.budget = 0;
        this.budgetDay = 0;   //бюджет на день
        this.budgetMonth = 0;   //бюджет на месяц
        this.expensesMonth = 0;   //расходы на месяц
        this.income = {};   //дополнительные доходы
        this.incomeMonth = 0;
        this.addIncome = [];   //дополнительные доходы
        this.expenses = {};   //дополнительные расходы
        this.addExpenses = [];   //возможные расходы
        this.deposit = false;   //
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    
        cancel.style.display = 'none';
        startBtn.style.display = 'block';
        expensesPlus.removeAttribute('disabled');
        incomePlus.removeAttribute('disabled');
        depositCheck.checked = false;
    };

    AppData.prototype.eventListener = function () {
        startBtn.addEventListener('click', appData.startBtn.bind(appData)); //'click', appData.start поменял на на startBtn
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        salaryAmount.addEventListener('keyup', appData.check);
        cancel.addEventListener('click', appData.reset.bind(appData));

        periodSelect.addEventListener('change', function () {
            periodAmount.innerHTML = periodSelect.value;
        });

        let addExp = [];
        for (let i = 0; i < appData.addExpenses.length; i++) {
            let element = appData.addExpenses[i].trim();
            element = element.charAt(0).toUpperCase() + element.substring(i).toLowerCase();
            addExp.push(element);
        }
    };

const appData = new AppData();
appData.eventListener();



