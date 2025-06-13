// client/src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Find the root DOM element and create a React root for it
// Then render the app inside React.StrictMode to enable additional checks during development
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);