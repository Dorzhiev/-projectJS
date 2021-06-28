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
    incomeItem = document.querySelectorAll('.income-items'),
    depositBank =  document.querySelector('.deposit-bank'),
    depositAmount =  document.querySelector('.deposit-amount'),
    depositPercent =  document.querySelector('.deposit-percent');


class AppData {
    constructor() {
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
    }
    


check() {
        if (salaryAmount.value !== '') {
            startBtn.removeAttribute('disabled');
        }
    }

startBtn() { //AppData.prototype.start поменял на startBtn
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

     this.getExpInc();
     this.getExpensesMonth();
     this.getAddExpenses();
     this.getAddIncome();
     this.getInfoDeposit();
    //  this.getStatusIncome(); 
     this.getBudget();
     this.showResult();
}

    showResult() {
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
    }
    addExpensesBlock() { 
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock() { 
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    }
    
    getExpInc() {  
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        
        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for( let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
 
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {    //считаем сумму всех обязательных расходов 
        for (let key in appData.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit* (this.percentDeposit / 100);
        console.log(monthDeposit);
        console.log(this.percentDeposit);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    
    // getStatusIncome() {
    //     if (this.budgetDay >= 1200){
    //         return ('У вас высокий уровень дохода');
    //     } else if (this.budgetDay >= 600 && this.budgetDay <= 1200){
    //         return ('У вас средний уровень дохода');
    //     } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
    //         return ('К сожалению у вас уровень дохода ниже среднего');
    //     } else {
    //         return ('Что то пошло не так');
    //     }
    // };

    periodSelectRange(event) {
        periodAmount.textContent = event.target.value;
    }

    calcPeriod() {
       return this.budgetMonth * periodSelect.value;
    }

    reset() {
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
        // this.percentDeposit = 0;
        // this.moneyDeposit = 0;
    
        cancel.style.display = 'none';
        startBtn.style.display = 'block';
        expensesPlus.removeAttribute('disabled');
        incomePlus.removeAttribute('disabled');
        depositCheck.checked = false;
        depositPercent.style.display = 'none';
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value; //записывается % банка
            this.moneyDeposit = depositAmount.value;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }


    eventsListeners() {
        startBtn.addEventListener('click', this.startBtn.bind(this)); //'click', appData.start поменял на на startBtn
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        cancel.addEventListener('click', this.reset.bind(this));

        periodSelect.addEventListener('change', () => {
            periodAmount.innerHTML = periodSelect.value;
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));

    }
}
const appData = new AppData();
appData.eventsListeners();
