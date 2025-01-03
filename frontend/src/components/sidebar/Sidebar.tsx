import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      {/* search input */}
      <SearchInput />
      <div className="divider px-3"></div> {/*divider line*/}
      {/* conversations */}
      <Conversations />
      {/* logout button */}
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
