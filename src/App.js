import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    "https://development-dotnet-webapi.azurewebsites.net/api/v1";
  // "https://my-json-server.typicode.com/jannesrsa/react-task-tracker";

  // Fetch tasks
  const fetchTasks = () => {
    fetch(`${serverUrl}/tasks`)
      .then((res) => res.json())
      .then((returnedTasks) => {
        setTasks(returnedTasks);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => fetchTasks(), []);

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
    <Router>
      <div className="container">
        <Header onShowAdd={showAddTask} />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAdd && <AddTask className="none" onAdd={addTask} />}
              {loading === true ? (
                <BarLoader loading={loading} css={override} size={150} />
              ) : tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks to show"
              )}
            </>
          )}
        ></Route>

        <Route path="/about" component={About}></Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
