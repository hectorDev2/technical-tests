import { createRoot } from "react-dom/client";
import { App } from "./App";
import React from "react";
import "./style.css";

const container = document.getElementById("app");
if (!container) {
  throw new Error("Failed to find the app element");
}
const root = createRoot(container);

root.render(<App />);
