import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import { LanguageProvider } from './LanguageContext';
import { MessageSquareCode, Sparkles, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    // If a new prediction is made, trigger an unread nudge badge
    const handlePredictionUpdate = () => {
      if (!isOpen || isMinimized) {
        setUnread(true);
      }
    };

    window.addEventListener('predictionUpdated', handlePredictionUpdate);
    return () => window.removeEventListener('predictionUpdated', handlePredictionUpdate);
  }, [isOpen, isMinimized]);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setUnread(false);
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleToggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <LanguageProvider>
      <div className={`chatbot-outer-container ${isMaximized ? 'is-maximized' : ''}`}>
        {/* Floating Trigger Button */}
        {(!isOpen || isMinimized) && (
          <button
            type="button"
            onClick={handleToggleOpen}
            className={`chatbot-floating-trigger ${unread ? 'has-unread' : ''}`}
            title="Open Smart Lender AI Assistant"
          >
            {unread && (
              <span className="chatbot-unread-indicator">
                <Sparkles size={10} style={{ fill: '#fff' }} />
              </span>
            )}
            <MessageSquareCode size={26} />
          </button>
        )}

        {/* Floating Chat Window */}
        {isOpen && !isMinimized && (
          <div className="chatbot-window-wrapper">
            <ChatWindow
              isMinimized={isMinimized}
              onToggleMinimize={handleToggleMinimize}
              isMaximized={isMaximized}
              onToggleMaximize={handleToggleMaximize}
            />
          </div>
        )}
      </div>
    </LanguageProvider>
  );
};

export default ChatBot;
