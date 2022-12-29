import "./App.css";

import { useState, useCallback } from "react";

//Components
import Dashboard from "./components/Dashboard";
import Start from "./components/Start";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "dashboard" },
  { id: 3, name: "stopwatch" },
];

function App() {
  const [appStage, setAppStage] = useState(stages[0].name);

  const startManagement = useCallback(() => {
    setAppStage(stages[1].name);
  }, []);

  return (
    <div className="App">
      {appStage === "start" && <Start startManagement={startManagement} />}
      {appStage === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;
