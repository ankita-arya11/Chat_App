import React from "react";

function MainDiv({ messages, username }) {
  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.username === username ? "sent" : "received"}`}
        >
          <strong>{msg.sender}: </strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MainDiv;
