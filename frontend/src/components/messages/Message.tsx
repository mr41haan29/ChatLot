function Message() {
  return (
    // chat-end: sent by me
    // chat-start: sent by other person
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="chat bubble component"
          />
        </div>
      </div>
      {/* message content */}
      <div className={`chat-bubble text-white bg-blue-500`}>yo wys</div>
      {/* timestamp */}
      <div
        className={`chat-footer text-slate-300 opacity-50 text-xs flex gap-1 items-center`}
      >
        1:21
      </div>
    </div>
  );
}

export default Message;
