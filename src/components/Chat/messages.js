"use client";

import Markdown from 'react-markdown';

import { useAuthContext } from '@/providers';

const ChatMessages = () => {
    const { messages } = useAuthContext();

    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className={`mb-4 rounded-lg p-4 ${message.sender === 'Você' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {message.sender} disse: <Markdown>{message.text}</Markdown>
                </div>
            ))}
        </>
    )
}

export default ChatMessages
