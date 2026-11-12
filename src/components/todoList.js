import TodoItem from './todoItem';

function TodoList({ tasks = [], onDelete, onEdit }) {
  const tasksList = tasks.map((task, index) => (
    <TodoItem
      key={index}
      task={task}
      index={index}
      onDelete={onDelete}
      onEdit={onEdit}
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