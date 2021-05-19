'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const addLocStor = function () { // создаем функцию для добавления элементов списка в Local Storage (LS)
    localStorage.setItem('ToDo', JSON.stringify(todoData));
};

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        };

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            addLocStor(); // записываем изменения в LS (связанные с переключением на выполненные/невыполненные дела)
            render();// рекурсия, вызвает сам себя
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            li.remove();
            // todoData.splice(li, 1); лучше искать элемент по индексу способом 45 строки
            todoData.splice(todoData.indexOf(item), 1); 
            addLocStor(); // записываем изменения в LS (связанные с переключением на выполненные/невыполненные дела)
        })
    });
};

const getLocStor = function () {   // создаем функцию для взятия элементов списка из Local Storage (LS)
    const getItems = localStorage.getItem('ToDo');

    if (getItems) {
        todoData = JSON.parse(getItems);
        headerInput.value = '';
        render();
    }
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
        addLocStor(); // сохраняем добавленный в список элемент в LS
        render();
        headerInput.value = '';
    }
});

getLocStor();

