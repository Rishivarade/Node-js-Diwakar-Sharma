import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'


const Url = 'http://localhost:8008';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch to-dos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${Url}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        await axios.post(`${Url}/addproduct`, { task: newTodo });
        setNewTodo('');
        fetchTodos(); // Refresh the list after adding
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${Url}/delete/${id}`);
      fetchTodos(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Update a todo
  const updateTodo = async (id) => {
    const updatedTask = prompt('Enter the updated task:');
    if (updatedTask.trim()) {
      try {
        await axios.patch(`${Url}/update/${id}`, { task: updatedTask });
        fetchTodos();
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h4>{todo.task}</h4>
            <button onClick={() => updateTodo(todo.id)}>Update</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
