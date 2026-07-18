import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import LanguageSelector from './LanguageSelector';
import VoiceLanguageSelector from './VoiceLanguageSelector';
import { useLanguage } from './LanguageContext';
import { sendMessageToChat } from '../../services/api';
import { Minimize2, Maximize2, Trash2, ShieldAlert, Sparkles, Check, AlertCircle } from 'lucide-react';

const ChatWindow = ({ isMinimized, onToggleMinimize, isMaximized, onToggleMaximize }) => {
  const { selectedLanguage, languageCode, t, detectLanguage, changeLanguage } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Local state to store prediction data loaded from localStorage
  const [predictionResult, setPredictionResult] = useState(null);
  const [applicantData, setApplicantData] = useState(null);

  // Auto-detection prompt state
  const [detectPrompt, setDetectPrompt] = useState(null); // { lang: 'Telugu', text: '...' }

  const messagesEndRef = useRef(null);

  // Load predictions cache from localStorage
  const syncPredictionData = () => {
    try {
      const res = localStorage.getItem('latest_prediction_result');
      const input = localStorage.getItem('latest_prediction_input');
      if (res) setPredictionResult(JSON.parse(res));
      if (input) setApplicantData(JSON.parse(input));
    } catch (e) {
      console.error('Error syncing prediction in chat:', e);
    }
  };

  useEffect(() => {
    syncPredictionData();
    window.addEventListener('predictionUpdated', syncPredictionData);
    
    return () => {
      window.removeEventListener('predictionUpdated', syncPredictionData);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Sync welcome messages when language changes
  useEffect(() => {
    if (messages.length <= 2) {
      // Direct initial welcome translations
      const welcomeText = {
        "English": "Hello! Welcome to Smart Lender AI Assistant. \nI can explain your loan prediction, help you understand why your loan was approved or rejected, answer banking and loan-related questions, and guide you on improving your loan eligibility.",
        "Telugu": "నమస్కారం! స్మార్ట్ లెండర్ AI అసిస్టెంట్‌కి స్వాగతం. \nనేను మీ లోన్ దరఖాస్తు ఫలితాన్ని వివరించగలను, మీ లోన్ ఎందుకు ఆమోదించబడిందో లేదా తిరస్కరించబడిందో అర్థం చేసుకోవడానికి సహాయపడగలను, బ్యాంకింగ్ మరియు లోన్ కి సంబంధించిన ప్రశ్నలకు సమాధానమివ్వగలను మరియు మీ లోన్ అర్హతను ఎలా పెంచుకోవాలో మార్గదర్శకత్వం చేయగలను.",
        "Hindi": "नमस्ते! स्मार्ट लेंडर एआई असिस्टेंट में आपका स्वागत है। \nमैं आपके लोन की भविष्यवाणी को समझा सकता हूँ, योग्यता सुधारने के उपाय बता सकता हूँ और बैंकिंग प्रश्नों के उत्तर दे सकता हूँ। मैं यह समझने में भी आपकी मदद कर सकता हूँ कि आपका लोन क्यों स्वीकृत या अस्वीकृत हुआ।",
        "Tamil": "வணக்கம்! ஸ்மார்ட் லெண்டர் AI உதவியாளருக்கு உங்களை வரவேற்கிறோம். \nநான் உங்கள் கடன் கணிப்பு முடிவை விளக்க முடியும், உங்கள் கடன் ஏன் அங்கீகரிக்கப்பட்டது அல்லது நிராகரிக்கப்பட்டது என்பதை நீங்கள் புரிந்து கொள்ள உதவ முடியும், மேலும் வங்கி சார்ந்த சந்தேகங்களுக்கு பதிலளிப்பேன்.",
        "Kannada": "ನಮಸ್ಕಾರ! ಸ್ಮಾರ್ಟ್ ಲೆಂಡರ್ AI ಅಸಿಸ್ಟೆಂಟ್‌ಗೆ ಸುಸ್ವಾಗತ. \nನಿಮ್ಮ ಸಾಲದ ಮುನ್ಸೂಚನೆಯನ್ನು ವಿವರಿಸಲು, ಸಾಲದ ಅರ್ಹತೆಯನ್ನು ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು ಎಂದು ತಿಳಿಸಲು ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ನಿಮ್ಮ ಸಾಲ ಏಕೆ ಅನುಮೋದನೆಯಾಗಿದೆ ಅಥವಾ ತಿರಸ್ಕರಿಸಲ್ಪಟ್ಟಿದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ."
      };
      
      const faqsPrompt = {
        "English": "Choose a question below or ask me anything:",
        "Telugu": "క్రింది వాటిలో ఒక ప్రశ్నను ఎంచుకోండి లేదా నన్ను ఏదైనా అడగండి:",
        "Hindi": "नीचे दिए गए प्रश्नों में से एक चुनें या मुझसे कुछ भी पूछें:",
        "Tamil": "கீழே உள்ள கேள்விகளில் ஒன்றைத் தேர்ந்தெடுக்கவும் அல்லது என்னிடம் ஏதாவது கேட்கவும்:",
        "Kannada": "ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನನ್ನನ್ನು ಏನನ್ನಾದರೂ ಕೇಳಿ:"
      };

      setMessages([
        {
          sender: 'bot',
          text: welcomeText[selectedLanguage] || welcomeText["English"],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          sender: 'bot',
          text: faqsPrompt[selectedLanguage] || faqsPrompt["English"],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          widget: 'faqs'
        }
      ]);
    } else {
      // Append localized system message for active dialogue lang change
      const noticeText = {
        "English": `Language changed to English.`,
        "Telugu": `భాష తెలుగులోకి మార్చబడింది.`,
        "Hindi": `भाषा हिन्दी में बदल दी गई है।`,
        "Tamil": `மொழி தமிழுக்கு மாற்றப்பட்டது.`,
        "Kannada": `ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.`
      };
      const note = {
        sender: 'bot',
        text: `🌐 **${noticeText[selectedLanguage] || noticeText["English"]}**`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, note]);
    }
  }, [selectedLanguage]);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, detectPrompt]);

  // Speak bot text using browser Speech Synthesis
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const cleanText = text
        .replace(/[*#•]/g, '')
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, ' ')
        .substring(0, 400);

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = languageCode; // Bind to te-IN, hi-IN, etc.
      
      // Attempt to load system localized voices matching target language
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang.startsWith(languageCode.substring(0, 2)));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Interceptor for auto-detection
  const handlePostMessage = (text, isVoice = false) => {
    // If it's a voice result, we rely on the browser STT which is already bound to chosen locale
    if (isVoice) {
      handlePostMessageDirect(text, selectedLanguage, true);
      return;
    }

    // Input script auto-detection
    const detected = detectLanguage(text);
    if (detected && detected !== selectedLanguage) {
      setDetectPrompt({ lang: detected, text: text });
    } else {
      handlePostMessageDirect(text, selectedLanguage, false);
    }
  };

  // Confirm auto-detection language switch
  const handleConfirmSwitch = () => {
    if (!detectPrompt) return;
    const { lang, text } = detectPrompt;
    changeLanguage(lang);
    setDetectPrompt(null);
    handlePostMessageDirect(text, lang, false);
  };

  const handleCancelSwitch = () => {
    if (!detectPrompt) return;
    const { text } = detectPrompt;
    setDetectPrompt(null);
    handlePostMessageDirect(text, selectedLanguage, false);
  };

  // Post message core handler
  const handlePostMessageDirect = async (text, language, isVoice = false) => {
    const userMsg = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const chatHistory = messages.map(m => ({ sender: m.sender, text: m.text }));
      
      const payload = {
        prediction_result: predictionResult,
        applicant_data: applicantData,
        question: text,
        history: chatHistory,
        selectedLanguage: language // Supply language choice to backend API
      };

      const result = await sendMessageToChat(payload);
      
      // Determine if response requires custom widgets
      let widgetType = null;
      let widgetData = null;

      const lowerText = text.toLowerCase();
      if (lowerText.includes('report') || lowerText.includes('నివేదిక') || lowerText.includes('रिपोर्ट') || lowerText.includes('அறிக்கை') || lowerText.includes('ವರದಿ')) {
        widgetType = 'report';
        widgetData = result.report;
      } else if (lowerText.includes('improve') || lowerText.includes('suggestion') || lowerText.includes('సూచన') || lowerText.includes('सुझाव') || lowerText.includes('பரிந்துரை') || lowerText.includes('ಸಲಹೆ')) {
        widgetType = 'suggestions';
        widgetData = result.suggestions;
      }

      const botMsg = {
        sender: 'bot',
        text: result.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        widget: widgetType,
        widgetData: widgetData
      };

      setMessages((prev) => [...prev, botMsg]);

      if (isVoice) {
        speakText(result.response);
      }

    } catch (e) {
      console.error(e);
      const errorMsg = {
        sender: 'bot',
        text: t.api_error || "I am experiencing connection issues. Please check backend services.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm(t.clear_chat || 'Clear conversation history?')) {
      handleStopSpeaking();
      const initialWelcome = {
        sender: 'bot',
        text: t.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialWelcome]);
    }
  };

  return (
    <div className={`chatbot-window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}>
      {/* Chat Window Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-online-indicator"></div>
          <div>
            <h3>Smart Lender AI</h3>
            <span className="chatbot-header-subtitle">Active Assistant</span>
          </div>
        </div>
        <div className="chatbot-header-actions">
          {/* Header language dropdown selector */}
          <LanguageSelector />
          
          <button onClick={handleClearChat} className="btn-header-action" title="Clear Chat">
            <Trash2 size={14} />
          </button>
          <button onClick={onToggleMaximize} className="btn-header-action" title={isMaximized ? "Restore Size" : "Maximize"}>
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button onClick={onToggleMinimize} className="btn-header-action" title="Minimize">
            <Minimize2 size={14} />
          </button>
        </div>
      </div>

      {/* Chat Window Alert for Sync Context */}
      {predictionResult && (
        <div className="chat-sync-banner">
          <ShieldAlert size={14} />
          <span>{t.sync_banner || "Synced with latest prediction:"} <strong>{predictionResult.prediction}</strong></span>
          <VoiceLanguageSelector />
        </div>
      )}

      {/* Message List Area */}
      <div className="chatbot-messages-body">
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg}
            applicantData={applicantData}
            onSelectQuestion={(q) => handlePostMessage(q, false)}
          />
        ))}
        
        {/* Dynamic script switch prompt card */}
        {detectPrompt && (
          <div className="chat-detect-prompt-card">
            <div className="detect-icon-row">
              <AlertCircle className="text-primary animate-bounce" size={20} />
              <p>{t.switch_prompt.replace(/{lang}/g, detectPrompt.lang)}</p>
            </div>
            <div className="detect-actions-row">
              <button onClick={handleConfirmSwitch} className="btn btn-detect-confirm">
                <Check size={14} />
                {t.switch_btn}
              </button>
              <button onClick={handleCancelSwitch} className="btn btn-detect-cancel">
                {t.continue_btn}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="chat-message-row bot">
            <div className="chat-avatar-wrapper">
              <div className="avatar bot-avatar">
                <span className="animate-pulse">AI</span>
              </div>
            </div>
            <div className="chat-bubble-container">
              <div className="chat-message-bubble loading-bubble">
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="chatbot-input-footer">
        <ChatInput
          onSendMessage={(txt) => handlePostMessage(txt, false)}
          onVoiceTranscript={(txt) => handlePostMessage(txt, true)}
          isSpeaking={isSpeaking}
          onStopSpeaking={handleStopSpeaking}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
