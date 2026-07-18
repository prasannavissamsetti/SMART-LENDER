import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { name: 'English', code: 'en-US', flag: '🇺🇸', label: 'English' },
  { name: 'Telugu', code: 'te-IN', flag: '🇮🇳', label: 'తెలుగు' },
  { name: 'Hindi', code: 'hi-IN', flag: '🇮🇳', label: 'हिन्दी' },
  { name: 'Tamil', code: 'ta-IN', flag: '🇮🇳', label: 'தமிழ்' },
  { name: 'Kannada', code: 'kn-IN', flag: '🇮🇳', label: 'ಕನ್ನಡ' }
];

// UI Label Translations Dictionary
export const UI_TRANSLATIONS = {
  "English": {
    "placeholder": "Ask a question or use voice...",
    "send": "Send",
    "clear_chat": "Clear conversation history?",
    "listening": "Listening...",
    "speaking": "Speaking...",
    "switch_prompt": "I detected {lang}. Would you like to switch the conversation to {lang}?",
    "switch_btn": "Switch Language",
    "continue_btn": "Continue in English",
    "report_title": "Eligibility Improvement Report",
    "report_download": "Export PDF",
    "report_status": "Status",
    "report_risk": "Risk Profile",
    "report_friction": "Friction Areas:",
    "report_estimate": "Estimated Eligibility After Improvements:",
    "report_checklist": "Reapplication Checklist:",
    "report_projection": "AI Projection Only",
    "api_error": "I am experiencing issues connecting to the Smart Lender AI service. Please make sure the backend is active.",
    "sync_banner": "Synced with latest prediction:",
    "faqs_title": "Common FAQ Questions",
    "suggs_title": "Actionable Recommendations to Improve Eligibility"
  },
  "Telugu": {
    "placeholder": "ప్రశ్న అడగండి లేదా వాయిస్ వాడండి...",
    "send": "పంపు",
    "clear_chat": "చాట్ చరిత్రను క్లియర్ చేయాలా?",
    "listening": "వింటున్నాను...",
    "speaking": "మాట్లాడుతున్నాను...",
    "switch_prompt": "నేను తెలుగును గుర్తించాను. సంభాషణను తెలుగులోకి మార్చాలా?",
    "switch_btn": "భాషను మార్చండి",
    "continue_btn": "ఇంగ్లీషులోనే కొనసాగించు",
    "report_title": "అర్హత మెరుగుదల నివేదిక",
    "report_download": "PDF డౌన్‌లోడ్",
    "report_status": "స్థితి",
    "report_risk": "ప్రమాద ప్రొఫైల్",
    "report_friction": "ముఖ్య కారణాలు:",
    "report_estimate": "సర్దుబాట్ల తర్వాత అంచనా వేసిన అర్హత:",
    "report_checklist": "తిరిగి దరఖాస్తు చేసుకునే ముందు తనిఖీ జాబితా:",
    "report_projection": "AI అంచనా మాత్రమే",
    "api_error": "స్మార్ట్ లెండర్ AI సేవతో కనెక్ట్ కావడంలో ఇబ్బందిగా ఉంది. దయచేసి బ్యాకెండ్ సక్రియంగా ఉందని నిర్ధారించుకోండి.",
    "sync_banner": "తాజా అంచనాతో సమకాలీకరించబడింది:",
    "faqs_title": "సాధారణ FAQ ప్రశ్నలు",
    "suggs_title": "అర్హత మెరుగుపరచుకోవడానికి ఆచరణాత్మక సూచనలు"
  },
  "Hindi": {
    "placeholder": "प्रश्न पूछें या आवाज का उपयोग करें...",
    "send": "भेजें",
    "clear_chat": "क्या आप बातचीत का इतिहास साफ़ करना चाहते हैं?",
    "listening": "सुन रहा हूँ...",
    "speaking": "बोल रहा हूँ...",
    "switch_prompt": "मैंने हिन्दी भाषा का पता लगाया है। क्या आप बातचीत को हिन्दी में बदलना चाहेंगे?",
    "switch_btn": "भाषा बदलें",
    "continue_btn": "अंग्रेजी में जारी रखें",
    "report_title": "पात्रता सुधार रिपोर्ट",
    "report_download": "पीडीएफ डाउनलोड",
    "report_status": "स्थिति",
    "report_risk": "जोखिम प्रोफ़ाइल",
    "report_friction": "कठिनाई क्षेत्र:",
    "report_estimate": "सुधार के बाद अनुमानित पात्रता:",
    "report_checklist": "पुनः आवेदन करने से पहले चेकलिस्ट:",
    "report_projection": "केवल एआई अनुमान",
    "api_error": "स्मार्ट लेंडर एआई सेवा से जुड़ने में समस्या हो रही है। कृपया सुनिश्चित करें कि बैकएंड सक्रिय है।",
    "sync_banner": "नवीनतम परिणाम के साथ समन्वयित:",
    "faqs_title": "सामान्य अक्सर पूछे जाने वाले प्रश्न",
    "suggs_title": "पात्रता सुधारने के लिए व्यावहारिक सुझाव"
  },
  "Tamil": {
    "placeholder": "கேள்வி கேட்கவும் அல்லது குரலைப் பயன்படுத்தவும்...",
    "send": "அனுப்பு",
    "clear_chat": "உரையாடல் வரலாற்றை அழிக்க வேண்டுமா?",
    "listening": "கேட்கிறது...",
    "speaking": "பேசுகிறது...",
    "switch_prompt": "நான் தமிழைக் கண்டறிந்தேன். உரையாடலைத் தமிழுக்கு மாற்ற விரும்புகிறீர்களா?",
    "switch_btn": "மொழியை மாற்றவும்",
    "continue_btn": "ஆங்கிலத்தில் தொடரவும்",
    "report_title": "தகுதி மேம்பாட்டு அறிக்கை",
    "report_download": "PDF பதிவிறக்கம்",
    "report_status": "நிலை",
    "report_risk": "ஆபத்து சுயவிவரம்",
    "report_friction": "முக்கிய காரணங்கள்:",
    "report_estimate": "மேம்பாட்டிற்குப் பின் மதிப்பிடப்பட்ட தகுதி:",
    "report_checklist": "மீண்டும் விண்ணப்பிப்பதற்கான சரிபார்ப்பு பட்டியல்:",
    "report_projection": "AI கணிப்பு மட்டுமே",
    "api_error": "ஸ்மார்ட் லெண்டர் AI சேவையுடன் இணைப்பதில் சிக்கல் உள்ளது. பேக்கெண்ட் செயலில் உள்ளதா என்பதை உறுதிப்படுத்தவும்.",
    "sync_banner": "சமீபத்திய கணிப்புடன் ஒத்திசைக்கப்பட்டது:",
    "faqs_title": "பொதுவான கேள்விகள்",
    "suggs_title": "தகுதியை மேம்படுத்த பரிந்துரைகள்"
  },
  "Kannada": {
    "placeholder": "ಪ್ರಶ್ನೆ ಕೇಳಿ ಅಥವಾ ಧ್ವನಿಯನ್ನು ಬಳಸಿ...",
    "send": "ಕಳುಹಿಸು",
    "clear_chat": "ಸಂಭಾಷಣೆಯ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಬೇಕೇ?",
    "listening": "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...",
    "speaking": "ಮಾತನಾಡುತ್ತಿದೆ...",
    "switch_prompt": "ನಾನು ಕನ್ನಡವನ್ನು ಗುರುತಿಸಿದ್ದೇನೆ. ಸಂಭಾಷಣೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲು ಬಯಸುವಿರಾ?",
    "switch_btn": "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
    "continue_btn": "ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮುಂದುವರೆಯಿರಿ",
    "report_title": "ಅರ್ಹತಾ ಸುಧಾರಣಾ ವರದಿ",
    "report_download": "PDF ರಫ್ತುಮಾಡಿ",
    "report_status": "ಸ್ಥಿತಿ",
    "report_risk": "ಅಪಾಯದ ವಿವರ",
    "report_friction": "ಸಮಸ್ಯೆಯ ಕ್ಷೇತ್ರಗಳು:",
    "report_estimate": "ಸುಧಾರಣೆಗಳ ನಂತರದ ಅಂದಾಜು ಅರ್ಹತೆ:",
    "report_checklist": "ಮತ್ತೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ:",
    "report_projection": "AI ಅಂದಾಜು ಮಾತ್ರ",
    "api_error": "ಸ್ಮಾರ್ಟ್ ಲೆಂಡರ್ AI ಸೇವೆಯೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಬ್ಯಾಕೆಂಡ್ ಸಕ್ರಿಯವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    "sync_banner": "ಇತ್ತೀಚಿನ ಅಂದಾಜಿನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ:",
    "faqs_title": "ಸಾಮಾನ್ಯ FAQ ಪ್ರಶ್ನೆಗಳು",
    "suggs_title": "ಅರ್ಹತೆಯನ್ನು ಸುಧಾರಿಸಲು ಪ್ರಾಯೋಗಿಕ ಸಲಹೆಗಳು"
  }
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Session-bound language choice
    return sessionStorage.getItem('chatbot_language') || 'English';
  });

  useEffect(() => {
    sessionStorage.setItem('chatbot_language', selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (langName) => {
    const valid = LANGUAGES.find(l => l.name === langName);
    if (valid) {
      setSelectedLanguage(langName);
    }
  };

  const currentLangObj = LANGUAGES.find(l => l.name === selectedLanguage) || LANGUAGES[0];
  const t = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS["English"];

  // Offline script detector mapping Unicode blocks
  const detectLanguage = (text) => {
    if (!text) return null;
    
    // 1. Telugu block: U+0C00 - U+0C7F
    if (/[\u0c00-\u0c7f]/.test(text)) return 'Telugu';
    
    // 2. Devanagari (Hindi) block: U+0900 - U+097F
    if (/[\u0900-\u097f]/.test(text)) return 'Hindi';
    
    // 3. Tamil block: U+0B80 - U+0BFF
    if (/[\u0b80-\u0bff]/.test(text)) return 'Tamil';
    
    // 4. Kannada block: U+0C80 - U+0CFF
    if (/[\u0c80-\u0cff]/.test(text)) return 'Kannada';

    return null;
  };

  return (
    <LanguageContext.Provider value={{
      selectedLanguage,
      changeLanguage,
      languageCode: currentLangObj.code,
      languageFlag: currentLangObj.flag,
      languageLabel: currentLangObj.label,
      languages: LANGUAGES,
      t,
      detectLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
