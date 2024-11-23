import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing components
import "./index.css";
import App from "./App.js"; // Home component
import Survey from "./pages/Survey/Survey.tsx"; // Import your Survey component
import Chat from "./pages/Chat/Chat.tsx"; // Import your Chat component
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Home page */}
        <Route path="/survey" element={<Survey />} /> {/* Survey page */}
        <Route path="/chat" element={<Chat />} /> {/* Chat page */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
