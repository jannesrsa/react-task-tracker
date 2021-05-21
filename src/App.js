import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);
  const serverUrl =
    "https://development-dotnet-webapi.azurewebsites.net/api/v1";
  // "https://my-json-server.typicode.com/jannesrsa/react-task-tracker";

  useEffect(() => fetchTasks(), []);

  // Fetch tasks
  const fetchTasks = () => {
    fetch(`${serverUrl}/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`${serverUrl}/tasks/${id}`, { method: "DELETE" })
      .then(setTasks(tasks.filter((task) => task.id !== id)))
      .catch(console.error);
  };

  // Add Task
  const addTask = (task) => {
    const maxId = Math.max(...tasks.map((res) => res.id ?? 0), 0);
    const id = maxId + 1;

    const newTask = { id, ...task };

    fetch(`${serverUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]))
      .catch(console.error);
  };

  // Toggle Add Form
  const showAddTask = () => {
    setShowAdd(!showAdd);
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    const selectedTask = tasks.find((task) => task.id === id);
    const updatedTask = { ...selectedTask, reminder: !selectedTask.reminder };

    fetch(`${serverUrl}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then(
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, reminder: !task.reminder } : task
          )
        )
      )
      .catch(console.error);
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
