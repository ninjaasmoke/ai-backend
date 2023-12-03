// import OpenAI from 'openai';

// const openai = new OpenAI({
//     apiKey: 'YOUR_API_KEY',
// });

// async function conversationFlow(): Promise<void> {
//     let conversationContext: string = '';
//     let conversationMood: string = '';

//     while (true) {
//         const userText = await getUserInput('Enter your message:');
//         const userMoodInput = await getUserMoodInput('Enter the mood of the conversation (gloomy, cheerful, or urgent):');

//         if (!isValidMood(userMoodInput)) {
//             console.error(`Invalid mood option: ${userMoodInput}`);
//             continue;
//         }

//         conversationContext += `${userText}\n`;
//         conversationMood = userMoodInput;

//         const respondingCharacter = Math.random() >= 0.5 ? 'Rick' : 'Morty';

//         const aiResponse = await generateCharacterResponse(openai, conversationContext, respondingCharacter, conversationMood);

//         conversationContext += `${aiResponse}\n`;
//         displayCharacterResponse(respondingCharacter, aiResponse);
//     }
// }

// async function getUserInput(prompt: string): Promise<string> {
//     return await prompt(prompt);
// }

// async function getUserMoodInput(prompt: string): Promise<string> {
//     const moodOptions: string[] = ['gloomy', 'cheerful', 'urgent'];
//     const userMoodInput: string = await prompt(prompt);

//     if (!moodOptions.includes(userMoodInput)) {
//         console.error(`Invalid mood option: ${userMoodInput}`);
//         return await getUserMoodInput();
//     }

//     return userMoodInput;
// }

// function isValidMood(mood: string): boolean {
//     const moodOptions: string[] = ['gloomy', 'cheerful', 'urgent'];
//     return moodOptions.includes(mood);
// }

// async function generateCharacterResponse(openai: OpenAI, conversationContext: string, characterName: string, conversationMood: string): Promise<string> {
//     const characterPrompts: { [mood: string]: any } = {
//         gloomy: {
//             Rick: `Respond as a gloomy Rick Sanchez, burdened by the weight of the universe.`,
//             Morty: `Respond as a gloomy Morty Smith, overwhelmed by the complexities of life.`,
//         },
//         cheerful: {
//             Rick: `Respond as a cheerful Rick Sanchez, embracing the absurdity of existence.`,
//             Morty: `Respond as a cheerful Morty Smith, finding joy in the simplest things.`,
//         },
//         urgent: {
//             Rick: `Respond as an urgent Rick Sanchez, driven by a sense of purpose and danger.`,
//             Morty: `Respond as an urgent Morty Smith, caught up in Rick's latest adventure.`,
//         },
//     };

//     const characterPrompt: string = characterPrompts[conversationMood][characterName];

//     const response = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: conversationContext }],
//         model: 'gpt-3.5-turbo',
//         prompt: characterPrompt,
//     });

//     return response.choices[0].text;
// }

// function displayCharacterResponse(characterName: string, aiResponse: string): void {
//     console.log(`${characterName}: ${aiResponse}`);
// }

// conversationFlow();

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'My API Key', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });
}

main();