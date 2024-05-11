"use client";

import { useAuthContext } from '@/providers';
import { startChat } from '@/utils/Gemini';

const ChatForm = ({ apiKey }) => {
    const { question, setQuestion, messages, setMessages, isLoading, setIsLoading } = useAuthContext();

    console.log("startChat", startChat)

    const chatGemini = startChat(apiKey);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        setQuestion('')
        setMessages([...messages, { text: question, sender: 'Você' }]);

        try {
            const result = await chatGemini.sendMessage(question);
            const response = result.response;
            const message = response.text()

            setMessages([...messages, { text: question, sender: 'Você' }, { text: message, sender: 'Gemini' }]);
        } catch (e) {
            alert('Erro na conexão com Inteligência Artificial. Verifique se a API Key é válida!')
        }

        setIsLoading(false)
    };

    return (
        <>
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
        </>
    )
}

export default ChatForm;
