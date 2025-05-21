import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'; // Reusing existing styles

const textToSpeechModels = [
  { id: '#g1_aura-angus-en', name: 'Aura Angus (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-arcas-en', name: 'Aura Arcas (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-asteria-en', name: 'Aura Asteria (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-athena-en', name: 'Aura Athena (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-helios-en', name: 'Aura Helios (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-hera-en', name: 'Aura Hera (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-luna-en', name: 'Aura Luna (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-orion-en', name: 'Aura Orion (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-orpheus-en', name: 'Aura Orpheus (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-perseus-en', name: 'Aura Perseus (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-stella-en', name: 'Aura Stella (en)', developer: 'Deepgram', context: 'Aura' },
  { id: '#g1_aura-zeus-en', name: 'Aura Zeus (en)', developer: 'Deepgram', context: 'Aura' },
];

const speechToTextModels = [
  { id: '#g1_nova-2-automotive', name: 'Nova-2 Automotive', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-conversationalai', name: 'Nova-2 Conversational AI', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-drivethru', name: 'Nova-2 Drive-Thru', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-finance', name: 'Nova-2 Finance', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-general', name: 'Nova-2 General', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-medical', name: 'Nova-2 Medical', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-meeting', name: 'Nova-2 Meeting', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-phonecall', name: 'Nova-2 Phone Call', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-video', name: 'Nova-2 Video', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_nova-2-voicemail', name: 'Nova-2 Voicemail', developer: 'Deepgram', context: 'Deepgram Nova-2' },
  { id: '#g1_whisper-tiny', name: 'Whisper Tiny', developer: 'OpenAI', context: '-' },
  { id: '#g1_whisper-small', name: 'Whisper Small', developer: 'OpenAI', context: '-' },
  { id: '#g1_whisper-base', name: 'Whisper Base', developer: 'OpenAI', context: '-' },
  { id: '#g1_whisper-medium', name: 'Whisper Medium', developer: 'OpenAI', context: '-' },
  { id: '#g1_whisper-large', name: 'Whisper Large', developer: 'OpenAI', context: 'Whisper' },
];

export default function AudioGeneratorPage() {
  const [taskType, setTaskType] = useState('tts'); // 'tts' or 'stt'
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState(textToSpeechModels[0].id);

  const currentModels = taskType === 'tts' ? textToSpeechModels : speechToTextModels;

  useEffect(() => {
    // Reset model selection when task type changes
    setSelectedModel(currentModels[0].id);
    setPrompt('');
    setResponse('');
    setError('');
  }, [taskType, currentModels]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskType === 'tts' && !prompt.trim()) {
      setError('Prompt cannot be empty for Text-to-Speech.');
      return;
    }
    // For STT, prompt might be handled differently (e.g., file upload)
    // For now, we'll proceed, but the backend needs to handle STT requests appropriately.
    if (taskType === 'stt' && !prompt.trim()) {
        setError('For Speech-to-Text, you would typically upload an audio file. This form is a placeholder for the API call.');
        // return; // Or allow to proceed if backend handles empty prompt for STT as a test
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      // IMPORTANT: The API endpoint '/api/generate' needs significant modification
      // to handle audio generation (both TTS and STT) requests.
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: taskType === 'tts' ? prompt : null, // For STT, prompt is text, actual audio data would be sent differently
          model: selectedModel,
          type: 'audio',
          task: taskType, // 'tts' or 'stt'
          // For STT, you'd typically send audio data, e.g., as FormData or base64.
          // This example assumes the backend is adapted to handle this.
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response); // For TTS: audio URL. For STT: transcribed text.
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getApiReferenceLink = (modelId) => {
    return `https://docs.aimlapi.com/api-references/model-database#${modelId.substring(1)}`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Audio Generator</title>
        <meta name="description" content="Generate or transcribe audio using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AI Audio Tools with AIML API
        </h1>
        

        <div className={styles.taskSelectorContainer} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <label style={{ marginRight: '1rem', color: 'var(--foreground)' }}>Choose a task:</label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className={styles.modelSelect} // Reusing modelSelect style
            style={{ minWidth: '200px' }}
            disabled={loading}
          >
            <option value="tts">Text-to-Speech</option>
            <option value="stt">Speech-to-Text</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.modelSelectorContainer}>
            <label htmlFor="model-select" className={styles.modelLabel}>
              Choose a {taskType === 'tts' ? 'Text-to-Speech' : 'Speech-to-Text'} model:
            </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={styles.modelSelect}
              disabled={loading}
            >
              {currentModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.developer} ({model.context})
                </option>
              ))}
            </select>
          </div>

          {taskType === 'tts' && (
            <textarea
              className={styles.textarea}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter text for speech synthesis..."
              rows={4}
              disabled={loading}
            />
          )}
          {taskType === 'stt' && (
            <div style={{ margin: '1rem 0', color: 'var(--foreground)'}}>
              <p>For Speech-to-Text, you would typically upload an audio file here.</p>
              <p>The API call will need to be adapted to send audio data.</p>
              <p>(This form currently sends the selected model for STT for demonstration purposes)</p>
              {/* Placeholder for file input: <input type="file" disabled={loading} /> */}
            </div>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Processing...' : (taskType === 'tts' ? 'Generate Speech' : 'Transcribe Speech')}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {response && (
          <div className={styles.responseContainer}>
            <h2>AI Generated Output:</h2>
            {taskType === 'tts' && typeof response === 'string' && response.startsWith('http') && (
              <audio controls src={response} style={{ width: '100%', marginTop: '1rem' }}>
                Your browser does not support the audio element.
              </audio>
            )}
            {taskType === 'stt' && typeof response === 'string' && (
              <pre className={styles.responseText}>{response}</pre>
            )}
            {typeof response !== 'string' && <p>Received unexpected response format.</p>}
          </div>
        )}
      </main>
    </div>
  );
}