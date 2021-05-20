import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(
    () =>
      fetch("tasks")
        .then((res) => res.json())
        .then(setTasks)
        .catch(console.error),

    []
  );

  // Add Task
  const addTask = (task) => {
    const id = tasks.length + 1;
    const newTask = { id, ...task };

    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const showAddTask = () => {
    setShowAdd(!showAdd);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    // const selectedTask = tasks.find((task) => task.id === id);
    // selectedTask.reminder = !selectedTask.reminder;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );

    // console.log(selectedTask.reminder);
  };

  return (
    <div className="container">
      <Header onShowAdd={showAddTask} />
      {showAdd && <AddTask className="none" onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks to show"
      )}
    </div>
  );
}

export default App;
