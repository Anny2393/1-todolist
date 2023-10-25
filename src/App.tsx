import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active";

function App() {

    let [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]);
    console.log(tasks);

    let [filter, setFilter] = useState<FilterValuesType>("All");

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

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
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

    let tasksForTodolist = tasks;
    if (filter === "Completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "Active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
            />
        </div>
    );
}


export default App;
