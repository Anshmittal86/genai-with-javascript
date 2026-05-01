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

const message_history = [
  { role: 'system', content: SYSTEM_PROMPT },
  { role: 'user', content: 'What is a solution of 2000 + 300 - 456 ** 8 // 4 / 45 % 6 * 7 + 300' },
]


while (true) {

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: message_history
  })

  const raw_result = response.choices[0].message.content;

  message_history.push({ 'role': 'assistant', 'content': raw_result });

  const parsed_result = JSON.parse(raw_result);

  if (parsed_result['step'] === 'START') {
    console.log(`🔥: ${parsed_result['content']}`)
    continue
  }

  if (parsed_result['step'] === 'PLAN') {
    console.log(`🧠: ${parsed_result['content']}`)
    continue
  }

  if (parsed_result['step'] === 'OUTPUT') {
    console.log(`🤖: ${parsed_result['content']}`)
    break
  }
}
