/** @format */
import { useReducer } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { initialTasks } from "./data/data";
import tasksReducer from "./reducer/reducer";
export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const nextId = (data) => {
    const maxId = data.reduce((pre, current) =>
      pre && pre.id > current.id ? pre.id : current.id
    );
    return maxId + 1;
  };

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId(tasks),
      text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
