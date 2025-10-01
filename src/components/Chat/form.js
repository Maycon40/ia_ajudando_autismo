"use client";

import { useAuthContext } from "@/providers";

const ChatForm = () => {
  const {
    question,
    setQuestion,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
  } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) {
      alert("Preencha o campo e depois clique em enviar");
      return;
    }

    setIsLoading(true);
    const allMessages = [...messages, { content: question, role: "user" }];
    const userMessage = { content: question, role: "user" };
    setMessages([...messages, userMessage]);

    console.log("messages", allMessages);
    console.log("question", question);

    setQuestion("");

    //        try {
    const res = await fetch("/api/genai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: allMessages }),
    });

    console.log("res", res);

    const data = await res.json();
    console.log("data", data);

    const response = data.response;

    setMessages([
      ...messages,
      userMessage,
      { content: response, role: "model" },
    ]);
    //        } catch (e) {
    //    alert(
    //      "Erro na conexão com Inteligência Artificial. Verifique se a API Key é válida!"
    //    );
    //        }

    setIsLoading(false);
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
        <button
          id="buttonSubmit"
          type="submit"
          className="bg-blue-500 text-white my-2 ml-0 md:ml-2 p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Enviar"}
        </button>
      </form>
    </>
  );
};

export default ChatForm;
