// src/components/SpeechGenerator.tsx
import { useEffect, useRef } from 'react';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true,
    maxRetries: 0,
});

const SpeechGenerator: React.FC<{ inputText: string }> = ({ inputText }) => {
    const speechFile = path.resolve('./public/speech.mp3');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const generateSpeech = async () => {
            try {
                const mp3 = await openai.audio.speech.create({
                    model: 'tts-1',
                    voice: 'onyx',
                    input: inputText,
                });

                const blob = new Blob([await mp3.arrayBuffer()], { type: 'audio/mpeg' });
                const url = URL.createObjectURL(blob);

                if (audioRef.current) {
                    audioRef.current.src = url;
                    audioRef.current.play();
                }

                console.log('Speech generated and played');
            } catch (error) {
                console.error('Error generating speech:', error);
            }
        };

        generateSpeech();
    }, [inputText, speechFile]);

    return (
        <div>
            <audio ref={audioRef} controls />
        </div>
    );
};

export default SpeechGenerator;
