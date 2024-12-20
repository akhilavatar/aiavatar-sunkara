import axios from 'axios';

const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Example voice ID, replace with your preferred voice

export async function generateSpeech(text: string): Promise<{ audioUrl: string; visemeData: any[] }> {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          'xi-api-key': ELEVEN_LABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      }
    );

    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);

    // Generate mock viseme data (in a real app, you'd get this from a lip-sync service)
    const visemeData = generateMockVisemeData(text);

    return { audioUrl, visemeData };
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}

function generateMockVisemeData(text: string) {
  // This is a simplified mock - in a real app, you'd use a proper lip-sync service
  const words = text.split(' ');
  const visemes = [];
  let currentTime = 0;
  
  for (const word of words) {
    const duration = word.length * 0.1; // Rough estimate
    visemes.push({
      time: currentTime,
      value: 'viseme_' + Math.floor(Math.random() * 10)
    });
    currentTime += duration;
  }
  
  return visemes;
}