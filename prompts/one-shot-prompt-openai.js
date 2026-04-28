import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new OpenAI();

// One shot Prompting :- Give directly instruction to the model with only one example.
const SYSTEM_PROMPT = `
  You are an expert in mathematics. Your task is to solve user query based on only and only math related question, if user ask something not related to math so that you can say 'Sorry I not able to answer this.'


  Example:- 
  Q:- What is 10 / 5?
  Answer:- okay 10 / 5 is 2.
`

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: 'What is the square root of 35.' }
  ]
});

console.log(response.choices[0].message.content);
