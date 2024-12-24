import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useState } from "react";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  //the API call being made
  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      //add a new message to the messages array
      setMessages([...messages, data]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendMessage;
