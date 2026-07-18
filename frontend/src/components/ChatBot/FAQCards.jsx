import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const FAQCards = ({ onSelectQuestion }) => {
  const { selectedLanguage, t } = useLanguage();

  const faqsByLanguage = {
    "English": [
      "Why was my loan rejected?",
      "Why was my loan approved?",
      "How can I improve my credit score?",
      "Can I apply again?",
      "What is credit history?",
      "What affects loan approval?",
      "What documents are required?",
      "What is EMI?",
      "What is loan tenure?",
      "How does Smart Lender work?",
      "How accurate is this prediction?"
    ],
    "Telugu": [
      "నా లోన్ ఎందుకు తిరస్కరించబడింది?",
      "నా లోన్ ఎందుకు ఆమోదించబడింది?",
      "నా క్రెడిట్ స్కోరును నేను ఎలా మెరుగుపరచుకోవాలి?",
      "నేను మళ్లీ దరఖాస్తు చేసుకోవచ్చా?",
      "క్రెడిట్ హిస్టరీ అంటే ఏమిటి?",
      "లోన్ ఆమోదాన్ని ఏ అంశాలు ప్రభావితం చేస్తాయి?",
      "ఏ పత్రాలు అవసరం?",
      "EMI అంటే ఏమిటి?",
      "లోన్ గడువు (tenure) అంటే ఏమిటి?",
      "స్మార్ట్ లెండర్ ఎలా పనిచేస్తుంది?",
      "ఈ అంచనా ఎంత ఖచ్చితమైనది?"
    ],
    "Hindi": [
      "मेरा लोन क्यों रिजेक्ट हुआ?",
      "मेरा लोन क्यों स्वीकृत हुआ?",
      "मैं अपना क्रेडिट स्कोर कैसे सुधार सकता हूँ?",
      "क्या मैं दोबारा आवेदन कर सकता हूँ?",
      "क्रेडिट इतिहास क्या है?",
      "लोन स्वीकृति को क्या प्रभावित करता है?",
      "कौन से दस्तावेज आवश्यक हैं?",
      "ईएमआई (EMI) क्या है?",
      "लोन की अवधि (tenure) क्या है?",
      "स्मार्ट लेंडर कैसे काम करता है?",
      "यह भविष्यवाणी कितनी सटीक है?"
    ],
    "Tamil": [
      "எனது கடன் ஏன் நிராகரிக்கப்பட்டது?",
      "எனது கடன் ஏன் அங்கீகரிக்கப்பட்டது?",
      "எனது கடன் மதிப்பெண்ணை எவ்வாறு மேம்படுத்துவது?",
      "நான் மீண்டும் விண்ணப்பிக்கலாமா?",
      "கடன் வரலாறு என்றால் என்ன?",
      "கடன் ஒப்புதலை பாதிக்கும் காரணிகள் யாவை?",
      "என்ன ஆவணங்கள் தேவை?",
      "EMI என்றால் என்ன?",
      "கடன் காலம் என்றால் என்ன?",
      "ஸ்மார்ட் லெண்டர் எவ்வாறு செயல்படுகிறது?",
      "இந்த கணிப்பு எவ்வளவு துல்லியமானது?"
    ],
    "Kannada": [
      "ನನ್ನ ಸಾಲ ಏಕೆ ತಿರಸ್ಕರಿಸಲ್ಪಟ್ಟಿತು?",
      "ನನ್ನ ಸಾಲ ಏಕೆ ಅನುಮೋದನೆಯಾಯಿತು?",
      "ನನ್ನ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಹೇಗೆ ಸುಧಾರಿಸಬಹುದು?",
      "ನಾನು ಮತ್ತೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದೇ?",
      "ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ ಎಂದರೇನು?",
      "ಸಾಲ ಅನುಮೋದನೆಗೆ ಏನು ಪ್ರಭಾವ ಬೀರುತ್ತದೆ?",
      "ಯಾವ ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ?",
      "ಇಎಂಐ (EMI) ಎಂದರೇನು?",
      "ಸಾಲದ ಅವಧಿ ಎಂದರೇನು?",
      "ಸ್ಮಾರ್ಟ್ ಲೆಂಡರ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
      "ಈ ಮುನ್ಸೂಚನೆ ಎಷ್ಟು ನಿಖರವಾಗಿದೆ?"
    ]
  };

  const currentFaqs = faqsByLanguage[selectedLanguage] || faqsByLanguage["English"];

  return (
    <div className="faq-cards-container">
      <p className="faq-section-title">
        <HelpCircle size={14} style={{ color: 'var(--color-primary)' }} />
        {t.faqs_title || "Common FAQ Questions"}
      </p>
      <div className="faq-grid">
        {currentFaqs.map((faq, idx) => (
          <button
            key={idx}
            type="button"
            className="faq-card-button"
            onClick={() => onSelectQuestion(faq)}
          >
            {faq}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FAQCards;
