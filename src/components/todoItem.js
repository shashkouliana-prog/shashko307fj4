import { useState } from 'react';

function TodoItem({ task, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task);

  const save = () => {
    if (draft.trim()) {
      onEdit(index, draft.trim());
      setIsEditing(false);
    }
  };

  const cancel = () => {
    setDraft(task);
    setIsEditing(false);
  };

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {isEditing ? (
        <>
          <input
            style={{ flex: 1 }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <button onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{task}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;