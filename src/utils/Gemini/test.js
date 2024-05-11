const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyDPQeEyQSJvoYg0MSVzdyL7FZSONMGlc9I";

async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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
        parts: [{ text: "como colocar o cor da letra como preta no tailwind"}],
      },
      {
        role: "model",
        parts: [{ text: "## Definindo a cor da letra como preta no Tailwind CSS\n\nTailwind oferece várias maneiras de definir a cor da letra como preta:\n\n**1. Classes de utilidade:**\n\n*   **`text-black`:** Esta é a classe mais direta para definir a cor do texto como preto.\n\n```html\nEste texto é preto.\n```\n\n**2. Classes de escala de cinza:**\n\n*   **`text-gray-900`:** Esta classe utiliza a escala de cinza do Tailwind e seleciona o tom mais escuro, que é essencialmente preto.\n\n```html\nEste texto também é preto.\n```\n\n**3. Classes de cor personalizadas:**\n\n*   Você pode definir cores personalizadas no arquivo `tailwind.config.js` e depois usá-las em suas classes. \n\n```javascript\n// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        'meu-preto': '#000000',\n      },\n    },\n  },\n}\n```\n\n```html\nEste texto é preto usando uma cor personalizada.\n```\n\n**4. Estilos inline:**\n\n*   Embora não seja a abordagem mais recomendada com o Tailwind, você pode usar estilos inline para definir a cor da letra.\n\n```html\nEste texto é preto usando estilo inline.\n```\n\n**Recomendações:**\n\n*   Utilize as classes de utilidade `text-black` ou `text-gray-900` para a maioria dos casos. Elas são claras e concisas.\n*   Use cores personalizadas se você precisa de um tom específico de preto ou deseja manter a consistência com uma paleta de cores definida.\n*   Evite estilos inline, pois eles vão contra a filosofia do Tailwind de manter os estilos no CSS. \n\n**Lembre-se de que a escolha do método depende das suas necessidades e preferências. O importante é manter a consistência e a clareza no seu código.**"}],
      },
    ],
  });

  const result = await chat.sendMessage("Olá");
  const response = result.response;
  console.log(response.text());
}

runChat();
