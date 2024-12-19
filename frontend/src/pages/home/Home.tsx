import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* sidebar to show conversations */}
      <Sidebar />

      {/* chat window for a conversation*/}
      <MessageContainer />
    </div>
  );
}

export default Home;
