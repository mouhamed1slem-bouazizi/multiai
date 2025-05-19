import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css'; // Assuming you have this from create-next-app

const availableModels = [
  // OpenAI <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'gpt-4o', name: 'GPT-4o (OpenAI)' },
  { id: 'gpt-4o-2024-08-06', name: 'GPT-4o 2024-08-06 (OpenAI)' },
  { id: 'gpt-4o-mini', name: 'Chat GPT 4o mini (OpenAI)' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo (OpenAI)' },
  { id: 'gpt-4-turbo-2024-04-09', name: 'GPT-4 Turbo 2024-04-09 (OpenAI)' },
  { id: 'gpt-4-turbo-preview', name: 'GPT-4 Turbo Preview (OpenAI)' },
  { id: 'gpt-4-0125-preview', name: 'GPT-4 0125 Preview (OpenAI)' },
  { id: 'gpt-4-1106-preview', name: 'GPT-4 1106 Preview (OpenAI)' },
  { id: 'gpt-4-vision-preview', name: 'GPT-4 Vision Preview (OpenAI)' }, // Note: Vision capabilities might need specific handling
  { id: 'gpt-4', name: 'GPT-4 (OpenAI)' },
  { id: 'gpt-4-0613', name: 'GPT-4 0613 (OpenAI)' },
  { id: 'gpt-3.5-turbo-0125', name: 'GPT-3.5 Turbo 0125 (OpenAI)' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (OpenAI)' },
  { id: 'gpt-3.5-turbo-1106', name: 'GPT-3.5 Turbo 1106 (OpenAI)' },
  { id: 'gpt-3.5-turbo-instruct', name: 'GPT-3.5 Turbo Instruct (OpenAI)' },

  // Meta <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'meta-llama/Meta-Llama-3-70B-Instruct', name: 'Llama 3 70B Instruct (Meta)' },
  { id: 'meta-llama/Meta-Llama-3-8B-Instruct', name: 'Llama 3 8B Instruct (Meta)' },
  { id: 'meta-llama/Llama-2-70b-chat-hf', name: 'Llama 2 70B Chat HF (Meta)' },
  { id: 'meta-llama/Llama-2-13b-chat-hf', name: 'Llama 2 13B Chat HF (Meta)' },
  { id: 'meta-llama/Llama-2-7b-chat-hf', name: 'Llama 2 7B Chat HF (Meta)' },
  { id: 'codellama/CodeLlama-70b-Instruct-hf', name: 'CodeLlama 70B Instruct HF (Meta)' },


  // Mistral AI <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B Instruct v0.1 (Mistral AI)' },
  { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B Instruct v0.1 (Mistral AI)' },
  { id: 'mistralai/Mistral-7B-Instruct-v0.2', name: 'Mistral 7B Instruct v0.2 (Mistral AI)' },
  { id: 'mistralai/mistral-large-latest', name: 'Mistral Large Latest (Mistral AI)' },
  { id: 'mistralai/mistral-medium-latest', name: 'Mistral Medium Latest (Mistral AI)' },
  { id: 'mistralai/mistral-small-latest', name: 'Mistral Small Latest (Mistral AI)' },


  // Google <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'google/gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro Latest (Google)' },
  { id: 'google/gemini-pro', name: 'Gemini Pro (Google)' },
  { id: 'google/gemini-pro-vision', name: 'Gemini Pro Vision (Google)' }, // Note: Vision capabilities
  { id: 'google/gemma-7b-it', name: 'Gemma 7B IT (Google)' },
  { id: 'google/gemma-2b-it', name: 'Gemma 2B IT (Google)' },

  // Anthropic <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'anthropic/claude-3-opus-20240229', name: 'Claude 3 Opus (Anthropic)' },
  { id: 'anthropic/claude-3-sonnet-20240229', name: 'Claude 3 Sonnet (Anthropic)' },
  { id: 'anthropic/claude-3-haiku-20240307', name: 'Claude 3 Haiku (Anthropic)' },
  { id: 'anthropic/claude-2.1', name: 'Claude 2.1 (Anthropic)' },
  { id: 'anthropic/claude-2.0', name: 'Claude 2.0 (Anthropic)' },
  { id: 'anthropic/claude-instant-1.2', name: 'Claude Instant 1.2 (Anthropic)' },

  // Cohere <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'cohere/command-r-plus', name: 'Command R+ (Cohere)' },
  { id: 'cohere/command-r', name: 'Command R (Cohere)' },
  { id: 'cohere/command', name: 'Command (Cohere)' },
  { id: 'cohere/command-light', name: 'Command Light (Cohere)' },

  // Alibaba Cloud (Qwen) <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'alibaba-cloud/qwen-max', name: 'Qwen Max (Alibaba Cloud)' },
  { id: 'alibaba-cloud/qwen-turbo', name: 'Qwen Turbo (Alibaba Cloud)' },
  { id: 'alibaba-cloud/qwen-plus', name: 'Qwen Plus (Alibaba Cloud)' },
  { id: 'alibaba-cloud/qwen-14b-chat', name: 'Qwen 14B Chat (Alibaba Cloud)' },
  { id: 'alibaba-cloud/qwen-7b-chat', name: 'Qwen 7B Chat (Alibaba Cloud)' },

  // DeepSeek <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'deepseek/deepseek-chat-v3-0324', name: 'DeepSeek V3 (DeepSeek)' },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (DeepSeek)' },
  { id: 'deepseek-ai/deepseek-coder-33b-instruct', name: 'DeepSeek Coder 33B Instruct (DeepSeek)' },
  { id: 'deepseek-ai/deepseek-llm-67b-chat', name: 'DeepSeek LLM 67B Chat (DeepSeek)' },

  // xAI <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'xai-org/grok-1', name: 'Grok-1 (xAI)' },

  // Other notable models <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
  { id: 'nousresearch/Nous-Hermes-2-Mixtral-8x7B-DPO', name: 'Nous Hermes 2 Mixtral 8x7B DPO (NousResearch)' },
  { id: '01-ai/Yi-34B-Chat', name: 'Yi 34B Chat (01.AI)' },
  // Add more models here as needed from https://docs.aimlapi.com/api-references/model-database <mcreference link="https://docs.aimlapi.com/api-references/model-database" index="0">0</mcreference>
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState(availableModels[0].id); // Default to the first model

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
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model: selectedModel }), // Send selected model
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
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
        <title>AI Text Generator</title>
        <meta name="description" content="Generate text using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AI Text Generator with AIML API
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.modelSelectorContainer}>
            <label htmlFor="model-select" className={styles.modelLabel}>Choose a model:</label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={styles.modelSelect}
              disabled={loading}
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Text'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {response && (
          <div className={styles.responseContainer}>
            <h2>AI Response:</h2>
            <p className={styles.response}>{response}</p>
          </div>
        )}
      </main>
    </div>
  );
}

// You might want to add some basic styling in styles/Home.module.css
// For example:
/*
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.title {
  margin: 0;
  line-height: 1.15;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
}

.textarea {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #005bb5;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}

.responseContainer {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  width: 100%;
  background-color: #f9f9f9;
}

.response {
  white-space: pre-wrap; // To preserve formatting from AI
}
*/