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
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }


    const addTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("");
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