import axios from 'axios';

export const fetchGeminiResponse = async (prompt) => {
  try {
    const res = await axios.post('http://localhost:3001/generate', { prompt });


    if (!res.data || typeof res.data !== 'object') {
      throw new Error('Invalid response format from backend.');
    }

    const text = res.data.response;

    if (!text) {
      throw new Error('No response text found in Gemini API response.');
    }

    return text;
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    return 'Sorry, something went wrong.';
  }
};
