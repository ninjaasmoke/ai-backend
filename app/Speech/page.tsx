"use client";

import React, { useState } from 'react'
import SpeechGenerator from './comp';

function Page() {
    const [inputText, setInputText] = useState<string>('');
    const [generateSpeech, setGenerateSpeech] = useState<boolean>(false);
    return (
        <div className='flex flex-col gap-4 p-4'>
            <h1>Next.js Speech Generation</h1>
            <textarea
                className='w-full h-32 p-2 border border-gray-300 rounded-md outline-none resize-none focus:border-blue-500 text-black'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert to speech..."
            />
            <button 
                onClick={() => setGenerateSpeech(!generateSpeech)}
            >
                Test
            </button>
            {generateSpeech && <SpeechGenerator inputText={inputText} />}
        </div>
    )
}

export default Page