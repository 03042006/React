import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const [editingId, setEditingId] = useState(null); // Keeps track of the ID of the todo being edited
  const [editInput, setEditInput] = useState(''); // Holds the current value of the edit input

  const [activeTab, setActiveTab] = useState('all'); // State to track the active tab

    // Fetch Todos from localstorage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
        }
  }, [])
  
  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  useEffect(() => {
    console.log(todos);
  }, [todos])
  
  
  

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false, id: uuidv4() }]);
      setInput("");
      // Display the toast
      const toast = document.getElementById("toast-success");
      toast.classList.remove("hidden");
      toast.classList.add("flex")
      setTimeout(() => {
        toast.classList.add("hidden");
        toast.classList.remove("flex")
      }, 1000);
    }
  };

  const handleDelete = (id)=>{
    const newTodos = todos.filter((item)=> item.id !== id);
    setTodos(newTodos);
    const toast = document.getElementById("toast-danger");
    toast.classList.remove("hidden");
    toast.classList.add("flex")
    setTimeout(() => {
      toast.classList.add("hidden");
      toast.classList.remove("flex")
    }, 1000);
  };

  const handleEdit = (id)=>{
    setEditingId(id)
    const todoToEdit = todos.find((todo)=> todo.id === id)
    setEditInput(todoToEdit.text)
  }

  const saveTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editInput } : todo
    );
    setTodos(updatedTodos); // Update the todos state with the edited todo
    setEditingId(null); // Exit edit mode
    setEditInput(''); // Clear the edit input
  };

  const handleCancel = (id)=>{
    setEditingId(null)
    setEditInput('')
  }

  const handleStatus = (id)=>{
    const updatedTodos = todos.map((todo)=> todo.id === id ? {...todo, completed:!todo.completed } : todo);
    setTodos(updatedTodos);
  }
  

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return todo.completed;
    if (activeTab === 'pending') return !todo.completed;
  });



  return (
    <>
      <div id="toast-success" className=" hidden absolute right-[3%] top-[3%] items-center w-full max-w-xs p-4 mb-4 bg-[#15101c] rounded-lg shadow" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-purple-600 ">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
              <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal text-purple-700">Item added successfully.</div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-transparent text-purple-900 hover:text-purple-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-[#0d0a12] inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
        </div>


      <div id="toast-danger" className=" hidden absolute right-[3%] top-[3%] items-center w-full max-w-xs p-4 mb-4 bg-[#15101c] rounded-lg shadow" role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-purple-600  rounded-lg">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal text-purple-700">Item has been deleted.</div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-transparent text-purple-900 hover:text-purple-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-[#0d0a12] inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-danger" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>



      <div className="text-white w-full h-screen flex flex-col items-center overflow-x-hidden">
        <form className="form m-3 mt-16 p-3 h-min w-1/2 text-center justify-center flex flex-row gap-1">
          <input
            value={input}
            onChange={handleChange}
            type="text"
            placeholder="Add a new Task"
            className=" w-3/4 text-sm p-2 px-4 rounded-lg border border-purple-400 bg-transparent"
          />
          <button
            className="bg-purple-600 p-1 px-3 text-center text-xl border-none rounded-lg"
            onClick={handleAdd}
          >
            <img src="./public/assets/add.svg" alt="Add" />
          </button>
        </form>
        <h2 className="text-left">Tasks - {todos.length} </h2>

        <div className="tabs w-1/2 min-h-[4rem] flex justify-between gap-4 mt-4 p-3">
          <button
            className={`tab-button ${activeTab === "all" ? "active line" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`tab-button ${
              activeTab === "completed" ? "active line" : ""
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <button
            className={`tab-button ${
              activeTab === "pending" ? "active line" : ""
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
        </div>

        <div className="todos w-1/2 h-3/4 mt-8">
          <ul className="h-full flex flex-col gap-4">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="todo flex gap-4 min-h-[20%] border-none rounded-lg justify-between p-4 px-8 items-center text-purple-600 "
              >
                {editingId === todo.id ? (
                  <input
                    className="bg-transparent outline-none"
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                ) : (
                  <p
                    className={
                      todo.completed ? "line-through text-green-500 " : "todo-text"
                    }
                  >
                    {todo.text}
                  </p>
                )}
                <div className="todoactions flex gap-4">
                  {editingId === todo.id ? (
                    <>
                      {" "}
                      <button onClick={() => saveTodo(todo.id)}>Save</button>
                      <button onClick={() => handleCancel(todo.id)}>
                        Cancel
                      </button>{" "}
                    </>
                  ) : (
                    <>
                      {todo.completed ? (
                        <>
                        <button onClick={() => handleStatus(todo.id)}>
                          <img src="./public/assets/back.svg" alt="undo" />
                        </button>
                        <button onClick={() => handleDelete(todo.id)}>
                        <img
                          src="./public/assets/del.svg"
                          alt="Delete"
                          className="w-6"
                        />
                      </button>
                      </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(todo.id)}>
                            <img
                              src="./public/assets/pen.svg"
                              alt="Edit"
                              className="w-6"
                            />
                          </button>
                          <button onClick={() => handleDelete(todo.id)}>
                            <img
                              src="./public/assets/del.svg"
                              alt="Delete"
                              className="w-6"
                            />
                          </button>
                          <button onClick={() => handleStatus(todo.id)}>
                            <img
                              src="./public/assets/tick.svg"
                              alt="Mark"
                              className="w-6"
                            />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;