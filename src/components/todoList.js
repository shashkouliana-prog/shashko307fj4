function TodoList({ tasks = [] }) {
  const tasksList = tasks.map((task, index) => (
    <li key={index}>{task}</li>
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