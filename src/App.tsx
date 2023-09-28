import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let tasks1 = [
        {id: 1, title: "CSS&HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]

    let arr = useState(tasks1);

    let tasks = arr[0];
    let setTasks = arr[1];

    function deleteTask(id: number) {
        let filteredTasks = tasks1.filter(task => task.id !== id)
        setTasks(filteredTasks);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks1}
                      deleteTask={deleteTask}
            />
        </div>
    );
}


export default App;
