import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

// определение типа для фильтрации задач
export type FilterValuesType = "All" | "Completed" | "Active";


// тип данных для объектов "списка задач".
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

// Удаление таски
    function removeTask(id: string, todolistId: string) {
// Здесь мы получаем массив задач из объекта tasksObj по
// заданному todolistId и сохраняем его в переменной tasks.
        let tasks = tasksObj[todolistId]
// Мы создаем новый массив filteredTasks, который содержит все
// задачи из tasks, за исключением той, у которой id совпадает
// с переданным id. Таким образом, мы фильтруем задачи и оставляем
// только те, у которых id не совпадает с тем, который мы хотим удалить.
        let filteredTasks = tasks.filter(t => t.id !== id)
// Мы обновляем оригинальный массив задач в объекте tasksObj для
// конкретного todolistId новым массивом filteredTasks.
// Теперь в объекте tasksObj для данного todolistId хранятся задачи
// без удаленной задачи.
        tasksObj[todolistId] = filteredTasks
// setTasksObj является функцией, обновляющей состояние (state) задач
// в приложении. Мы передаем новый объект задач, созданный с использованием
// оператора spread ({...tasksObj}), чтобы обновить состояние и уведомить
// React о необходимости перерисовать компоненты, зависящие от этих данных.
        setTasksObj({...tasksObj});
    }

// Добавление новой таски
    function addTask(title: string, todolistId: string) {
// id устанавливается с использованием функции v1(), которая создает
// уникальный идентификатор.
// title устанавливается в переданное значение.
// isDone устанавливается в false
        let task = {id: v1(), title: title, isDone: false};
// Мы получаем текущий массив задач из объекта tasksObj для конкретного
// todolistId и сохраняем его в переменной tasks.
        let tasks = tasksObj[todolistId];
// Создаем новый массив newTasks, включая только что созданную задачу (task)
// и все остальные задачи из текущего массива (tasks).
// Мы используем оператор spread (...) для распространения элементов
// текущего массива.
        let newTasks = [task, ...tasks];
// Мы обновляем оригинальный массив задач в объекте tasksObj для данного
// todolistId новым массивом newTasks. Теперь в объекте tasksObj для этого
// todolistId содержится массив задач с новой добавленной задачей.
        tasksObj[todolistId] = newTasks
// Мы передаем новый объект задач, созданный с использованием оператора
// spread ({...tasksObj}), чтобы обновить состояние и уведомить React
// о необходимости перерисовать компоненты, зависящие от этих данных.
        setTasksObj({...tasksObj});
    }

// функция для изменения статуса (выполнено/не выполнено) в определённом списке
    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
// Получаем массив задач для конкретного todoListId из объекта
// tasksObj и сохраняем его в переменной tasks.
        let tasks = tasksObj[todoListId];
// Используем метод find для поиска задачи в массиве tasks по id,
// который передается в функцию. Результат поиска сохраняется в переменной task.
        let task = tasks.find(task => task.id === taskId);
// Проверяем, успешно ли была найдена задача. Если задача найдена
// (то есть task не равен undefined), выполняем следующие действия:
        if (task) {
// Меняем свойство isDone у найденной задачи на значение,
// переданное в параметре isDone. Таким образом, мы обновляем
// статус выполнения задачи.
            task.isDone = isDone
// Мы передаем новый объект задач, созданный с использованием
// оператора spread ({...tasksObj}), чтобы обновить состояние и уведомить
// React о необходимости перерисовать компоненты, зависящие от этих данных.
            setTasksObj({...tasksObj});
        }
    }

// функция для изменения текущего фильтра в определенном списке
    function changeFilter(value: FilterValuesType, todoListId: string) {
// Мы используем метод find для поиска объекта todoList
// в массиве todoLists по id, который передан в функцию. Результат
// поиска сохраняется в переменной todoList.
        let todoList = todoLists.find(tl => tl.id === todoListId);
// Проверяем, успешно ли был найден объект todoList. Если объект найден
// (то есть todoList не равен undefined), выполняем следующие действия:
        if (todoList) {
// Устанавливаем свойство filter объекта todoList в значение,
// переданное в параметре value. Это свойство, вероятно, используется
// для хранения значения фильтрации для задач в этом конкретном списке дел.
            todoList.filter = value;
// Мы передаем новый массив todoLists, созданный с использованием оператора
// spread ([...todoLists]), чтобы обновить состояние и уведомить React
// о необходимости перерисовать компоненты, зависящие от этих данных.
            setTodoLists([...todoLists]);
        }
    }

// Этот код создает два уникальных идентификатора. Таким образом, переменная
// todolistId1 и todolistId2 получает уникальный идентификатор, который может
// быть использован для идентификации различных списков дел в приложении.
    let todolistId1 = v1();
    let todolistId2 = v1();

// Этот код использует деструктуризацию массива и функцию useState.
// let [todoLists, setTodoLists]: Мы используем деструктуризацию массива для
// присвоения переменной todoLists текущего состояния (массива списков дел)
// и setTodoLists - функции, которая позволяет обновлять это состояние.
// useState<Array<TodoListType>>: Это вызов функции useState, которая принимает
// начальное значение состояния. В данном случае, начальное значение - это
// массив объектов типа TodoListType. Тип TodoListType предполагает, что
// каждый объект в массиве будет представлять собой список дел с определенными
// свойствами (id, title, filter).
// Таким образом, после выполнения этого кода у нас есть состояние todoLists,
// представляющее списки дел в компоненте, и функция setTodoLists, которая
// позволяет обновлять это состояние.
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "Active"},
        {id: todolistId2, title: "What to buy", filter: "Completed"}
    ]);

// Удаление списка дел
    let removeTodoList = (todoListId: string) => {
// Мы используем метод filter для создания нового массива filteredTodoList,
// в котором исключаются те списки дел, у которых id совпадает с переданным
// todoListId. Таким образом, мы удаляем из массива список дел с определенным
// todoListId.
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
// Мы используем функцию setTodoLists для обновления состояния компонента,
// отображающего списки дел. Передаем новый массив filteredTodoList,
// чтобы отразить изменения в интерфейсе.
        setTodoLists(filteredTodoList);
// это удалит соответствующий объект из объекта tasksObj.
        delete tasksObj[todolistId1];
// Мы передаем новый объект задач, созданный с использованием оператора
// spread ({...tasksObj}), чтобы обновить состояние и уведомить React
// о необходимости перерисовать компоненты, зависящие от этих данных.
        setTasksObj({...tasksObj});
    }

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},

        ]
    })

    return (
        <div className="App">
            {
// Здесь мы используем метод map для обхода массива todoLists - это массив
// списков дел. Каждый элемент массива представляется как
// tl (сокращение от todoList).
                todoLists.map((tl) => {
// Для каждого списка дел (tl) мы получаем соответствующий массив задач
// из объекта tasksObj на основе id списка дел. Этот массив сохраняется
// в переменной tasksForTodolist.
                    let tasksForTodolist = tasksObj[tl.id];
// Мы проверяем, установлен ли фильтр списка дел (tl.filter) в значение
// "Completed". Если фильтр установлен в "Completed", мы фильтруем массив
// задач (tasksForTodolist), оставляя только те задачи, у которых свойство
// isDone равно true. Таким образом, мы получаем массив завершенных задач.
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
// Мы проверяем, установлен ли фильтр списка дел (tl.filter) в значение
// "Active". Если фильтр установлен в "Active", мы фильтруем массив задач
// (tasksForTodolist), оставляя только те задачи, у которых свойство
// isDone равно false. Таким образом, мы получаем массив активных
// (невыполненных) задач.
                    if (tl.filter === "Active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }

        </div>
    );
}


export default App;
