import {
     GoogleGenerativeAI,
} from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-1.5-pro-latest";

export default function Connect(API_KEY) {
    console.log('ofdiasoi', process.env)

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    console.log("connect model", model)

    return model
}
