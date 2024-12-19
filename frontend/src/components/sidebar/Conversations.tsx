import Conversation from "./Conversation";

function Conversations() {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* list of conversations */}
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}

export default Conversations;
