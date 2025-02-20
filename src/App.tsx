import React, { useState } from "react";
import "./App.css";
import { Button } from "@/index";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello</h1>
      <div className="card">
        <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
        <p>Count: {count}</p>
      </div>
    </>
  );
}

export default App;
