import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Zero shot Prompting :- Give directly instruction to the model.
const SYSTEM_PROMPT = `
  You are an expert in mathematics. Your task is to solve user query based on only and only math related question, if user ask something not related to math so that you can say 'Sorry I not able to answer this.'
`

const response = await client.chat.completions.create({
  model: 'gemini-3-flash-preview',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: 'How to make Green tea?' }
  ]
});

console.log(response.choices[0].message.content);
