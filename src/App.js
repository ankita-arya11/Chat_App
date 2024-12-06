import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import ChatInput from "./components/ChatInput";
import MainDiv from "./components/MainDiv";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const [roomCreated, setRoomCreated] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://192.168.101.32:4000", {
      transports: ["websocket"],
      reconnection: true,
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("receiveMessage", (data) => {
      console.log("Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]); 
    });

    socket.on("roomCreated", (data) => {
      setRoomId(data.roomID);
      setRoomName(data.roomName);
      setRoomCreated(true);
    });

    socket.on("roomJoined", (data) => {
      setRoomId(data.roomID);
      setRoomName(data.roomName);
      setRoomCreated(true);
    });

    socket.on("errorMessage", (error) => {
      alert(error);
    });

    socket.on("connect_error", () => {
      alert("Socket connection failed. Check backend IP or network.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmitUserInfo = () => {
    if (username.trim() && email.trim()) {
      setStep(2);
    } else {
      alert("Please enter both username and email.");
    }
  };

  const handleCreateRoom = () => {
    const socket = socketRef.current;
    if (!socket?.connected) {
      alert("Socket not connected. Please refresh the page.");
      return;
    }
    if (roomName.trim()) {
      socket.emit("createRoom", { username, roomName });
    } else {
      alert("Please enter a room name.");
    }
  };

  const handleJoinRoom = () => {
    const socket = socketRef.current;
    if (!socket?.connected) {
      alert("Socket not connected. Please refresh the page.");
      return;
    }
    if (roomId.trim()) {
      socket.emit("joinRoom", { roomID: roomId, username });
    } else {
      alert("Please enter a room ID.");
    }
  };

  const handleSendMessage = (msg) => {
    const socket = socketRef.current;
    if (!socket?.connected) {
      alert("Socket not connected. Please refresh the page.");
      return;
    }
    if (msg.trim()) {
     
      socket.emit("sendMessage", { roomID: roomId, username, message: msg });
    } else {
      alert("Message cannot be empty.");
    }
  };

  if (step === 1) {
    return (
      <div className="welcome-container">
        <h1>Enter Your Details</h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmitUserInfo}>Submit</button>
      </div>
    );
  }

  if (step === 2 && !roomCreated) {
    return (
      <div className="welcome-container">
        <h1>Room Options</h1>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Room ID (optional)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <div className="button-container">
          <button onClick={handleCreateRoom}>Create Room</button>
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      </div>
    );
  }
// console.log(messages, "hello ");
  return (
    <div className="chat-container">
      <header className="chat-header">
        
        Room Name: {roomName} | Room ID: {roomId}
      </header>
      <div className="messages-container">
        <MainDiv messages={messages} username={username} />
      </div>
      <div id="typemessage" className="input-container">
        <ChatInput sendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
