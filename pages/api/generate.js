import { OpenAI } from 'openai';

const api = new OpenAI({
  apiKey: process.env.AIML_API_KEY,
  baseURL: process.env.AIML_BASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt, model } = req.body; // Destructure model from request body

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  const selectedModel = model || 'gpt-4o'; // Default to gpt-4o if no model is provided

  try {
    const completion = await api.chat.completions.create({
      model: selectedModel, // Use the selected model
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error calling AIML API:', error);
    // Check if the error object has more specific details from the API
    const errorMessage = error.response && error.response.data && error.response.data.error && error.response.data.error.message
      ? error.response.data.error.message
      : error.message;
    res.status(500).json({ message: 'Error generating text', error: errorMessage });
  }
}