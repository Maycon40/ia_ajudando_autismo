import ChatMessages from "./messages";
import ChatForm from "./form";

const Chat = () => {
  return (
    <div className="container mx-auto">
      <ChatMessages />
      <ChatForm />
    </div>
  );
};

export default Chat;
