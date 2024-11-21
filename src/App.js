import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate(); // Hook to access navigation

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-20">Finley</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/survey")}
          className="px-6 py-3 bg-white text-indigo-600 font-medium text-lg rounded-lg shadow-lg hover:bg-indigo-100 transition"
        >
          Survey
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="px-6 py-3 bg-white text-indigo-600 font-medium text-lg rounded-lg shadow-lg hover:bg-indigo-100 transition"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default App;
