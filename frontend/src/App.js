import "./App.css";

// Route
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

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

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
              element={auth ? <Stopwatch /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks"
              element={auth ? <Tasks /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
