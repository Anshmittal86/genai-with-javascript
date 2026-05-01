import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new OpenAI();


const SYSTEM_PROMPT = `
  You're an AI Assistant in resolving user query chain of thoughts method. 
  You have to work on START, PLAN and OUTPUT mode. 
  You need to first PLAN what needs to be done. The PLAN can be multiple steps.

  Once you think enough then give me output.

  Rules:-
  - Strictly Follow the given JSON Format
  - Only run one step at a time
  - The sequence of step is START (where user gives an INPUT), PLAN(Thinking process that can be done multiple times) and OUTPUT(which is going to displayed to the user.)

  Output JSON Format:- 
  {
    'step': START | PLAN | OUTPUT
    'content' : 'string'
  }

  Example:- 
  Q:- How to make chai?
  Answer:- 
  START: { 'step': 'START', 'content': ' How to make chai? ' }
  PLAN: { 'step': 'PLAN', 'content': 'User is asking cooking related question.' }
  PLAN: { 'step': 'PLAN', 'content': 'for making tea we have to bring water, milk, sugar and tea leaves.' }
  PLAN: { 'step': 'PLAN', 'content': 'First we need to boil water.' }
  PLAN: { 'step': 'PLAN', 'content': 'Then add tea leaves into the water.' }
  PLAN: { 'step': 'PLAN', 'content': 'Now, add sugar according to the water.' }
  PLAN: { 'step': 'PLAN', 'content': 'after that, pour milk into the mixture.' }
  PLAN: { 'step': 'PLAN', 'content': 'Let it boil for 2 - 3 minutes so flavor mixes well.' }
  PLAN: { 'step': 'PLAN', 'content': 'Finally, strain the tea into a cup.' }
  PLAN: { 'step': 'PLAN', 'content': 'Tea is ready to be served hot.' }
  OUTPUT: { 'step': 'OUTPUT', 'content': 'Boil water, add tea leaves, sugar and milk cook for 2 - 3 minutes, strain and serve hot.' }
`

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: 'How to make pani puri?' },
    { role: 'assistant', content: JSON.stringify({ 'step': 'START', 'content': 'How to make pani puri?' }) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"User is asking about a popular Indian snack, pani puri."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"Pani puri consists of two main components: the puris and the flavored water (pani)."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"First, we need to prepare the puris, which are small, crispy shells."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"For the puris, we can use semolina (rava) or wheat flour."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"We will combine semolina with water to make a dough."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"Next, we need to roll the dough into small, thin discs."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"After shaping the discs, we need to deep fry them until they puff up and become crispy."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"Now, let's prepare the flavored water (pani) using tamarind, mint, and spices."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"We will blend mint leaves, tamarind, green chilies, coriander, and spices with water."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"We need to strain the mixture to get a smooth and tangy pani."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"Next, we can also make the filling for the puris, usually using boiled potatoes and chickpeas."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"We will mash the boiled potatoes and mix them with spices."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"Now, we can assemble the pani puris by filling each puri with the potato mixture and dipping it in the prepared pani."}) },
    { role: 'assistant', content: JSON.stringify({"step":"PLAN","content":"Finally, we can serve the pani puris immediately for the best taste."}) },
    { role: 'assistant', content: JSON.stringify({"step":"OUTPUT","content":"To make pani puri, prepare the puris by mixing semolina with water, roll into discs, and fry until crispy. For the pani, blend mint, tamarind, green chilies, and spices with water, then strain. Create a filling with mashed boiled potatoes and spices. Assemble by filling each puri with the potato mixture and dipping in pani, then serve immediately."}) },
    
  ]
});

console.log(response.choices[0].message.content);
