import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Import Bootstrap JS bundle (for carousel, modal, dropdown etc.)
import "bootstrap/dist/js/bootstrap.bundle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
