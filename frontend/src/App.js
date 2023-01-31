import "./App.css";

import { Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Router
import { Route, Routes, useNavigate } from "react-router-dom";

import { useState, useCallback } from "react";

//Components
import Dashboard from "./pages/Dashboard/Dashboard";
import Stopwatch from "./pages/Stopwatch/Stopwatch";
import Login from "./pages/Auth/Login";

function App() {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const userTasks = [];

  const setName = (name) => {
    setUserName(name);
  };
  // console.log(userName);

  const startManagement = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const newTask = useCallback(() => {
    navigate("/timer");
  }, [navigate]);

  const finishTask = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login startManagement={startManagement} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard newTask={newTask} userName={userName} />}
        />
        <Route path="/timer" element={<Stopwatch finishTask={finishTask} />} />
      </Routes>
    </div>
  );
}

export default App;
