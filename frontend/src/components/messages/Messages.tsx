import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

function Messages() {
  //messages (from useGetMessages()) is a global value,
  //so when you send a message, it gets added to the messages array
  //that causes it to automatically re-render the Messages component
  //and we can instantly see the new message

  const { loading, messages } = useGetMessages();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <p className="text-center text-white">Loading...</p>}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
