import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function GET(req: NextRequest) {
    const json = {
        "message": "This is a test of your sanity."
    }
    return NextResponse.json(json);
}

/*
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

const speechFile = path.resolve("./speech.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();

*/

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const body = await req.json();

        const openai = new OpenAI({
            apiKey: body.key,
            maxRetries: 0,
        });

        const text = body.text;
        const voice = body.voice;

        const rmp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: voice,
            input: text,
        });

        const mp3 = Buffer.from(await rmp3.arrayBuffer());

        return NextResponse.json({
            status: 200,
            body: mp3,
            headers: {
                "Content-Type": "audio/mpeg"
            }
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