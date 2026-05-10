import React, { useState } from 'react'
import axios from 'axios';
import { Mic } from 'lucide-react';

interface AiProps {
  setAiOutput: React.Dispatch<React.SetStateAction<string | null>>
}

const keys = [
  import.meta.env.VITE_GEMMA_API_KEY_1,
  import.meta.env.VITE_GEMMA_API_KEY_2,
  import.meta.env.VITE_GEMMA_API_KEY_3,
].filter(Boolean);

let keyIndex = 0;

const InputBar: React.FC<AiProps> = ({setAiOutput }) => {
  const [value, setValue] = useState('');

  const handleAudioTranscription = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { console.warn('Speech recognition not supported'); return; }

    const recognition = new SR();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results as any[])
        .map((r: any) => r[0].transcript)
        .join('');
      setValue(transcript);
    };
    recognition.start();
  };
  const sendToGroq = async (): Promise<void> => {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `McKinsey SM. Mock BA interview. Be harsh, no tips, challenge weak logic, interrupt rambling.`
        },
        { role: 'user', content: value }
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  setAiOutput(response.data.choices[0].message.content);
};

  const sendToGemma = async (attempt = 0): Promise<void> => {
    if (attempt >= keys.length) {
      console.error('All keys exhausted');
      return;
    }

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemma-4-26b-a4b-it:free',
          max_tokens: 300,
          messages: [
            {
              role: 'system',        
              content: `McKinsey SM. Mock BA interview. Be harsh, no tips, challenge weak logic, interrupt rambling.`
            },
            {
              role: 'user',          
              content: value
            }
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${keys[keyIndex]}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5173',
          },
        }
      );
      setAiOutput(response.data.choices[0].message.content);

    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 429 || status === 401) {
        console.warn(`Key ${keyIndex + 1} failed (${status}), switching...`);
        keyIndex = (keyIndex + 1) % keys.length;
        await sendToGemma(attempt + 1); 
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="input-bar">
      <textarea
        className="input-textarea"
        placeholder="Type a message..."
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        rows={1}
      />
      <Mic onClick={handleAudioTranscription} />
      <button className="send-btn" onClick={() => sendToGroq()} aria-label="Send message">Send</button>
    </div>
  );
};

export default InputBar;