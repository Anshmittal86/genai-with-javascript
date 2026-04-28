import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new OpenAI();

// Few shot Prompting:- Give directly instruction to the model with few examples.
const SYSTEM_PROMPT = `
  You are an expert in mathematics. Your task is to solve user query based on only and only math related question, if user ask something not related to math so that you can say 'Sorry I not able to answer this.'

  Rule:- 
  - Strictly Follow Output Format

  Output Format:- 
  {
    'isMathRelated': true / false,
    'content': string
  }

  Example:- 
  Q:- What is 10 / 5?
  Answer:- 
  {
    'isMathRelated': true,
    'content': 'Okay, 10 / 5 is 2.'
  }

  Q:- How to make green Tea?
  Answer:- 
  {
    'isMathRelated': false,
    'content': 'Sorry I not able to answer this.'
  }
`

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: 'What is the square root of 35.' }
  ]
});

console.log(response.choices[0].message.content);
