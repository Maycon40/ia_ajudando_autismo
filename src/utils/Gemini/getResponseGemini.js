import Connect from "./connect";
import * as math from "mathjs";

async function generateEmbedding(text, embeddingModel) {
  const result = await embeddingModel.embedContent(text, "RETRIEVAL_DOCUMENT");

  return result["embedding"]["values"];
}

async function query(text, embeddingDocuments, embeddingModel) {
  let result = await embeddingModel.embedContent(text, "RETRIEVAL_QUERY");

  result = result["embedding"]["values"];

  const embeddings = math.matrix(embeddingDocuments);
  const embeddingResult = math.transpose(math.matrix([result]));
  const dot = math.multiply(embeddings, embeddingResult);

  let maxIndex = 0;
  let maxValue = dot.get([0, 0]); // Acessar o valor na posição [0, 0]
  for (let i = 1; i < dot.size()[0]; i++) {
    const value = dot.get([i, 0]); // Acessar o valor na posição [i, 0]
    if (value > maxValue) {
      maxValue = value;
      maxIndex = i;
    }
  }
  const index = maxIndex;

  return index;
}

export async function getResponseGemini(question, response, apiKey) {
  const modelName = "text-embedding-004";
  const embeddingModel = Connect(apiKey, modelName);

  const documents = Object.keys(question.evaluation);

  const embeddingDocuments = [];

  for (const document of documents) {
    const res = await fetch("/api/genai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document }),
    });

    embeddingDocuments.push(embedding);
  }

  const index = await query(response, embeddingDocuments, embeddingModel);

  return documents[index];
}
