import { useState } from 'react';

function TodoItem({ task, onDelete, onEdit, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = () => {
    if (draft.trim()) {
      onEdit(task.id, draft.trim());
      setIsEditing(false);
    }
  };

  const cancel = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  return (
    <li className='task-item'>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            className='edit-input'
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <button onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <span className={task.completed ? 'title done' : 'title'}>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;