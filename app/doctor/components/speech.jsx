"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Trash2, Copy, Download, Settings } from 'lucide-react';

export default function SpeechToTextApp() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [continuous, setContinuous] = useState(true);
  const [interimResults, setInterimResults] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState('');
  
  const recognitionRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined' && 
        ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    // Clean up previous recognition instance
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError('');
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalText += transcript;
            setConfidence(confidence || 0);
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(interimTranscript);
        if (finalText) {
          setFinalTranscript(prev => prev + finalText);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Handle specific errors with better UX
        if (event.error === 'not-allowed') {
          setError('Microphone permission denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          setError('No speech detected. Click Start and speak clearly into your microphone.');
        } else if (event.error === 'audio-capture') {
          setError('No microphone found. Please check your microphone connection.');
        } else if (event.error === 'network') {
          setError('Network error. Check your internet connection and try again.');
        } else if (event.error === 'aborted') {
          setError(''); // Don't show error for manual stops
        } else {
          setError(`Recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        setTranscript('');
      };

      isInitializedRef.current = true;
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      setError('Failed to initialize speech recognition');
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, continuous, interimResults, isSupported]);

  const startListening = async () => {
    if (!recognitionRef.current || isListening) return;

    try {
      // Clear any previous errors
      setError('');
      
      // Request microphone permission first
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the stream immediately as we just needed permission
        stream.getTracks().forEach(track => track.stop());
      }

      // Small delay to ensure mic is ready
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      }, 100);
      
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError('Failed to access microphone. Please check permissions and try again.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const clearTranscript = () => {
    setFinalTranscript('');
    setTranscript('');
    setConfidence(0);
    setError('');
  };

  const copyToClipboard = async () => {
    if (!finalTranscript) return;
    
    try {
      await navigator.clipboard.writeText(finalTranscript);
      // Show success feedback
      setError('Text copied to clipboard!');
      setTimeout(() => setError(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text');
    }
  };

  const downloadTranscript = () => {
    if (!finalTranscript) return;
    
    const element = document.createElement('a');
    const file = new Blob([finalTranscript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `speech-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-PT', name: 'Portuguese' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
  ];

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <MicOff size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Browser Not Supported</h2>
          <p className="text-gray-600 mb-4">
            Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari.
          </p>
          <p className="text-sm text-gray-500">
            Note: This feature requires HTTPS in production and microphone permissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Speech to Text</h1>
                <p className="text-blue-100 mt-2">Convert your speech to text in real-time</p>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Settings size={24} />
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className={`p-4 border-l-4 ${
              error.includes('copied') 
                ? 'bg-green-50 border-green-400 text-green-700' 
                : 'bg-red-50 border-red-400 text-red-700'
            }`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {error.includes('copied') ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                  {error.includes('network') && (
                    <p className="text-xs mt-1 opacity-80">
                      Speech recognition requires an internet connection. Please check your network.
                    </p>
                  )}
                  {error.includes('no-speech') && (
                    <p className="text-xs mt-1 opacity-80">
                      Make sure your microphone is working and you're speaking clearly.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-gray-50 border-b p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    disabled={isListening}
                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={continuous}
                      onChange={(e) => setContinuous(e.target.checked)}
                      disabled={isListening}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className="text-sm font-medium text-gray-700">Continuous Recognition</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={interimResults}
                      onChange={(e) => setInterimResults(e.target.checked)}
                      disabled={isListening}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className="text-sm font-medium text-gray-700">Show Interim Results</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-6">
            {/* Status and Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isListening 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`} />
                  {isListening ? 'Listening...' : 'Ready'}
                </div>
                {confidence > 0 && (
                  <div className="text-sm text-gray-600">
                    Confidence: {Math.round(confidence * 100)}%
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSupported}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  <span>{isListening ? 'Stop' : 'Start'}</span>
                </button>

                <button
                  onClick={clearTranscript}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors"
                >
                  <Trash2 size={18} />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Transcript Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Transcript</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    disabled={!finalTranscript}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={downloadTranscript}
                    disabled={!finalTranscript}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Download transcript"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
              
              <div className="min-h-[200px] bg-white rounded-lg p-4 border-2 border-gray-200">
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {finalTranscript || (
                    <div className="text-gray-400 italic">
                      <p>Click "Start" and begin speaking...</p>
                      <p className="text-xs mt-2">
                        Tips: Speak clearly, ensure good internet connection, and grant microphone permission.
                      </p>
                    </div>
                  )}
                  {transcript && (
                    <span className="text-gray-400 italic">{transcript}</span>
                  )}
                  {isListening && (
                    <span className="inline-block w-0.5 h-5 bg-blue-500 animate-pulse ml-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Word Count */}
            <div className="text-sm text-gray-600 text-center">
              Words: {finalTranscript.trim().split(/\s+/).filter(word => word.length > 0).length} | 
              Characters: {finalTranscript.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}