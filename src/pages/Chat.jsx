import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import mockChartData from "../mock/chartdata.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chartData = {
    labels: [""],
    datasets: mockChartData,
  };

  const chartOptions = {
    indexAxis: "y",
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { display: false } },
      y: { stacked: true, grid: { display: false }, ticks: { display: false } },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "user", text: input },
      ]);
      setInput("");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md h-full md:h-[90%] md:rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
          <h2 className="text-lg font-semibold">PARTHEAN AI</h2>
          <button className="text-gray-500 text-xl font-bold">&times;</button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Existing Component */}
          <div className="w-full h-auto p-6 relative">
            {/* User Messages */}
            <div className="space-y-2">
              <div className="flex rounded-xl p-2 bg-white justify-between w-full items-center">
                <div className="w-8 h-8 bg-gray-100 text-black flex justify-center items-center rounded-full">
                  AH
                </div>
                <p className="w-[85%]">
                  Could you tell me what a five-day trip to Ireland would cost
                  me?
                </p>
              </div>

              {/* Bot Response */}
              <div className="flex justify-between w-full items-center p-2">
                <div className="w-8 h-8 bg-pink-500 text-white flex justify-center items-center rounded-full self-start mt-4">
                  &#9733;
                </div>
                <div className="bg-gray-100 rounded-lg w-[85%]">
                  <p>
                    Absolutely! Based on my research, a 5-day trip to Ireland
                    would be roughly $1,900.
                  </p>
                  <div className="mt-4">
                    {/* Chart */}
                    <div className="w-full h-8">
                      <Bar data={chartData} options={chartOptions} />
                    </div>
                  </div>
                  <div className="text-sm space-y-1 mt-4">
                    <p className="flex justify-between">
                      <span>
                        <span className="text-blue-500">&#9679;</span> AIRFARE
                      </span>
                      $1,000
                    </p>
                    <p className="flex justify-between">
                      <span>
                        <span className="text-pink-500">&#9679;</span>{" "}
                        ACCOMMODATION
                      </span>
                      $500
                    </p>
                    <p className="flex justify-between">
                      <span>
                        <span className="text-green-500">&#9679;</span> FOOD AND
                        DRINK
                      </span>
                      $250
                    </p>
                    <p className="flex justify-between">
                      <span>
                        <span className="text-yellow-500">&#9679;</span>{" "}
                        TRANSPORTATION
                      </span>
                      $100
                    </p>
                    <p className="flex justify-between">
                      <span>
                        <span className="text-teal-500">&#9679;</span>{" "}
                        ACTIVITIES
                      </span>
                      $50
                    </p>
                  </div>
                  <div className="mb-10 pt-4 flex flex-col space-y-2 items-start">
                    {/* Deep Dive Button */}
                    <button
                      style={{ backgroundColor: "#ffb0ff" }}
                      className="px-4 py-2 rounded-full shadow-lg"
                    >
                      DEEP DIVE +
                    </button>
                    <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
                      <p>
                        <strong>GOAL NAME:</strong> IRELAND TRIP
                      </p>
                      <p>
                        <strong>AMOUNT:</strong> $100
                      </p>
                      <p>
                        <strong>FREQUENCY:</strong> EVERY WEEK
                      </p>
                      <p>
                        <strong>TARGET AMOUNT:</strong> $1,900
                      </p>
                      <p>
                        <strong>TRANSFER TO:</strong> PARTHEAN POD
                      </p>
                    </div>
                    <button
                      style={{ backgroundColor: "#dab4ff" }}
                      className="bg-purple-500 px-4 py-2 rounded-full shadow-lg"
                    >
                      CREATE AUTOMATION +
                    </button>
                  </div>
                </div>
              </div>
              {messages.map((message) => (
                <div className="flex rounded-xl p-2 bg-white justify-between w-full items-center">
                  <div className="w-8 h-8 bg-gray-100 text-black flex justify-center items-center rounded-full">
                    AH
                  </div>
                  <p className="w-[85%]">{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 relative">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="p-4 w-[100%] rounded-lg border-none text-lg"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="w-[2.5rem] h-[2.5rem] absolute bg-black text-white p-2 rounded-full right-10"
              onClick={handleSendMessage}
            >
              &#8593;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
