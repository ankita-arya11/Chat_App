// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import MainDiv from "./components/mainDiv";
// import ChatInput from "./components/ChatInput";
// import "./index.css";


// const socket = io("http://localhost:3000/");


// function App() {
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [is_Entered, setIs_Entered] = useState(false);
//   const [isJoined, setIsJoined] = useState(false);
//   const [generatedRoom, setGeneratedRoom] = useState("");
//   const [isRoomIDEntered, setIsRoomIDEntered] = useState(false);



//   useEffect(() => {
//     socket.on("messageResponse", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("user-joined", (notification) => {
//       setMessages((prev) => [...prev, { username: "System", text: notification }]);
//     });

//     socket.on("user-left", (notification) => {
//       setMessages((prev) => [...prev, { username: "System", text: notification }]);
//     });

//     socket.on("previous-messages", (prevMessages) => {
//       setMessages(prevMessages);
//     });

//     socket.on("room-created", (roomID) => {
//       setGeneratedRoom(roomID);
//       setRoom(roomID);
//       setIsJoined(true);
//     });

//     return () => {
//       socket.off("messageResponse");
//       socket.off("user-joined");
//       socket.off("user-left");
//       socket.off("previous-messages");
//       socket.off("room-created");
//     };
//   }, []);



//   const handleRoomAction = (roomID) => {
//     if (roomID.trim() === "") {
//       setIs_Entered(false);
//       setIsRoomIDEntered(false);
//     } else {
//       setIs_Entered(true);
//       setIsRoomIDEntered(true);
//     }
//   };



//   // const createRoom = () => {
//   //   if (username.trim()) {
//   //     socket.emit("create-room", username);
//   //   }
//   // };

//   const createRoom = () => {
//     if ((!is_Entered) && username.trim()) {
//       socket.emit("create-room", username); 
//       console.log("Room created successfully!");
//     } else if (!username.trim()) {
//       alert("Please enter your name before creating a room.");
//     } else if (isRoomIDEntered) {
//       alert("Room ID is already entered. Please join an existing room.");
//     } else {
//       alert("Cannot create room. Please clear the Room ID field first.");
//     }
//   };

//   const joinRoom = () => {
//     if (username.trim() && room.trim()) {
//       socket.emit("join-room", { username, room });
//       setIsJoined(true);
//     } else {
//       alert("Please enter both username and room ID.");
//     }
//   };

//   const addMessage = (text) => {
//     socket.emit("user-message", { room, message: text });
//   };


//   return (
//     <div>
//       {!isJoined ? (
//         <div className="join-container">
//           <input
//             style={{height:'30px'}}
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           /> <br/><br/>
//           <button style={{backgroundColor:'lightgreen' , fontSize: '15px', borderRadius:'40px'}} onClick={createRoom}>Create Room</button><br/><br/><br/>
//           <input
//             style={{ height: "30px" }}
//             type="text"
//             placeholder="Enter room ID to join"
//             value={room}
//             onChange={(e) => {
//             handleRoomAction(e.target.value);
//             if (is_Entered) {
//               console.log("roomID entered, join existing room");
//             } else {
//               setRoom(e.target.value);
//             }
//           }}
//         />
          
//           <br/><br/>
//           <button style={{backgroundColor:'lightgreen', fontSize: '15px', borderRadius:'40px'}} onClick={joinRoom}>Join Room</button>
//           {generatedRoom && <p>Room ID: <strong>{generatedRoom}</strong></p>}
//         </div>
//       ) : (
//         <>
//           <h1 style={{ textAlign: "center" }}>Chatroom: {room || generatedRoom}</h1>
//           <div className="chat-container">
//             <div className="chat-messages">
//               <MainDiv messages={messages} />
//             </div>
//             <div className="chat-input">
//               <ChatInput addMessage={addMessage} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
//   }



// export default App;


// const socket = io("http://192.168.101.32:4000");