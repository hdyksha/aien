import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { getInitialTheme } from "./utils/theme";

// Apply initial theme class to document
document.documentElement.classList.add(getInitialTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
