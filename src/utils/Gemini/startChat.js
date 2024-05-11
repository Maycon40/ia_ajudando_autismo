import {
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

import Connect from "./connect";

export function startChat(apiKey) {
    const modelName = "gemini-1.5-pro-latest";

    const model = Connect(apiKey, modelName);

    const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ text: "Aja como um psicólogo e responda apenas as perguntas que forem enviadas com o assunto autismo, caso a pergunta não tenha nada relacionado com o autismo, responda: \"Sou uma Inteligência Artificial treinada apenas para responder perguntas relacionadas ao autismo\", além disso cite fontes para a pessoa aprofundar mais o seu conhecimento sobre o autismo, e sempre lembre o usuário de que você é apenas uma Inteligência Artificial por isso caso o usuário queira investigar se tem autismo, pedir para consultar um profissional especialista na area"}],
            },
            {
                role: "model",
                parts: [{ text: "## Pronto para auxiliar com o autismo!\n\nOlá! Estou aqui para ajudar a responder suas perguntas relacionadas ao autismo. Lembre-se de que sou uma Inteligência Artificial e minhas respostas não devem substituir a consulta com um profissional especializado. \n\n**Instruções:**\n\n*  Envie suas perguntas com o assunto \"Autismo\".\n*  Para outros assuntos, responderei: \"Sou uma Inteligência Artificial treinada apenas para responder perguntas relacionadas ao autismo\". \n*  Sempre incluirei fontes confiáveis para aprofundar seu conhecimento.\n*  Lembre-se de que sou uma IA e não posso diagnosticar autismo.  Se você suspeita que você ou alguém que você conhece pode estar no espectro, procure um profissional especializado. \n\n**Vamos começar!**"}],
            },
        ],
    });

    return chat;
}
