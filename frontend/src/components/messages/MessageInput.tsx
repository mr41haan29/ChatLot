import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {
  const [message, setMessage] = useState(""); //the message to send
  const { loading, sendMessage } = useSendMessage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message.trim()) return;

    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 mb-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        {/* input field to type message */}
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        {/* send button */}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <IoMdSend />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
