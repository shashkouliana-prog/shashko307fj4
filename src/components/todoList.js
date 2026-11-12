import TodoItem from './todoItem';

function TodoList({ tasks = [], onDelete, onEdit, onToggle }) {
  if (tasks.length === 0) {
    return <p>Завдань немає</p>;
  }

  const tasksList = tasks.map((task) => (
    <TodoItem
      key={task.id}
      task={task}
      onDelete={onDelete}
      onEdit={onEdit}
      onToggle={onToggle}
    />
  ));

  return (
    <div>
      <ul className='task-list'>
        {tasksList}
      </ul>
    </div>
  );
}

export default TodoList;