import React from "react";

import { UseState } from "./UseState";
import { ClassState } from "./ClassState";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UseState name="Use pinky" />
      <ClassState name="Class pacha" />
    </div>
  );
}

export default App;
