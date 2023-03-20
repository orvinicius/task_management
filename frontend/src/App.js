import "./App.css";

import { Navigate } from "react-router-dom";

// React Calendar

import { Calendar } from "react-calendar";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Router
import { Route, Routes, useNavigate } from "react-router-dom";

import { useState, useCallback } from "react";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Stopwatch from "./pages/Stopwatch/Stopwatch";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Tasks from "./pages/Tasks/Tasks";
import Profile from "./pages/Profile/Profile";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";

function App() {
  const { auth, loading } = useAuth();

  const [taskList, setTaskList] = useState([]);
  const [taskUpdate, setTaskUpdate] = useState(null);

  const navigate = useNavigate();

  // console.log(userName);

  const startManagement = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const newTask = useCallback(() => {
    navigate("/timer");
  }, [navigate]);

  const finishTask = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const hideOrShowModal = (display) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal.classList.remove("hide");
    } else {
      modal.classList.add("hide");
    }
  };

  const editTask = (task) => {
    hideOrShowModal(true);
    setTaskUpdate(task);
  };

  const updateTask = (taskTitle) => {
    const updatedTask = { taskTitle };

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);

    hideOrShowModal(false);
  };

  return (
    <div className="App">
      <Navbar />
      {/* <Calendar /> */}
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/profile"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/timer"
            element={
              auth ? (
                <Stopwatch finishTask={finishTask} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasks"
            element={
              auth ? (
                <Tasks handleEdit={editTask} /> && (
                  <Modal
                    children={
                      <TaskForm
                        btnText="Editar Tarefa"
                        taskList={taskList}
                        task={taskUpdate}
                        handleUpdate={updateTask}
                      />
                    }
                  />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
