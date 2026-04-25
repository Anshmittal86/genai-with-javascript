import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const response = await client.chat.completions.create({
  model: 'gemini-3-flash-preview',
  messages: [
    { role: 'system', content: 'You are helpful ai assistant.' },
    { role: 'user', content: 'What is 2 + 2?' }
  ]
});

console.log(response.choices[0].message.content);
