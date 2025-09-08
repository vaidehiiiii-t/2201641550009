import React, { useEffect } from "react";
import "./App.css";
import { Log } from "./lib/logger";

function App() {
  useEffect(() => {
    (async () => {
      try {
        await Log("frontend", "info", "component", "app started");
      } catch (e) {
        //
      }
    })();
  }, []);

  return <div>URL Shortener</div>;
}

export default App;
