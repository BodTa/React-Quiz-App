import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";

console.log(document.getElementById("square"));
console.log(document.getElementById("quiz-container"));
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
