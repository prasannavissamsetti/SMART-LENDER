import React, { useState } from 'react';
import { Send, VolumeX } from 'lucide-react';
import VoiceRecorder from './VoiceRecorder';
import { useLanguage } from './LanguageContext';

const ChatInput = ({ onSendMessage, onVoiceTranscript, isSpeaking, onStopSpeaking }) => {
  const { t, languageCode } = useLanguage();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="chat-input-group">
        <input
          type="text"
          className="chat-text-input"
          placeholder={t.placeholder || "Ask a question or use voice..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        {isSpeaking && (
          <button
            type="button"
            className="btn-stop-tts"
            onClick={onStopSpeaking}
            title="Stop voice reading"
          >
            <VolumeX size={18} />
          </button>
        )}

        <VoiceRecorder
          onTranscript={onVoiceTranscript}
          isSpeaking={isSpeaking}
          languageCode={languageCode}
        />

        <button
          type="submit"
          className="btn-chat-send"
          disabled={!text.trim()}
          title="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
