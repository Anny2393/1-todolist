import React, { useState } from 'react';
import './App.css';
import { TasksPropsType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";


export type FilterValuesType = "All" | "Completed" | "Active";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}

function App() {

// Удаление таски
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj});
    }

// Добавление новой таски
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj});
    }

// функция для изменения статуса (выполнено/не выполнено) в определённом списке
    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }
    }

// функция для изменения текущего фильтра в определенном списке
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

// Этот код создает два уникальных идентификатора. Таким образом, переменная
// todolistId1 и todolistId2 получает уникальный идентификатор, который может
// быть использован для идентификации различных списков дел в приложении.
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]);

// Удаление списка дел
    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList);

        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    }

    function changeTodoListTitle(id: string, newTitle: string) {
       const todolist = todoLists.find(tl => tl.id === id);
       if (todolist) {
           todolist.title = newTitle;
           setTodoLists([...todoLists]);
       }
    }

    let [tasksObj, setTasksObj] = useState <TasksStateType>({
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

    function addTodolist(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: "All",
            title: title,
        };
        setTodoLists([todolist, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
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
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                })
            }

        </div>
    );
}


export default App;
