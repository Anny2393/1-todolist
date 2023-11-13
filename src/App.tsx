import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]);
    console.log(tasks);

// Удаление таски
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

// Добавление новой таски
    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false}
// Создание нового массива newTasks с новой таской newTask и добавлением
// после новой таски исходного массива тасок ...tasks
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

// changeStatus - это функция, принимающая два аргумента:
// taskId (идентификатор задачи, которую нужно изменить) и
// isDone (новый статус задачи, true для завершенных задач
// и false для незавершенных).
    function changeStatus(taskId: string, isDone: boolean) {
// выполняется поиск задачи в массиве tasks, используя метод find.
// Этот метод проходит по всем элементам массива tasks и возвращает
// первый элемент, для которого условие внутри функции обратного
// вызова (в данном случае, task.id === taskId) возвращает true.
// Таким образом, мы находим задачу с заданным taskId.
        let task = tasks.find(task => task.id === taskId);
// Если задача была найдена (т.е., task не является undefined),
// то ей присваивается новое значение isDone, переданное как аргумент.
// Это изменяет статус задачи.
        if (task) {
            task.isDone = isDone
        }

// Затем, после изменения статуса задачи, вызывается
// setTasks([...tasks]). Это обновляет состояние tasks, передавая
// в него новый массив задач.
        setTasks([...tasks]);
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
let todoList = todoLists.find(tl => tl.id === todoListId);
if (todoList) {
    todoList.filter = value;
    setTodoLists([...todoLists]);
}
    }

    let [todoLists, setTodoLists] = useState <Array<TodoListType>>([
        {id: v1(), title: "What to learn", filter: "Active"},
        {id: v1(), title: "What to buy", filter: "Completed"}
    ]);

    return (
        <div className="App">
            {
                todoLists.map( (tl) => {

                    let tasksForTodolist = tasks;
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
                    }
                    if (tl.filter === "Active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
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
                    />
                })
            }

        </div>
    );
}


export default App;
