import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
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
