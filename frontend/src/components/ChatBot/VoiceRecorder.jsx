import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceRecorder = ({ onTranscript, isSpeaking, languageCode }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = languageCode || 'en-US'; // Dynamically bind speech locale
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onTranscript && transcript.trim()) {
          onTranscript(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [onTranscript, languageCode]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      // If reading TTS, cancel speaking before listening
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      recognitionRef.current.start();
    }
  };

  return (
    <div className="voice-recorder-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button
        type="button"
        className={`btn-voice-mic ${isRecording ? 'recording' : ''} ${isSpeaking ? 'speaking' : ''}`}
        onClick={toggleRecording}
        title={isRecording ? 'Stop Recording (Listening...)' : 'Start Voice Command'}
      >
        {isRecording ? (
          <div className="mic-wave-container">
            <span className="mic-wave"></span>
            <span className="mic-wave delay-1"></span>
            <span className="mic-wave delay-2"></span>
            <MicOff size={18} style={{ zIndex: 2 }} />
          </div>
        ) : isSpeaking ? (
          <div className="speaking-wave-container">
            <Volume2 size={18} className="speaking-icon-bounce" />
          </div>
        ) : (
          <Mic size={18} />
        )}
      </button>
    </div>
  );
};

export default VoiceRecorder;
