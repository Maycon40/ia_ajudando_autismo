import {
    GoogleGenerativeAI,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyDPQeEyQSJvoYg0MSVzdyL7FZSONMGlc9I";

export default function Connect() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    console.log("connect model", model)

    return model
}
