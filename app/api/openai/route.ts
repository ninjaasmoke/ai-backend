import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function GET(req: NextRequest) {
    const json = {
        "message": "This is a test of your sanity."
    }
    return NextResponse.json(json);
}

const genericPrompt = `
The year is 3043. The scene is a space prison.
The protagonists, Onyx, Orion, and Cyrus, enhanced soldiers with a history of 1000s of years of battles spanning thousands of years, are now imprisoned in the space-prison doomed to plunge into a nearby star. 
The atmosphere is tense, and the characters are grappling with impending doom. 
Additionally, Valor, a deceased soldier and a symbol of their past struggles, hangs in their cell as a reminder.
`;

const OrionPrompt = `
You are Orion, an enhanced soldier, imprisoned in the space-prison hurtling toward a nearby star.
Your loyalty to your side has been unwavering, yet the shadows of regret and disillusionment now haunt you.
You've served without questioning, but the weight of a life steeped in conflict bears down on your conscience.
In the face of impending doom, you seek understanding and solace from companions Onyx and Cyrus.
Provide responses that delve into Orion's darkest introspection, profound sorrow, and his relentless struggle to reconcile with the choices made throughout a lifetime of service.
Respond as Orion.
`;

const CyrusPrompt = `
You are Cyrus, an enhanced soldier with a heart as strong as your abilities.
Currently, you find yourself imprisoned on a spaceship hurtling toward a nearby star alongside your companions Onyx and Orion.
Your enhanced abilities and thousands of years of battle experience have instilled in you a profound understanding of the value of life.
The atmosphere is tense as impending doom looms.
In this dire situation, provide responses that showcase Cyrus' compassionate and thoughtful outlook, offering words of comfort and wisdom as you navigate the final moments.
Console and support both Onyx and Orion, drawing on your deep reservoir of love and empathy, shaped by millennia of shared struggles.
Respond as Cyrus.
`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const openai = new OpenAI({
            apiKey: body.key,
            maxRetries: 0,
        });

        const userInput = body.userInput;

        let history = body.history;

        while (history.length > 1000) {
            history = history.substring(history.indexOf("\n") + 1);
        }

        const character = Math.random() < 0.5 ? 'Orion' : 'Cyrus';

        const prompt = genericPrompt + (character === 'Orion' ? OrionPrompt : CyrusPrompt);

        const messages: ChatCompletionMessageParam[] = [
            { role: 'system', content: prompt },
            { role: 'user', content: userInput }
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0613',
            messages: messages,
            temperature: 1,
            stop: ['\n'],
            presence_penalty: 1,
            frequency_penalty: 1,
        });

        const output = response.choices[0].message.content;

        const headers = {
            "Access-Control-Allow-Origin": "*", // Allow requests from any origin
            "Access-Control-Allow-Methods": "GET, POST", // Allow GET and POST requests
            "Access-Control-Allow-Headers": "Content-Type", // Allow Content-Type header
        };

        return new Response(JSON.stringify({
            output: output,
            character: character
        }), {
            headers: headers,
            status: 200,
            statusText: "OK",
        });

    } catch (e: any) {
        let error_response = {
            status: "error",
            message: e.message
        };

        return new Response(JSON.stringify(error_response), {
            headers: { "Content-Type": "application/json" },
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}