import "./App.css";

// Router
import { Route, Routes, useNavigate } from "react-router-dom";

import { useState, useCallback } from "react";

//Components
import Dashboard from "./components/Dashboard";
import Start from "./components/Start";
import Stopwatch from "./components/Stopwatch";

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
          path="/"
          element={
            <Start startManagement={startManagement} setName={setName} />
          }
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
