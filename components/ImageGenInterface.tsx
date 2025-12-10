import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

export const ImageGenInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await geminiService.generateImage(prompt);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try a different prompt or try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 overflow-y-auto">
      <div className="max-w-3xl w-full space-y-8">
        
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-100">Imagine Anything</h2>
            <p className="text-gray-400">Powered by Gemini 2.5 Flash Image</p>
        </div>

        <div className="bg-gray-900 p-2 rounded-2xl border border-gray-700 shadow-2xl flex items-center">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="A futuristic city with neon lights in rain..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-100 placeholder-gray-500 px-4 py-3 outline-none"
            />
            <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
                {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Generate</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/><path d="m9 11 1 9"/><path d="m4.5 15.5 15 3"/><path d="m15 11-1 9"/></svg>
                    </>
                )}
            </button>
        </div>

        {/* Display Area */}
        <div className="flex justify-center w-full min-h-[400px]">
            {isGenerating ? (
                <div className="w-full aspect-square max-w-[500px] rounded-2xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center animate-pulse">
                    <div className="w-12 h-12 text-blue-500 mb-4">
                        <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" className="opacity-25"></circle>
                            <path d="M12 2a10 10 0 0 1 10 10" className="opacity-75"></path>
                        </svg>
                    </div>
                    <p className="text-gray-400 font-medium">Creating masterpiece...</p>
                </div>
            ) : generatedImage ? (
                <div className="relative group w-full max-w-[500px]">
                    <img 
                        src={generatedImage} 
                        alt={prompt} 
                        className="w-full aspect-square rounded-2xl shadow-2xl object-cover border border-gray-800"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-4 backdrop-blur-sm">
                        <a 
                            href={generatedImage} 
                            download={`gemini-generated-${Date.now()}.png`}
                            className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition-colors"
                            title="Download"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                        </a>
                    </div>
                </div>
            ) : error ? (
                <div className="w-full max-w-[500px] aspect-square rounded-2xl bg-red-900/10 border border-red-500/30 flex flex-col items-center justify-center text-red-400 p-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="w-full max-w-[500px] aspect-square rounded-2xl bg-gray-900/50 border border-gray-800 border-dashed flex flex-col items-center justify-center text-gray-600">
                     <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                     <p>Generated images will appear here</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};