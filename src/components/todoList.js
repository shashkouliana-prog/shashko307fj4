function TodoList({ tasks = [], onDelete }) {
  const tasksList = tasks.map((task, index) => (
    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ flex: 1 }}>{task}</span>
      <button
        onClick={() => onDelete(index)}
        aria-label={`Delete task ${index + 1}`}
        style={{ padding: '4px 8px' }}
      >
        Delete
      </button>
    </li>
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