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
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

// Эта функция обновляет состояние компонента новым значением, которое пользователь ввел в текстовом поле.
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

// Эта функция служит для обработки события нажатия клавиши "Enter" в текстовом поле и добавляет
// новую задачу на основе значения в текстовом поле, а затем очищает текстовое поле.
// Код символа 13 представляет собой клавишу "Enter" на клавиатуре.
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }

// Эта функция служит для добавления новой задачи.
    const addTask = () => {
// Это условие проверяет, если значение newTaskTitle не является пустой строкой
// после удаления начальных и конечных пробелов с помощью .trim().
// Если newTaskTitle содержит только пробелы или является пустой строкой после
// удаления пробелов, условие не выполнится, и код внутри блока if не будет выполнен.
// Это предотвращает добавление пустой задачи или задачи, состоящей только из пробелов.
        if (newTaskTitle.trim() !== "") {
// Если newTaskTitle не пустой, то функция props.addTask
// вызывается, передавая в нее newTaskTitle, из которого
// удалены начальные и конечные пробелы с помощью .trim().
// Это позволяет добавить новую задачу с очищенным заголовком в список задач.
            props.addTask(newTaskTitle.trim());
// После добавления задачи, значение newTaskTitle устанавливается
// в пустую строку с помощью setNewTaskTitle(""), чтобы очистить поле ввода.
// Это подготавливает поле ввода для добавления следующей задачи.
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
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
                       className={error ? "error" : ""}
                />

                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}

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

                        const onRemoveHandler = () => {props.removeTask(t.id)}

// Функция onChangeHandler привязана к событию onChange элемента <input type="checkbox>.
// Когда пользователь кликает на чекбоксе, вызывается функция onChangeHandler,
// которая выполняет следующее:
// e: ChangeEvent<HTMLInputElement> - принимает объект события ChangeEvent,
// представляющий изменение элемента <input>. В данном случае, это изменение состояния чекбокса.
// props.changeTaskStatus(t.id, e.currentTarget.checked) - вызывает
// функцию props.changeTaskStatus с двумя аргументами: t.id (идентификатор задачи)
// и e.currentTarget.checked (новое состояние чекбокса).
// Это используется для обновления статуса задачи.
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                            }

                        return <li key={t.id}>
{/*// Это элемент для отметки задачи как завершенной или не завершенной.*/}
{/*// Элемент типа "checkbox" позволяет пользователю выбирать или снимать выбор с задачи.                            */}
                            <input type="checkbox"
// Это атрибут onChange связан с функцией onChangeHandler. Эта функция будет вызвана каждый раз,
// когда пользователь изменит состояние (выбрано или не выбрано) чекбокса.
                                   onChange={onChangeHandler}
// Атрибут checked используется для определения состояния чекбокса.
// Если t.isDone равно true, чекбокс будет отмечен, что указывает на то, что задача завершена.
// Если t.isDone равно false, чекбокс не будет отмечен, указывая на то, что задача не завершена.
                                   checked={t.isDone}/>
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