import ChatMessages from './messages';
import ChatForm from './form';

const Chat = ({ apiKey }) => {

    return (
        <div className="container mx-auto">
            <ChatMessages />
            <ChatForm apiKey={apiKey} />
        </div>
    );
};

export default Chat;
