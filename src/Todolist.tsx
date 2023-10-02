import React from "react";
import {FilterValuesType} from "./App";

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id:number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return <li><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {props.removeTask(t.id)}}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("All")} }>All</button>
                <button onClick={() => {props.changeFilter("Active")} }>Active</button>
                <button onClick={() => {props.changeFilter("Completed")} }>Completed</button>
            </div>
        </div>
    );
}