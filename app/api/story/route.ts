import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function GET(req: NextRequest) {
    const json = {
        "message": "This is a test of your sanity."
    }
    return NextResponse.json(json);
}

const StoryPrompt = `The year is 3043. The scene is a space prison.
The protagonists, Onyx, Orion, and Cyrus, enhanced soldiers with a history of 1000s of years of battles spanning thousands of years, are now imprisoned in the space-prison doomed to plunge into a nearby star. 
The atmosphere is tense, and the characters are grappling with impending doom. 
Onyx, Orion, and Cyrus find themselves confined in the cold, dimly lit cell of the space prison hurtling towards the impending embrace of a nearby star. 
The memories of thousands of years of battles, both victories and losses, weigh heavy on their enhanced shoulders.
Orion, haunted by shadows of regret, searches for understanding and solace amidst the impending doom. 
Cyrus, with a heart as strong as his abilities, endeavors to offer words of comfort and wisdom, drawing on a deep reservoir of love and empathy shaped by millennia of shared struggles.
In the midst of this tense atmosphere, Valor's lifeless form hangs in the cell, a stark reminder of the battles fought and sacrifices made. 
As the spaceship hurtles toward the star, the trio must confront their deepest fears, reconcile with past choices, and find a glimmer of hope in the face of certain doom.`;

const UserPrompt = `Your task is to create only a script between Orion and Cyrus, guiding the conversation and decisions of the characters as they navigate this dark moment together. 
Explore the complexities of their relationships and delve into the emotions that arise in these final moments of the space prison journey.

Do not include actions or gestures of characters. Do no explain the scene. Just generate the talking script

Format:
[character]: dialogue without actions or gestures`;

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const openai = new OpenAI({
            apiKey: body.key,
            maxRetries: 0,
        });

        const messages: ChatCompletionMessageParam[] = [
            { role: 'system', content: StoryPrompt },
            { role: 'system', content: UserPrompt },
            { role: 'user', content: body.seed }
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: messages,
            temperature: 1.2,
            max_tokens: 3141,
            top_p: 0.05,
            frequency_penalty: 1.32,
            presence_penalty: 1.58,
        });

        console.log(response);

        console.log(response.choices[0].message.content);

        const output = response.choices[0].message.content;

        return NextResponse.json({
            output: output,
        });

    }
    catch (e: any) {
        let error_response = {
            status: "error",
            message: e.message
        };

        return NextResponse.json(error_response, { status: 500 });
    }
}