"use strict";

import {
     GoogleGenerativeAI,
} from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export default function Connect(API_KEY, MODEL_NAME) {
    console.log("api key connect", process.env)

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    return model
}
