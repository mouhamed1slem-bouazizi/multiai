import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css'; // Reusing existing styles

const videoModels = [
  { id: 'kling-video/v1/standard/image-to-video', name: 'Kling AI (image-to-video)', developer: 'Kling AI' },
  { id: 'kling-video/v1/standard/text-to-video', name: 'Kling AI (text-to-video)', developer: 'Kling AI' },
  { id: 'kling-video/v1/pro/image-to-video', name: 'Kling AI (image-to-video)', developer: 'Kling AI' },
  { id: 'kling-video/v1/pro/text-to-video', name: 'Kling AI (text-to-video)', developer: 'Kling AI' },
  { id: 'kling-video/v1.6/standard/text-to-video', name: 'Kling 1.6 Standard', developer: 'Kling AI' },
  { id: 'kling-video/v1.6/standard/image-to-video', name: 'Kling 1.6 Standard', developer: 'Kling AI' },
  { id: 'kling-video/v1.6/pro/image-to-video', name: 'Kling 1.6 Pro', developer: 'Kling AI' },
  { id: 'klingai/kling-video-v1.6-pro-effects', name: 'Kling 1.6 Pro Effects', developer: 'Kling AI' },
  { id: 'klingai/kling-video-v1.6-standard-effects', name: 'Kling 1.6 Standard Effects', developer: 'Kling AI' },
  { id: 'klingai/v2-master-image-to-video', name: 'Kling 2.0 Master', developer: 'Kling AI' },
  { id: 'klingai/v2-master-text-to-video', name: 'Kling 2.0 Master', developer: 'Kling AI' },
  { id: 'video-01', name: 'MiniMax Video-01', developer: 'Minimax AI' },
  { id: 'video-01-live2d', name: 'Minimax Video-01 Live2D', developer: 'Minimax AI' },
  { id: 'gen3a_turbo', name: 'Runway Gen-3 turbo', developer: 'Runway' },
  { id: 'runway/gen4_turbo', name: 'Runway Gen-4 Turbo', developer: 'Runway' },
  { id: 'wan/v2.1/1.3b/text-to-video', name: 'Wan 2.1', developer: 'Alibaba Cloud' },
  { id: 'veo2', name: 'Veo2 Text-to-Video', developer: 'Google' },
  { id: 'veo2/image-to-video', name: 'Veo2 Image-to-Video', developer: 'Google' },
];

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(''); // This will likely be a video URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState(videoModels[0].id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setLoading(true);
    setError('');
    setResponse('');

    try {
      // IMPORTANT: The API endpoint '/api/generate' currently handles text generation.
      // You will need to modify it or create a new endpoint (e.g., '/api/generate-video')
      // to handle video generation requests and call the appropriate AIML API for videos.
      const res = await fetch('/api/generate', { // This endpoint will need to be adapted for videos
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model: selectedModel, type: 'video' }), // Added type to differentiate
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error: ${res.status}`);
      }

      const data = await res.json();
      // Assuming the response for a video will be a URL
      setResponse(data.response); // Adjust based on actual API response for videos
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Video Generator</title>
        <meta name="description" content="Generate videos using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AI Video Generator with AIML API
        </h1>
        

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.modelSelectorContainer}>
            <label htmlFor="model-select" className={styles.modelLabel}>Choose a video model:</label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={styles.modelSelect}
              disabled={loading}
            >
              {videoModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.developer}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your video prompt here..."
            rows={4}
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Video'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {response && (
          <div className={styles.responseContainer}>
            <h2>AI Generated Video:</h2>
            <video controls src={response} style={{ maxWidth: '100%', maxHeight: '500px', marginTop: '1rem' }}>
              Your browser does not support the video tag.
            </video>
            {/* If response is not a direct URL, you might need different rendering logic */}
          </div>
        )}
      </main>
    </div>
  );
}