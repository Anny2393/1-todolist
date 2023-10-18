import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");

// Эта функция обновляет состояние компонента новым значением, которое пользователь ввел в текстовом поле.
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

// Эта функция служит для обработки события нажатия клавиши "Enter" в текстовом поле и добавляет
// новую задачу на основе значения в текстовом поле, а затем очищает текстовое поле.
// Код символа 13 представляет собой клавишу "Enter" на клавиатуре.
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }

// Эта функция служит для добавления задачи и очистки текстового поля в React-компоненте.
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }

    const onAllClickHandler = () => props.changeFilter("All");
    const onActiveClickHandler = () => props.changeFilter("Active");
    const onCompletedClickHandler = () => props.changeFilter("Completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />

                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
// props.tasks.map() выполняет перебор каждой задачи в массиве props.tasks.
// Для каждой задачи (t) создается элемент списка <li>. Внутри этого элемента
// есть ключ key={t.id}. Роль ключа (key={t.id}) заключается в следующем:
// 1. Ключи должны быть уникальными внутри списка элементов. В данном случае,
// каждый t.id предполагается уникальным для каждой задачи.
// 2. Когда React перерисовывает компонент, он сравнивает старые элементы с новыми
// по ключам, чтобы определить, какие элементы были добавлены, изменены или удалены.
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}