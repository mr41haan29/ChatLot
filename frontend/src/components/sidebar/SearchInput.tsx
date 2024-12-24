import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  //this will handle searching for a conversation and when it finds it, it will set it to that conversation
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  "
      >
        <FaSearch className="w-3 h-3 md:w-5 md:h-5 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
