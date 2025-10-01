"use strict";

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export default function Connect() {
  const model_name = process.env.MODEL_NAME;
  console.log("MODEL_NAME", model_name);
  const API_KEY = process.env.GEMINI_API_KEY;
  console.log("API_KEY", API_KEY);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: model_name });

  return model;
}
