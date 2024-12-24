import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

function Message({ message }: { message: MessageType }) {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const fromMe = message?.senderId === authUser?.id;

  const profileImage = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;

  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    // chat-end: sent by me
    // chat-start: sent by other person
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profileImage} alt="chat bubble component" />
        </div>
      </div>
      {/* message content */}
      <div className={`chat-bubble text-white ${bubbleColor} ${shakeClass}`}>
        {message.body}
      </div>
      {/* timestamp */}
      <div
        className={`chat-footer text-slate-300 opacity-50 text-xs flex gap-1 items-center`}
      >
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
