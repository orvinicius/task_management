import "./App.css";

import { Navigate } from "react-router-dom";

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

function App() {
  const { auth, loading } = useAuth();

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
    navigate("/");
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/user/:id" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/user/:id" />}
          />
          <Route
            path="/"
            element={
              auth ? (
                <Dashboard newTask={newTask} userName={userName} />
              ) : (
                <Navigate to="/login" />
              )
            }
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
            path="/user/:id"
            element={auth ? <Tasks /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
