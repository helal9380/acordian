/** @format */
import { useState } from "react";
const Task = ({ task, onDeleteTask, onChangeTask }) => {
  const [edit, setEdit] = useState(false);
  let content;

  if (edit) {
    return (content = (
      <>
        <input
          value={task.text}
          onChange={(e) =>
            onChangeTask({
              ...task,
              text: e.target.value,
            })
          }
        />
        <button onClick={() => setEdit(false)}>Save</button>
      </>
    ));
  } else {
    content = (
      <>
        {task.text}
        <button onClick={() => setEdit(true)}>Edit</button>
      </>
    );
  }
  return (
    <li>
      <input
        onChange={(e) =>
          onChangeTask({
            ...task,
            done: e.target.checked,
          })
        }
        type="checkbox"
        checked={task.done}
      />
      {content}
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default Task;
