import React, { useState } from 'react';

const Message = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      recipient: "Jane Smith",
      content: "Can you help me with question 5 on the homework?",
      date: "2023-12-01",
    },
    {
      id: 2,
      sender: "Jane Smith",
      recipient: "John Doe",
      content: "Sure, what do you need help with?",
      date: "2023-12-01",
    },
  ]);

  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "You",
          recipient: currentChat,
          content: newMessage,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewMessage("");
    }
  };

  const contacts = ["Jane Smith", "Alice Johnson"];

  return (
    <div className="flex min-h-screen">
      {/* Contacts List */}
      <div className="w-1/3 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`p-2 mb-2 cursor-pointer rounded ${currentChat === contact ? "bg-blue-200" : "bg-white"}`}
            onClick={() => setCurrentChat(contact)}
          >
            {contact}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {currentChat ? (
          <>
            <div className="flex-grow p-4 overflow-auto">
              <h2 className="text-xl font-bold mb-4">{currentChat}</h2>
              {messages
                .filter((msg) => msg.sender === currentChat || msg.recipient === currentChat)
                .map((message) => (
                  <div key={message.id} className={`mb-2 p-2 rounded ${message.sender === "You" ? "bg-blue-100 self-end" : "bg-gray-200"}`}>
                    <p><strong>{message.sender}:</strong> {message.content}</p>
                    <p className="text-xs text-gray-500">{message.date}</p>
                  </div>
                ))}
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Type a message"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-grow p-4 flex items-center justify-center">
            <p className="text-gray-500">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
