import React, { useState } from 'react';
import { generateResponse } from '../services/gemini';
import { generateSpeech } from '../services/elevenlabs';
import { useAvatarStore } from '../store/useAvatarStore';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAudioUrl, setVisemeData, setIsPlaying } = useAvatarStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      // Get response from Gemini
      const response = await generateResponse(message);
      if (!response) return;

      // Generate speech and viseme data
      const { audioUrl, visemeData } = await generateSpeech(response);
      
      setAudioUrl(audioUrl);
      setVisemeData(visemeData);
      setIsPlaying(true);
      setMessage('');
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'SEND'}
      </button>
    </form>
  );
}