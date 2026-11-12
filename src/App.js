import './App.css';
import TodoList from './components/todoList';
import UpdateList from './components/updateList';
import { useState } from 'react';

function App() {
  const [tasks, updateTasks] = useState(['Task 1', 'Task 2', 'Task 3']);

  const addTask = (newTask) => {
    updateTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (indexToRemove) => {
    updateTasks((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const editTask = (indexToEdit, newTitle) => {
    updateTasks((prev) =>
      prev.map((task, i) => (i === indexToEdit ? newTitle : task))
    );
  };

  return (
    <div className='container'>
      <h2>Tasks list</h2>
      <UpdateList onAddTask={addTask} />
      <TodoList tasks={tasks} onDelete={removeTask} onEdit={editTask} />
    </div>
  );
}

export default App;