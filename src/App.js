import './App.css';
import TodoList from './components/todoList';
import UpdateList from './components/updateList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// jsonplaceholder зберігає лише 200 завдань. Усе, що створене нами, існує тільки локально
const isServerTask = (id) => id <= 200;

function App() {
  const [tasks, updateTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | done

  // GET: завантаження завдань при першому відображенні компонента
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL, { params: { _limit: 8 } });
        const loaded = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        }));
        updateTasks(loaded);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Не вдалося завантажити завдання');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // POST: додавання нового завдання
  const addTask = async (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    try {
      await axios.post(API_URL, { title, completed: false, userId: 1 });
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Не вдалося надіслати завдання на сервер');
    }
    updateTasks((prev) => [...prev, newTask]);
  };

  // DELETE: видалення завдання
  const removeTask = async (id) => {
    try {
      if (isServerTask(id)) await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Не вдалося видалити завдання на сервері');
    }
    updateTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // PUT: редагування тексту завдання
  const editTask = async (id, newTitle) => {
    const current = tasks.find((t) => t.id === id);
    try {
      if (isServerTask(id)) {
        await axios.put(`${API_URL}/${id}`, { ...current, title: newTitle });
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Не вдалося оновити завдання на сервері');
    }
    updateTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  // PATCH: трекінг, тобто відмітка виконано / не виконано
  const toggleTask = async (id) => {
    const current = tasks.find((t) => t.id === id);
    try {
      if (isServerTask(id)) {
        await axios.patch(`${API_URL}/${id}`, { completed: !current.completed });
      }
    } catch (err) {
      console.error('Error toggling task:', err);
      setError('Не вдалося змінити статус на сервері');
    }
    updateTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done') return t.completed;
    return true;
  });

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div className='container'>
      <h2>Tasks list</h2>
      <UpdateList onAddTask={addTask} />

      {error && <p className='error'>{error}</p>}

      <div className='stats'>
        Всього: {tasks.length} | Виконано: {doneCount} | Залишилось: {tasks.length - doneCount}
      </div>

      <div className='filters'>
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Всі</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Активні</button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Виконані</button>
      </div>

      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <TodoList
          tasks={visibleTasks}
          onDelete={removeTask}
          onEdit={editTask}
          onToggle={toggleTask}
        />
      )}
    </div>
  );
}

export default App;