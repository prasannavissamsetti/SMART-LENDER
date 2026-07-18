import React from 'react';
import FAQCards from './FAQCards';
import SuggestionCards from './SuggestionCards';
import EligibilityReport from './EligibilityReport';
import { Cpu, User } from 'lucide-react';

const ChatMessage = ({ message, onSelectQuestion, applicantData }) => {
  const isBot = message.sender === 'bot';

  // Basic markdown formatting helper for **bold** and ### headers
  const formatText = (text) => {
    if (!text) return '';
    let formatted = text;
    
    // Bold replacement (**text** -> <strong>text</strong>)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Header replacement (### text -> <h4 style="margin: 0.5rem 0; color: var(--text-primary);">text</h4>)
    formatted = formatted.replace(/^### (.*?)$/gm, '<h4 class="chat-header-style">$1</h4>');

    // Bullet points (• item -> <li style="margin-left: 1rem;">item</li>)
    formatted = formatted.replace(/^• (.*?)$/gm, '<li class="chat-bullet-style">$1</li>');

    // Newlines to <br />
    formatted = formatted.replace(/\n/g, '<br />');

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className={`chat-message-row ${isBot ? 'bot' : 'user'}`}>
      <div className="chat-avatar-wrapper">
        {isBot ? (
          <div className="avatar bot-avatar">
            <Cpu size={14} />
          </div>
        ) : (
          <div className="avatar user-avatar">
            <User size={14} />
          </div>
        )}
      </div>

      <div className="chat-bubble-container">
        <div className="chat-message-bubble">
          <div className="chat-message-text">
            {formatText(message.text)}
          </div>
          
          <span className="chat-message-timestamp">
            {message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Embedded widgets depending on type */}
        {message.widget === 'faqs' && (
          <FAQCards onSelectQuestion={onSelectQuestion} />
        )}
        
        {message.widget === 'suggestions' && (
          <SuggestionCards suggestions={message.widgetData} />
        )}
        
        {message.widget === 'report' && (
          <EligibilityReport reportData={message.widgetData} applicantData={applicantData} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
