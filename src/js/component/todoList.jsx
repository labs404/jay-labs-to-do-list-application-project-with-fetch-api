import React, { useEffect, useState } from "react";

const TodoList = () => {
	const [newTodo, setNewTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [counter, setCounter] = useState(0);


    function play() {
        var audio = new Audio('https://github.com/labs404/jay-labs-to-do-list-application-project/raw/0fa42c9c528dd65480a721e7f2d28504904751eb/src/sound/pop-sound.mp3');
        audio.play();
        return;
    };

    // function addToTodoList() {
    //     const duplicateCheck = todoList.filter((word) => word == newTodo); 

    //     if (duplicateCheck.length > 0) {
    //         alert("Sorry, no duplicate tasks. Please enter a different task.");
    //         return;
    //     };

    //     if (todoList.length >= 29) {
    //         alert("Holy smokes, that's a lot of tasks! Please complete some tasks and come back");
    //         return;
    //     };

    //     if (newTodo != "" ) {
    //         let newArr = [...todoList, newTodo];
    //         setTodoList(newArr);
    //         setNewTodo("");
    //         play();
    //     };
    // };
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


        // const duplicateCheck = todoList.label.filter((word) => word == newTodo); 

        // if (duplicateCheck.length > 0) {
        //     alert("Sorry, no duplicate tasks. Please enter a different task.");
        //     return;
        // };

        // if (todoList.length >= 29) {
        //     alert("Holy smokes, that's a lot of tasks! Please complete some tasks and come back");
        //     return;
        // };

        // if (newTodo != "" ) {
        //     let newArr = [...todoList, newTodo];
        //     setTodoList(newArr);
        //     setNewTodo("");
        //     play();
        // };
    };

    function removeFromTodoList(itemIdentifier) {
        let workingList = todoList.filter(item => item != itemIdentifier);
        setTodoList(workingList);
    };

    function handleKeyPress(key) {
        if (key.key === "Enter") {
            addToTodoList();
        };
    };

    let mappedTasks = todoList.map(task => {
        return (
            <div key={task.id} className="task-lines">
                <div className="individual-task">
                    {task.label}, {task.done}, {task.id}
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

    useEffect(() => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404")
        .then(response => response.json())
        .then(data => {
            setTodoList(data);
            setCounter(data.length + 1);
            console.log("// start useEffect() test");
            console.log(todoList);
            console.log("// end useEffect() test");
        });
    }, []);

    function assignNewTask() {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/labs404",{
            method: 'PUT',
            body: JSON.stringify(todoList),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw Error(res.statusText);
            return response.json();
        })
        .then(response => {
            console.log('Success: ', response);
        })
        .catch(error => console.log(error))
        console.log("// start assignNewTask() console.log");
        console.log(todoList);
        console.log("// end assignNewTask() console.log")
    }

	return (
			<div>
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
					{/* <button className="addToTodoButton" onClick={addToTodoList}>add this task</button> */}
				</div>
				<div className="todo-list-content">
                    {todoList.length > 0 ? <>{mappedTasks}</> : <>your to-do list is empty. enter some tasks above.</>}
				</div>
				<div className="todo-task-counter">
					{todoList.length > 0 ? <>Active tasks: {todoList.length}</> : <></>}
				</div>
			</div>
	);
};

export default TodoList;