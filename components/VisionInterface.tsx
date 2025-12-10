import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';

export const VisionInterface: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(''); // Clear previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysis('');

    try {
        // Extract mime type (simple detection)
        const mimeType = selectedImage.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/jpeg';
        
        const result = await geminiService.analyzeImage(selectedImage, prompt, mimeType);
        setAnalysis(result);
    } catch (error) {
        setAnalysis("Failed to analyze the image. Please try again.");
        console.error(error);
    } finally {
        setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 lg:p-8 max-w-5xl mx-auto overflow-y-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-colors h-80 ${
              selectedImage ? 'border-blue-500/50 bg-gray-900' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-900/50'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setSelectedImage(reader.result as string);
                    reader.readAsDataURL(file);
                }
            }}
          >
            {selectedImage ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg group">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-500 transition"
                    >
                        Remove Image
                    </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-gray-500">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <p className="text-lg font-medium text-gray-300">Drop an image here</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-400">Custom Prompt (Optional)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., What ingredients are in this dish? or Describe the architecture style."
              className="w-full h-24 bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                !selectedImage || isAnalyzing
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            }`}
          >
             {isAnalyzing ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing...</span>
                </>
             ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>Analyze Image</span>
                </>
             )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 overflow-hidden flex flex-col h-[600px] lg:h-auto">
            <div className="flex items-center space-x-2 mb-4">
                <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                <h3 className="text-lg font-medium text-gray-200">Analysis Result</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                {analysis ? (
                    analysis
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-3 opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <span>Results will appear here</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};