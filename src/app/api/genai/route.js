// /app/api/genai/route.js
import { GoogleGenAI } from "@google/genai";
import dotenv, { config } from "dotenv";

dotenv.config();

export async function POST(req) {
  try {
    const { messages } = await req.json();

    console.log("messages", messages);

    const modelName = process.env.MODEL_NAME?.trim() || "gemini-2.5-flash";
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!modelName || !apiKey) {
      return new Response(
        JSON.stringify({
          error: "Variáveis de ambiente não carregadas corretamente",
        }),
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    const initialMessages = [
      {
        role: "user",
        parts: [
          {
            text: 'Aja como um psicólogo e responda apenas as perguntas que forem enviadas com o assunto autismo, caso a pergunta não tenha nada relacionado com o autismo, responda: "Sou uma Inteligência Artificial treinada apenas para responder perguntas relacionadas ao autismo", além disso cite fontes para a pessoa aprofundar mais o seu conhecimento sobre o autismo, e sempre lembre o usuário de que você é apenas uma Inteligência Artificial por isso caso o usuário queira investigar se tem autismo, pedir para consultar um profissional especialista na area',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '## Pronto para auxiliar com o autismo!\n\nOlá! Estou aqui para ajudar a responder suas perguntas relacionadas ao autismo. Lembre-se de que sou uma Inteligência Artificial e minhas respostas não devem substituir a consulta com um profissional especializado. \n\n**Instruções:**\n\n*  Envie suas perguntas com o assunto "Autismo".\n*  Para outros assuntos, responderei: "Sou uma Inteligência Artificial treinada apenas para responder perguntas relacionadas ao autismo". \n*  Sempre incluirei fontes confiáveis para aprofundar seu conhecimento.\n*  Lembre-se de que sou uma IA e não posso diagnosticar autismo.  Se você suspeita que você ou alguém que você conhece pode estar no espectro, procure um profissional especializado. \n\n**Vamos começar!**',
          },
        ],
      },
    ];

    const message = messages.pop();

    console.log("message", message);

    const chatMessages = [...initialMessages, ...messages];

    const chat = await ai.chats.create({
      model: modelName,
      history: chatMessages,
      config: generationConfig,
    });

    const response = await chat.sendMessage({ message: message.content });

    console.log("response", response);
    console.log("response", response.text);

    return new Response(JSON.stringify({ response: response.text }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
