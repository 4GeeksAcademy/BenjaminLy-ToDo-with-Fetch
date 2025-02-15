import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const url = "https://playground.4geeks.com/apis/fake/todos/user/benly1"
    const [taskList, setTaskList] = useState([])

    useEffect(async () =>{
        const response = await fetch(url)
        const data = await response.json()
        setTaskList(data.map((task) => task.label))
    }, [])

    useEffect(() =>{
        console.log(taskList)
        if (taskList.length){
            fetch (url, {
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(taskList.map((task) => {
                    return {label: task, done: false}
                }))
            })
        }
    } ,[taskList])


    const [task, setTask] = useState('')
    function addTasks(e) {
        if (e.key === 'Enter') {
            if (task === "") {
                alert(`Please enter a task`);
            } else {
                setTaskList([...taskList, task]);
                setTask('');
            }
        }
    }

    function deleteTasks(idx) {
        setTaskList(taskList.filter((item, index) => index !== idx));
    }

    return (
        <div className="col-12 h-100">
            <h1>todos</h1>
            <div>
                <div className="container d-flex justify-content-center text-center bg-transparent">
                    <input className="form-control w-50" type="text" placeholder="What needs to be done" aria-label="Disabled input example" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={addTasks} required />
                </div>
                <div className="container d-flex justify-content-center text-left bg-transparent">
                    <ul className="list-group list-group-flush w-50 bg-transparent">
                        {taskList.map((item, idx) => <li className="list-group-item bg-transparent" key={idx}>{item}<button type="button" className="btn float-end bg-transparent" onClick={() => deleteTasks(idx)}><FontAwesomeIcon icon={faX} /></button> </li>)}
                    </ul>

                </div>
            </div>
            <div className="container d-flex justify-content-center text-left bg-transparent">
                {taskList.length} tasks left
            </div>
        </div>
    )
}

export default App