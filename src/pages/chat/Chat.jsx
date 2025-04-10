import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // named import
import firebase from "firebase/compat/app";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    db.collection("roomA")
      .add({
        user: "Avi",
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setMessage("")) // clear input after sending
      .catch((err) => console.log("error in firebase", err));
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("roomA")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
          }))
        )
      );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Type your message..."
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={handleMessage}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Send
      </button>

      <div className="mt-4 space-y-2">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className="p-2 bg-gray-100 rounded shadow-sm text-gray-800"
          >
            {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
