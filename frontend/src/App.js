import React, { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch("http://backend:5000/api")  // Update the API URL here
      .then((res) => res.json())
      .then((data) => setTime(data.time));
  }, []);

  return (
    <div>
      <h1>React + Node + PostgreSQL App</h1>
      <p>Server Time: {time}</p>
    </div>
  );
}

export default App;

