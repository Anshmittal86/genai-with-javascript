import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const client = new OpenAI();

const response = await client.chat.completions.create({
	model: 'gpt-4o-mini',
	messages: [
		{ role: 'system', content: 'You are helpful ai assistant.' },
		{ role: 'user', content: 'what is 2 + 2 and kaise ho bhai?' }
	]
});

console.log(response.choices[0].message.content);
