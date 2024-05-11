'use client';

import { useState } from 'react';
import { startChat } from '../../utils/Gemini';
import Markdown from 'react-markdown';

var chatGemini = null;

const Chat = ({ apiKey }) => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (!chatGemini) {
        console.log("apiKey", apiKey)
        chatGemini = startChat(apiKey);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setQuestion('')
        setMessages([...messages, { text: question, sender: 'Você' }]);

        const result = await chatGemini.sendMessage(question);
        const response = result.response;
        const message = response.text()

        setMessages([...messages, { text: question, sender: 'Você' }, { text: message, sender: 'Gemini' }]);
        setIsLoading(false)
    };

    return (
        <div className="container mx-auto">
            {messages.map((message, index) => (
                <div key={index} className={`mb-4 rounded-lg p-4 ${message.sender === 'você' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {message.sender} disse: <Markdown>{message.text}</Markdown>
                </div>
            ))}
            <form onSubmit={handleSubmit} className="flex flex-wrap">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="text-black border mr-2 my-2 p-2 rounded flex-grow"
                    disabled={isLoading}
                />
                <button id="buttonSubmit" type="submit" className="bg-blue-500 text-white my-2 ml-0 md:ml-2 p-2 rounded">
                    {isLoading ? 'Carregando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};

export default Chat;
