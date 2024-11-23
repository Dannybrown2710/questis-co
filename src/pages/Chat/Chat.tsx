import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./Chat.css";
import ChatChartData from "./component/ExpenseDataChart.tsx";
import mockChartData from "../../mock/chartdata.json";
import mockAutomationData from "../../mock/automationdata.json";
import AutomationData from "./component/AutomationData.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
interface IMessage {
  id: number;
  sender: string;
  text: string;
}
const Chat = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [input, setInput] = useState("");

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
    <div className="chat-container">
      <div className="chat-card">
        {/* Header */}
        <div className="chat-header">
          <svg
            className="w-5 h-5"
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
          <h2 className="header-text">PARTHEAN AI</h2>
          <button className="menu-button">&times;</button>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {/* Existing Component */}
          <div className="w-full h-auto p-6 relative">
            {/* User Messages */}
            <div className="space-y-2">
              <div className="user-message">
                <div className="user-message-text">AH</div>
                <p className="w-[85%]">
                  Could you tell me what a five-day trip to Ireland would cost
                  me?
                </p>
              </div>

              {/* Bot Response */}
              <div className="bot-response">
                <div
                  style={{ backgroundColor: "#ffb0ff" }}
                  className="bot-response-icon"
                >
                  &#9733;
                </div>
                <div className="bot-response-text">
                  <ChatChartData mockChartData={mockChartData} />
                  <div className="dive-button-container">
                    {/* Deep Dive Button */}
                    <button
                      style={{ backgroundColor: "#ffb0ff" }}
                      className="action-button"
                    >
                      DEEP DIVE &nbsp;
                      <span className="addition-icon">+</span>
                    </button>
                    <AutomationData automationData={mockAutomationData} />
                    <button
                      style={{ backgroundColor: "#dab4ff" }}
                      className="action-button"
                    >
                      CREATE AUTOMATION &nbsp;
                      <span className="addition-icon">+</span>
                    </button>
                  </div>
                </div>
              </div>
              {messages.map((message) => (
                <div className="user-message">
                  <div className="user-message-text">AH</div>
                  <p className="w-[85%]">{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-container">
          <div className="footer-box">
            <input
              type="text"
              className="message-input"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="send-message-button" onClick={handleSendMessage}>
              &#8593;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
