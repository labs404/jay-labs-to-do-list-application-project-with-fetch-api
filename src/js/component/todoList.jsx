import React, { useEffect, useState } from "react";

const TodoList = () => {
	const [newTodo, setNewTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [counter, setCounter] = useState(0);

    let placeHolderList = [];

    function play() {
        var audio = new Audio('https://github.com/labs404/jay-labs-to-do-list-application-project/raw/0fa42c9c528dd65480a721e7f2d28504904751eb/src/sound/pop-sound.mp3');
        audio.play();
        return;
    };

    function handleKeyPress(key) {
        if (key.key === "Enter") {
            addToTodoList();
        };
    };

    function addToTodoList() {
        let newTodoObject = {
            done: false,
            id: counter,
            label: newTodo
        };
        setTodoList([...todoList, newTodoObject])
        setCounter(counter + 1);
        play();
        setNewTodo("");
        assignNewTask();
    };

    function assignNewTask() {
        let newTodoList = [...todoList, { label: newTodo, done: false, id: counter }];
        setCounter(counter + 1);
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404",{
            method: 'PUT',
            body: JSON.stringify(newTodoList),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
                .catch(error => console.log(error))
                console.log("// start assignNewTask()");
                console.log(todoList);
                console.log("// end assignNewTask()")
    };

    function removeFromTodoList(itemIdentifier) {
        let workingList = todoList.filter(item => item != itemIdentifier);
        setTodoList([...workingList]);
        setCounter(counter + 1);
        console.log("task deleted successfully");
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404",{
            method: 'PUT',
            body: JSON.stringify(workingList),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    };

    useEffect(() => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404")
        .then(response => {
            if (!response.ok) {
                setTodoList(placeHolderList);
                setCounter(placeHolderList.length + 1);
                createUser();
            }
            else {
                return response.json();
            };
        })
        .then(data => {
            if (!data) {
                console.log("API data not found, placeholder array used.");
            }
            else {
                setTodoList(data);
                setCounter(data.length + 1);
            }
        });
    }, []);


    function createUser() {
        let emptyList = [];
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404",{
            method: 'POST',
            body: "[]",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        setTodoList(emptyList);
    };

    function clearList() {
        let clearList = [];
        console.log(todoList);
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404",{
            method: 'DELETE',
            body: "[]",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        setTodoList(clearList);
        createUser();
        setTodoList(clearList);
    };

    let mappedTasks = todoList.map(task => {
        return (
            <div key={task.id} className="task-lines">
                <div className="individual-task">
                    {task.label}
                </div>
                <div className="trashcan-logo">                
                    <button className="removeFromTodoButton" onClick={() => removeFromTodoList(task)}>
                        <img className="trashcan-img" src="https://raw.githubusercontent.com/labs404/jay-labs-to-do-list-application-project/5af34e644d3b15174c8a6be259b3bbee3f61ccf6/src/img/trash-can-svgrepo-com.svg" />
                        &nbsp; delete task..
                    </button>
                </div>
            </div>    
        );
    });

	return (
        <>
			<div className="todo-container">
				<div className="todo-h1">
					Jay's To-Do list
				</div>
				<div className="todo-input-field">
					<input 
						type="text" 
						className="controlled-input"
						onChange={(e) => setNewTodo(e.target.value)}
						value={newTodo}
                        onKeyDown={(e) => handleKeyPress(e)}
                        placeholder="enter your tasks here!"
					/>
				</div>
				<div className="todo-list-content">
                    {todoList.length > 0 ? <>{mappedTasks}</> : <>your to-do list is empty. enter some tasks above.</>}
				</div>
				<div className="todo-task-counter">
					{todoList.length > 0 ? <>Active tasks: {todoList.length}</> : <></>}
				</div>
			</div>
            <button className="btn btn-danger btn-lg m-1" onClick={() => clearList()}>Clear the List!</button>
        </>
	);
};

export default TodoList;