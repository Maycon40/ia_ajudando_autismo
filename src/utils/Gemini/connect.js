"use strict";

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export default function Connect(apiKey, modelName) {
  const apiKey2 = process.env.API_KEY;
  console.log("api key", apiKey2);
  const genAI = new GoogleGenerativeAI(apiKey2);
  const model = genAI.getGenerativeModel({ model: modelName });

  return model;
}
