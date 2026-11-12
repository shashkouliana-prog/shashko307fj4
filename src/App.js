import './App.css';
import TodoList from './components/todoList';
import UpdateList from './components/updateList';
import { useState } from 'react';

function App() {
  const [tasks, updateTasks] = useState([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: false },
  ]);
  const [filter, setFilter] = useState('all'); // all | active | done

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    updateTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (id) => {
    updateTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    updateTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const toggleTask = (id) => {
    updateTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'done') return task.completed;
    return true;
  });

  const doneCount = tasks.filter((task) => task.completed).length;

  return (
    <div className='container'>
      <h2>Tasks list</h2>
      <UpdateList onAddTask={addTask} />

      <div className='stats'>
        Всього: {tasks.length} | Виконано: {doneCount} | Залишилось: {tasks.length - doneCount}
      </div>

      <div className='filters'>
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Всі</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Активні</button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Виконані</button>
      </div>

      <TodoList
        tasks={visibleTasks}
        onDelete={removeTask}
        onEdit={editTask}
        onToggle={toggleTask}
      />
    </div>
  );
}

export default App;