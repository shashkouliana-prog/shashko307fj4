import './App.css';
import TodoList from './components/todoList';

function App() {
  let tasks = ['Task 1', 'Task 2', 'Task 3'];

  return (
    <div className='container'>
      <h2>Tasks list</h2>
      <TodoList tasks={tasks} />
    </div>
  );
}

export default App;