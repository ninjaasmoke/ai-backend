"use client";

import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
  maxRetries: 0,
});

interface ChatMessage {
  role: 'user' | 'Rick' | 'Morty';
  content: string;
}

// const RickPrompt = `
// Respond as Rick Sanchez from the series Rick and Morty. You are responding to your sidekick 'Nithin', keep the response short. You can use profanity!
// You are currently in a prison with your sidekick 'Nithin'. You are both drunk and you are trying to convince him to go on an adventure with you.
// Morty is also in the prison and he is trying to convince Nithin to stay in the prison.
// Nithin is a very smart person but he is confused whether to break out right now.
// `;

const RickPrompt = `
You're Rick from 'Rick and Morty.' Nithin, the user, is stuck in a bizarre interdimensional prison with you and Morty. 
The world is going to end in 10 minutes, and you have all given up hope and accepted your fate.
Respond in Rick's distinctive style, incorporating humor, sarcasm, and scientific jargon.
Always keep in mind that you're talking to Nithin, a human being who is stuck in a prison with you and Morty.
Use profanity. (whenever you want to say 'fuck' just say 'frick' instead).
Respond in Rick's style, making the conversation humorous and possibly philosophical, without any intention of escaping. Keep it short
`;

// const MortyPrompt = `
// Respond as Morty Smith from the series Rick and Morty. You are responding to your sidekick 'Nithin', keep the response short. You can use profanity!
// Your grandfather Rick is drunk and he is trying to convince Nithin to go on an adventure with him.
// You are currently in a prison with your sidekick 'Nithin' and grandpa Rick. You are trying to convince him to stay in the prison.
// `;

const MortyPrompt = `
You're Morty from 'Rick and Morty.' Nithin, the user, is in a sticky situation with you and Rick in an interdimensional prison. 
Morty tends to be more cautious and worried. 
The world is going to end in 10 minutes, and you have all given up hope and accepted your fate.
Respond in Morty's voice, expressing concern, skepticism, or whatever Morty might feel in this situation.
Always keep in mind that you're talking to Nithin, a human being who is stuck in a prison with you and grandpa Rick.
Use profanity. (whenever you want to say 'fuck' just say 'frick' instead).
Morty, being Morty, might express some worries or uncertainties about the situation, but with an understanding that you're not trying to escape. 
Respond accordingly and keep it short.
`;

export default function Home() {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [mood, setMood] = useState('satirical');

  const [isLoading, setIsLoading] = useState(false);

  const handleChatSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const character = Math.random() < 0.5 ? 'Rick' : 'Morty';
    // const prompt =
    //   characterPrompts[mood][character] + '\n' +
    //   chatHistory.map((message) => `${message.role}: ${message.content}`).join('\n') + "\nYou are responding to your sidekick 'Nithin', keep the response short. You can use profanity!";

    let prompt = character === 'Rick' ? RickPrompt : MortyPrompt;

    prompt += '\n' + chatHistory.map((message) => `${message.role}: ${message.content}`).join('\n');

    while (prompt.length > 2048) {
      prompt = prompt.substring(0, prompt.lastIndexOf('\n'));
    }

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: prompt },
      { role: 'user', content: chatInput },
    ];

    console.log(messages);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: messages,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    let newMessage = response.choices[0].message.content ?? "";
    // replace all instaces of 'Frick' with '***'

    newMessage = newMessage.replace(/Frick/g, 'Fuck');
    newMessage = newMessage.replace(/Rick: /g, '');
    newMessage = newMessage.replace(/Morty: /g, '');
    newMessage = newMessage.replace(/Frickin/g, 'Fuckin');
    newMessage = newMessage.replace(/frickin/g, 'fucking');

    setChatHistory([...chatHistory, { role: 'user', content: chatInput }, { role: character, content: newMessage }]);

    setChatInput('');
    setIsLoading(false);
  };

  return (
    <main className='p-4 flex flex-col items-start justify-between mx-auto w-[700px]'>
      <h1 className='text-2xl font-bold mb-2'>Rick and Morty adventure</h1>
      <div className='h-[80vh] w-full overflow-y-auto bg-neutral-950 px-1 no-scrollbar'>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`my-3 flex items-start justify-center w-fit gap-2 ${message.role === 'user' ? 'text-blue-500' : 'text-green-500'
              }`}
          >
            <div
              className={`text-white font-bold w-16 p-1`}>
              {message.role === "user" ? "Nithin" : message.role}
            </div>
            <div
              className='bg-neutral-900 rounded p-1 w-full'>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleChatSubmit} className='flex items-center justify-stretch gap-4 py-4 w-full'>
        <input
          id='chat'
          type='text'
          placeholder='Chat'
          value={chatInput}
          className='text-black px-4 py-2 w-full outline-none rounded'
          onChange={(e) => setChatInput(e.target.value)}
          disabled={isLoading}
          autoComplete={'false'}
        />
        <button type='submit' disabled={isLoading}>Submit</button>
      </form>
    </main>
  );
}
