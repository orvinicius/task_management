import "./App.css";

import { useState, useCallback } from "react";

//Components
import Dashboard from "./components/Dashboard";
import Start from "./components/Start";
import Stopwatch from "./components/Stopwatch";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "dashboard" },
  { id: 3, name: "stopwatch" },
];

function App() {
  const [appStage, setAppStage] = useState(stages[0].name);

  const [userName, setUserName] = useState("");

  const setName = (name) => {
    setUserName(name);
  };
  // console.log(userName);

  const startManagement = useCallback(() => {
    setAppStage(stages[1].name);
  }, []);

  const newTask = useCallback(() => {
    setAppStage(stages[2].name);
  }, []);

  const finishTask = useCallback(() => {
    setAppStage(stages[1].name);
  }, []);

  return (
    <div className="App">
      {appStage === "start" && (
        <Start startManagement={startManagement} setName={setName} />
      )}
      {appStage === "dashboard" && (
        <Dashboard newTask={newTask} userName={userName} />
      )}
      {appStage === "stopwatch" && <Stopwatch finishTask={finishTask} />}
    </div>
  );
}

export default App;
