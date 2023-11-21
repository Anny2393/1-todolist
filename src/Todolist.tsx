import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoList: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: TodolistPropsType) {
// newTaskTitle - это переменная состояния, которая будет содержать заголовок новой задачи
// в списке дел.
// setNewTaskTitle - это функция, которая будет использоваться для обновления значения переменной
// newTaskTitle.
// useState("") - задает начальное значение переменной состояния newTaskTitle пустой строкой.
    const [newTaskTitle, setNewTaskTitle] = useState("");
// error - переменная состояния, которая будет содержать сообщение об ошибке (если таковое возникнет).
// setError - функция для обновления значения переменной error.
// useState<string | null>(null) - устанавливает начальное значение переменной error в null,
// что означает отсутствие ошибки. Тип string | null указывает, что error может быть строкой или null.
    const [error, setError] = useState<string | null>(null);

// функция для обновления заголовка новой задачи при вводе пользователем. Функция принимает
// аргумент e, который представляет собой объект события изменения (ChangeEvent)
// и обозначает событие изменения значения ввода (<input>).
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
// Внутри функции используется функция setNewTaskTitle для обновления состояния компонента.
// e.currentTarget.value - это значение, которое было введено пользователем в поле ввода.
// e.currentTarget представляет элемент, который вызвал событие (в данном случае, элемент ввода),
// и .value возвращает текущее значение этого элемента.
// setNewTaskTitle - это функция, созданная с использованием хука состояния useState. Она принимает
// новое значение (в данном случае, значение введенное пользователем) и обновляет состояние
// переменной newTaskTitle в компоненте.
        setNewTaskTitle(e.currentTarget.value)
    }

// Этот код относится к обработке событий клавиатуры в React-приложении для реагирования
// на нажатие клавиши.
// Здесь объявляется константа onKeyPressHandler, представляющая функцию обработки
// событий. Она принимает аргумент e, который представляет объект события клавиатуры
// (KeyboardEvent) и обозначает событие, произошедшее при нажатии клавиши.
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
// Эта строка устанавливает значение переменной состояния error в null. это сделано
// для очистки сообщения об ошибке при каждом нажатии клавиши.
        setError(null);
// Эта часть кода проверяет, была ли нажата клавиша Enter (код клавиши 13, который представляет Enter).
// Если условие выполняется, то вызывается функция addTask().
// e.charCode === 13: Это условие проверяет, равен ли код клавиши 13, что соответствует клавише Enter.
        if (e.charCode === 13) {
// Если условие истинно, то вызывается функция addTask(). эта функция используется для добавления
// новой задачи в список дел.
            addTask();
        }
    }

// Добавление новой задачи
    const addTask = () => {
// Эта строка проверяет, если обрезанное (без пробелов в начале и в конце) значение переменной
// newTaskTitle не является пустой строкой.
        if (newTaskTitle.trim() !== "") {
// Если условие выполняется: Эта строка вызывает функцию addTask, передавая в нее обрезанное
// значение newTaskTitle и значение props.id
            props.addTask(newTaskTitle.trim(), props.id);
// Эта строка устанавливает значение newTaskTitle в пустую строку, очищая его после успешного
// добавления задачи.
            setNewTaskTitle("");
// Если условие не выполняется: Если обрезанное значение newTaskTitle оказывается пустой строкой,
// тогда устанавливается сообщение об ошибке в "Title is required".
        } else {
            setError("Title is required");
        }
    }

    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />

                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {props.removeTask(t.id, props.id )}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                            }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}