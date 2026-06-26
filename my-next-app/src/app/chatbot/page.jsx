"use client";

import { useState } from "react";

export default function RecommendSkills() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleChatbotClick = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        alert("Please login first");
        return;
      }

      const user_input =
        typeof message === "string"
          ? message.trim()
          : "";

      const res = await fetch(
        "http://127.0.0.1:8000/api/career-coach/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_input,
          }),
        }
      );

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("DATA:", data);

      if (!res.ok) {
        setResponse(
          data.detail ||
            "Something went wrong"
        );
        return;
      }

      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      <div className="text-gray-800 max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          AI Chatbot Recommendations
        </h1>
      </div>

      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-10">
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Enter your message here"
          className="w-full p-3 border rounded-xl text-gray-800 mb-4"
        />

        <button
          onClick={handleChatbotClick}
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Send
        </button>

        {response && (
          <div className="mt-6 p-4 border rounded-xl bg-gray-50 text-gray-800">
            <h2 className="font-semibold mb-2">
              AI Response:
            </h2>
            <div className="whitespace-pre-line">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}