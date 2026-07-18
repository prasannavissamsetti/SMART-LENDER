import logging

logger = logging.getLogger(__name__)

class ChatbotService:
    def __init__(self):
        # Multilingual database for all assets
        self.translations = {
            "English": {
                "welcome": "Hello! Welcome to Smart Lender AI Assistant. \nI can explain your loan prediction, help you understand why your loan was approved or rejected, answer banking and loan-related questions, and guide you on improving your loan eligibility.",
                "faqs_prompt": "Choose a question below or ask me anything:",
                "explain_prompt_needed": "Please run a credit assessment first in the Workspace so I can retrieve and explain your loan eligibility.",
                "fallback": "I'm here to help, but I didn't fully catch that question. I can explain your prediction, give eligibility suggestions, answer banking questions (like credit score, EMIs, or loan tenure), or generate your downloadable Eligibility Report. Could you rephrase your question?",
                "sync_banner": "Synced with latest prediction:",
                "approved_title": "### 🎉 Good News! Your Loan Assessment is APPROVED.",
                "approved_intro": "Our AI analysis shows a **{risk} Risk** profile with a confidence rating of **{confidence}%**.",
                "approved_positive_header": "**Key Positive Factors Supporting This Outcome:**",
                "approved_factors": {
                    "credit": "• **Excellent Credit History**: No prior defaults recorded. This is the single most positive factor in your assessment.",
                    "income": "• **Strong Primary Income**: Your individual monthly income indicates solid financial capacity.",
                    "co_income": "• **Co-applicant Support**: The co-applicant's income further reduces default risk.",
                    "amount": "• **Appropriate Loan Principal**: The requested loan amount is well-balanced against your household income.",
                    "term": "• **Healthy Loan Term**: A standard repayment window keeps debt manageable.",
                    "general": "• **Stable Repayment Profile**: General financial indicators are within acceptable limits."
                },
                "approved_outro": "**Note**: These are AI-generated recommendations based on the submitted application parameters. We encourage maintaining healthy financial habits and responsible, on-time repayments to sustain your excellent credit rating!",
                
                "rejected_title": "### 📋 Loan Assessment Summary: REJECTED",
                "rejected_intro": "The AI assessment flags this application as a **{risk} Risk** scenario (Confidence: **{confidence}%**).",
                "rejected_negative_header": "**Primary Contributing Factors:**",
                "rejected_factors": {
                    "credit": "• **Prior Credit History Defaults**: A lack of clean credit records indicates high repayment risk for lenders.",
                    "income": "• **Limited Monthly Income**: A primary monthly income under $3,500 makes supporting mortgage or loan terms harder.",
                    "amount": "• **High Debt-to-Income Ratio**: The requested loan amount is high relative to your current household income.",
                    "term": "• **Extended Loan Tenure**: A longer repayment window increases the long-term risk profile.",
                    "general": "• **High Aggregate Risk Score**: Combined risk factors indicate a higher probability of repayment difficulties."
                },
                "rejected_outro": "**Important Info**: These are AI-generated recommendations based on the submitted application parameters to help guide financial improvements. We never simply say 'Loan Rejected'—you can improve your eligibility profile and apply again!",
                
                "suggestions_header": "Based on your assessment, here are actionable suggestions to improve your eligibility:",
                "suggestions_info": "You can also view a full Eligibility Improvement Report by typing 'report' or clicking the download button in the chat.",
                "suggestions_not_needed": "Your loan was approved! You don't need eligibility improvements, but keeping credit usage below 30% helps maintain your good status.",
                "suggestions_general_fallback": "To give you custom suggestions, please complete a credit prediction assessment. Otherwise, generally paying debts on time and reducing loan size helps!",
                
                "suggestions_list": {
                    "credit": {
                        "title": "Improve Credit History",
                        "description": "Pay existing outstanding debts, resolve credit defaults, and maintain consistent credit account histories."
                    },
                    "amount": {
                        "title": "Reduce Loan Amount",
                        "description": "Consider applying for a lower loan amount (e.g. ${suggested_amount}k instead of ${amount}k) to lower your debt load."
                    },
                    "income": {
                        "title": "Increase Monthly Income",
                        "description": "Supplement income or apply when you have a stronger base salary or additional verifiable income streams."
                    },
                    "co_income": {
                        "title": "Add a Co-applicant",
                        "description": "Adding a spouse or family member with a stable income and clean credit profile will significantly improve eligibility."
                    },
                    "term": {
                        "title": "Shorten Loan Term",
                        "description": "Apply for a standard repayment term (e.g., 360 days or shorter) to minimize interest accumulation risk."
                    },
                    "transactions": {
                        "title": "Maintain Regular Transactions",
                        "description": "Keep active bank account records with solid balance reserves to prove stable transaction history."
                    },
                    "profile": {
                        "title": "Apply After Profile Clean up",
                        "description": "Wait 3-6 months while improving key variables before submitting a new application."
                    }
                },
                
                "report_status": {
                    "Approved": "Conditional Approval",
                    "Rejected": "Needs Financial Adjustments"
                },
                "report_reasons": {
                    "credit": "Prior defaults/poor credit history rating.",
                    "income": "Insufficient primary applicant income (${income:.2f}/mo).",
                    "amount": "Excessive requested loan amount (${amount:.2f}k) relative to income.",
                    "term": "High risk loan term of {term:.0f} days.",
                    "general": "High cumulative financial risk values."
                },
                "report_eligibility_status": {
                    "Approved": "95% (Approved / Minimal Risk)",
                    "Rejected": "85% (Approved / Low Risk)"
                },
                "report_checklist": [
                    "Review credit report and clear any outstanding defaults",
                    "Ensure total loan amount requested is less than 2x annual household income",
                    "Secure stable employment record for the last 12-24 months",
                    "Add co-applicant to joint-repayment profile",
                    "Maintain active, positive bank transactions for 6 months"
                ]
            },
            "Telugu": {
                "welcome": "నమస్కారం! స్మార్ట్ లెండర్ AI అసిస్టెంట్‌కి స్వాగతం. \nనేను మీ లోన్ దరఖాస్తు ఫలితాన్ని వివరించగలను, మీ లోన్ ఎందుకు ఆమోదించబడిందో లేదా తిరస్కరించబడిందో అర్థం చేసుకోవడానికి సహాయపడగలను, బ్యాంకింగ్ మరియు లోన్ కి సంబంధించిన ప్రశ్నలకు సమాధానమివ్వగలను మరియు మీ లోన్ అర్హతను ఎలా పెంచుకోవాలో మార్గదర్శకత్వం చేయగలను.",
                "faqs_prompt": "క్రింది వాటిలో ఒక ప్రశ్నను ఎంచుకోండి లేదా నన్ను ఏదైనా అడగండి:",
                "explain_prompt_needed": "దయచేసి మీ లోన్ అర్హతను పొందడానికి మరియు వివరించడానికి మొదట దరఖాస్తును సమర్పించండి.",
                "fallback": "నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను, కానీ మీ ప్రశ్న నాకు పూర్తిగా అర్థం కాలేదు. నేను మీ లోన్ ఫలితాన్ని వివరించగలను, అర్హత మెరుగుపరచుకోవడానికి సూచనలను అందించగలను, బ్యాంకింగ్ ప్రశ్నలకు (క్రెడిట్ స్కోరు, EMIలు లేదా లోన్ గడువు వంటివి) సమాధానం ఇవ్వగలను లేదా మీ అర్హత నివేదికను అందించగలను. దయచేసి మీ ప్రశ్నను మార్చి అడగండి.",
                "sync_banner": "తాజా అంచనాతో సమకాలీకరించబడింది:",
                "approved_title": "### 🎉 శుభవార్త! మీ లోన్ అభ్యర్థన ఆమోదించబడింది.",
                "approved_intro": "మా AI విశ్లేషణ ప్రకారం ఇది **{risk} Risk** ప్రొఫైల్ మరియు దీని విశ్వసనీయత రేటింగ్ **{confidence}%**.",
                "approved_positive_header": "**ఈ ఫలితానికి మద్దతు ఇస్తున్న ముఖ్యమైన అనుకూల అంశాలు:**",
                "approved_factors": {
                    "credit": "• **అద్భుతమైన క్రెడిట్ హిస్టరీ**: గతంలో ఎలాంటి డిఫాల్ట్‌లు లేవు. మీ అంచనాలో ఇది అత్యంత సానుకూల అంశం.",
                    "income": "• **బలమైన ప్రాథమిక ఆదాయం**: మీ వ్యక్తిగత నెలవారీ ఆదాయం మంచి ఆర్థిక సామర్థ్యాన్ని సూచిస్తుంది.",
                    "co_income": "• **సహ-దరఖాస్తుదారు మద్దతు**: సహ-దరఖాస్తుదారు ఆదాయం లోన్ డిఫాల్ట్ అయ్యే ప్రమాదాన్ని మరింత తగ్గిస్తుంది.",
                    "amount": "• **సరిపడే లోన్ మొత్తం**: మీరు కోరిన లోన్ మొత్తం మీ ఇంటి ఆదాయంతో పోల్చినప్పుడు సమతుల్యంగా ఉంది.",
                    "term": "• **ఆరోగ్యకరమైన లోన్ గడువు**: ప్రామాణిక రీపేమెంట్ గడువు రుణ భారాన్ని అదుపులో ఉంచుతుంది.",
                    "general": "• **స్థిరమైన రీపేమెంట్ ప్రొఫైల్**: సాధారణ ఆర్థిక సూచికలు ఆమోదయోగ్యమైన పరిమితుల్లో ఉన్నాయి."
                },
                "approved_outro": "**గమనిక**: ఇవి సమర్పించిన దరఖాస్తు ఆధారంగా AI రూపొందించిన సిఫార్సులు. మీ అద్భుతమైన క్రెడిట్ రేటింగ్‌ను కాపాడుకోవడానికి ఆరోగ్యకరమైన ఆర్థిక అలవాట్లను మరియు సకాలంలో లోన్ చెల్లింపులను కొనసాగించాల్సిందిగా కోరుతున్నాము!",
                
                "rejected_title": "### 📋 లోన్ దరఖాస్తు సమాచారం: తిరస్కరించబడింది",
                "rejected_intro": "ఈ దరఖాస్తు **{risk} Risk** ప్రొఫైల్ కలిగి ఉన్నట్లు AI విశ్లేషణ సూచిస్తుంది (విశ్వసనీయత: **{confidence}%**).",
                "rejected_negative_header": "**తిరస్కరణకు దారితీసిన ముఖ్య కారణాలు:**",
                "rejected_factors": {
                    "credit": "• **క్రెడిట్ హిస్టరీలో డిఫాల్ట్‌లు**: సరైన క్రెడిట్ రికార్డులు లేకపోవడం రుణదాతలకు అధిక రీపేమెంట్ ప్రమాదాన్ని సూచిస్తుంది.",
                    "income": "• **పరిమిత నెలవారీ ఆదాయం**: ప్రాథమిక నెలవారీ ఆదాయం $3,500 కంటే తక్కువగా ఉండటం వలన లోన్ వాయిదాలను చెల్లించడం కష్టతరం అవుతుంది.",
                    "amount": "• **అధిక అప్పు-ఆదాయ నిష్పత్తి**: మీరు కోరిన లోన్ మొత్తం మీ ప్రస్తుత గృహ ఆదాయంతో పోల్చినప్పుడు చాలా ఎక్కువగా ఉంది.",
                    "term": "• **ఎక్కువ లోన్ గడువు**: రీపేమెంట్ గడువు ఎక్కువగా ఉండటం దీర్ఘకాలిక ప్రమాదాన్ని పెంచుతుంది.",
                    "general": "• **అధిక సంయుక్త ప్రమాద స్కోరు**: కలిపి ఉన్న ప్రమాద కారకాలు రీపేమెంట్ కష్టమయ్యే అవకాశం ఉందని సూచిస్తున్నాయి."
                },
                "rejected_outro": "**ముఖ్య సమాచారం**: ఇవి మీ ఆర్థిక ప్రొఫైల్‌ను మెరుగుపరచుకోవడంలో సహాయపడటానికి దరఖాస్తు పారామితుల ఆధారంగా AI సృష్టించిన సిఫార్సులు. మేము కేవలం 'లోన్ తిరస్కరించబడింది' అని చెప్పము—మీరు మీ అర్హతను మెరుగుపరుచుకుని మళ్లీ దరఖాస్తు చేసుకోవచ్చు!",
                
                "suggestions_header": "మీ అంచనా ఆధారంగా, మీ అర్హతను మెరుగుపరచుకోవడానికి కొన్ని ఆచరణాత్మక సూచనలు ఇక్కడ ఉన్నాయి:",
                "suggestions_info": "మీరు చాట్‌లో 'report' అని టైప్ చేయడం ద్వారా లేదా డౌన్‌లోడ్ బటన్‌పై క్లిక్ చేయడం ద్వారా పూర్తి అర్హత నివేదికను చూడవచ్చు.",
                "suggestions_not_needed": "మీ లోన్ ఆమోదించబడింది! మీకు అర్హత మెరుగుదలలు అవసరం లేదు, కానీ క్రెడిట్ వినియోగాన్ని 30% కంటే తక్కువగా ఉంచడం మంచి క్రెడిట్ స్కోరును కాపాడుకోవడానికి సహాయపడుతుంది.",
                "suggestions_general_fallback": "మీకు తగిన సూచనలు ఇవ్వడానికి, దయచేసి లోన్ అంచనాను పూర్తి చేయండి. సాధారణంగా సకాలంలో అప్పులు చెల్లించడం మరియు తక్కువ లోన్ మొత్తం కోరడం సహాయపడుతుంది!",
                
                "suggestions_list": {
                    "credit": {
                        "title": "క్రెడిట్ హిస్టరీని మెరుగుపరచండి",
                        "description": "ప్రస్తుత బాకీలను చెల్లించండి, క్రెడిట్ డిఫాల్ట్‌లను పరిష్కరించండి మరియు స్థిరమైన క్రెడిట్ ఖాతా రికార్డును నిర్వహించండి."
                    },
                    "amount": {
                        "title": "లోన్ మొత్తాన్ని తగ్గించండి",
                        "description": "మీ రుణ భారాన్ని తగ్గించుకోవడానికి తక్కువ లోన్ మొత్తాన్ని కోరడాన్ని పరిశీలించండి (ఉదా. ${amount}k బదులుగా ${suggested_amount}k)."
                    },
                    "income": {
                        "title": "నెలవారీ ఆదాయాన్ని పెంచుకోండి",
                        "description": "ఆదాయాన్ని పెంచుకోండి లేదా బలమైన స్థిర జీతం లేదా అదనపు ఆదాయ వనరులు ఉన్నప్పుడు దరఖాస్తు చేసుకోండి."
                    },
                    "co_income": {
                        "title": "సహ-దరఖాస్తుదారుని జోడించండి",
                        "description": "స్థిరమైన ఆదాయం మరియు మంచి క్రెడిట్ ప్రొఫైల్ ఉన్న సహ-దరఖాస్తుదారుని జోడించడం మీ అర్హతను గణనీయంగా పెంచుతుంది."
                    },
                    "term": {
                        "title": "లోన్ గడువును తగ్గించండి",
                        "description": "దీర్ఘకాలిక వడ్డీ ప్రమాదాన్ని తగ్గించడానికి ప్రామాణిక రీపేమెంట్ గడువు కోసం దరఖాస్తు చేసుకోండి (ఉదా. 360 రోజులు లేదా అంతకంటే తక్కువ)."
                    },
                    "transactions": {
                        "title": "క్రమబద్ధమైన లావాదేవీలను నిర్వహించండి",
                        "description": "స్థిరమైన లావాదేవీల రికార్డును చూపించడానికి తగినంత నిల్వలతో బ్యాంకు ఖాతా లావాదేవీలను చురుకుగా ఉంచండి."
                    },
                    "profile": {
                        "title": "ప్రొఫైల్ మెరుగయ్యాక దరఖాస్తు చేయండి",
                        "description": "కొత్త దరఖాస్తును సమర్పించే ముందు కనీసం 3-6 నెలల పాటు మీ ఆర్థిక పారామితులను మెరుగుపరచుకోండి."
                    }
                },
                
                "report_status": {
                    "Approved": "షరతులతో కూడిన ఆమోదం",
                    "Rejected": "ఆర్థిక సర్దుబాట్లు అవసరం"
                },
                "report_reasons": {
                    "credit": "గతంలో డిఫాల్ట్‌లు లేదా బలహీనమైన క్రెడిట్ రేటింగ్ ఉండటం.",
                    "income": "ప్రాథమిక దరఖాస్తుదారు ఆదాయం సరిపోకపోవడం (నెలకి ${income:.2f}).",
                    "amount": "ఆదాయంతో పోలిస్తే అధిక లోన్ మొత్తం అభ్యర్థించడం (${amount:.2f}k).",
                    "term": "అధిక రిస్క్ ఉన్న లోన్ గడువు ({term:.0f} రోజులు).",
                    "general": "అధిక ఆర్థిక ప్రమాద స్కోరు విలువలు."
                },
                "report_eligibility_status": {
                    "Approved": "95% (ఆమోదించబడింది / కనిష్ట రిస్క్)",
                    "Rejected": "85% (ఆమోదించబడింది / తక్కువ రిస్క్)"
                },
                "report_checklist": [
                    "క్రెడిట్ రిపోర్టును సమీక్షించి, బాకీలను చెల్లించండి",
                    "లోన్ మొత్తం వార్షిక గృహ ఆదాయం కంటే 2 రెట్లు తక్కువగా ఉండేలా చూసుకోండి",
                    "గత 12-24 నెలలుగా స్థిరమైన ఉద్యోగ రికార్డును కలిగి ఉండండి",
                    "సహ-దరఖాస్తుదారుని లోన్ ప్రొఫైల్‌కు జోడించండి",
                    "గత 6 నెలలుగా చురుకైన మరియు సానుకూల బ్యాంకు లావాదేవీలను నిర్వహించండి"
                ]
            },
            "Hindi": {
                "welcome": "नमस्ते! स्मार्ट लेंडर एआई असिस्टेंट में आपका स्वागत है। \nमैं आपके लोन की भविष्यवाणी को समझा सकता हूँ, योग्यता सुधारने के उपाय बता सकता हूँ और बैंकिंग प्रश्नों के उत्तर दे सकता हूँ। मैं यह समझने में भी आपकी मदद कर सकता हूँ कि आपका लोन क्यों स्वीकृत या अस्वीकृत हुआ।",
                "faqs_prompt": "नीचे दिए गए प्रश्नों में से एक चुनें या मुझसे कुछ भी पूछें:",
                "explain_prompt_needed": "कृपया पहले कार्यक्षेत्र (Workspace) में क्रेडिट मूल्यांकन चलाएं ताकि मैं आपके ऋण पात्रता विवरण प्राप्त कर सकूं और समझा सकूं।",
                "fallback": "मैं मदद के लिए तैयार हूँ, लेकिन मैं आपके प्रश्न को पूरी तरह से समझ नहीं पाया। मैं आपके लोन परिणाम को समझा सकता हूँ, पात्रता सुधारने के सुझाव दे सकता हूँ, बैंकिंग से जुड़े प्रश्नों (जैसे क्रेडिट स्कोर, ईएमआई, या लोन अवधि) का उत्तर दे सकता हूँ। कृपया अपना प्रश्न बदलकर पूछें।",
                "sync_banner": "नवीनतम परिणाम के साथ समन्वयित:",
                "approved_title": "### 🎉 खुशखबरी! आपका ऋण मूल्यांकन स्वीकृत हो गया है।",
                "approved_intro": "हमारे एआई विश्लेषण के अनुसार आपका प्रोफाइल **{risk} Risk** श्रेणी में है और इसकी विश्वसनीयता रेटिंग **{confidence}%** है।",
                "approved_positive_header": "**इस परिणाम का समर्थन करने वाले मुख्य सकारात्मक कारक:**",
                "approved_factors": {
                    "credit": "• **उत्कृष्ट क्रेडिट इतिहास**: कोई पुराना डिफॉल्ट दर्ज नहीं है। यह आपके मूल्यांकन में सबसे अनुकूल कारक है।",
                    "income": "• **मजबूत प्राथमिक आय**: आपकी व्यक्तिगत मासिक आय ठोस वित्तीय क्षमता को दर्शाती है।",
                    "co_income": "• **सह-आवेदक का समर्थन**: सह-आवेदक की आय ऋण डिफॉल्ट के जोखिम को काफी कम करती है।",
                    "amount": "• **उचित ऋण राशि**: आपके द्वारा अनुरोधित ऋण राशि आपकी घरेलू आय के साथ संतुलित है।",
                    "term": "• **स्वस्थ ऋण अवधि**: मानक चुकौती अवधि ऋण को प्रबंधनीय बनाए रखती है।",
                    "general": "• **स्थिर चुकौती प्रोफाइल**: सामान्य वित्तीय संकेतक स्वीकार्य सीमाओं के भीतर हैं."
                },
                "approved_outro": "**नोट**: ये जमा किए गए आवेदन के आधार पर एआई द्वारा तैयार की गई सिफारिशें हैं। अपने उत्कृष्ट क्रेडिट स्कोर को बनाए रखने के लिए हम समय पर पुनर्भुगतान की सलाह देते हैं!",
                
                "rejected_title": "### 📋 ऋण मूल्यांकन सारांश: अस्वीकृत",
                "rejected_intro": "एआई मूल्यांकन इस आवेदन को **{risk} Risk** परिदृश्य के रूप में चिह्नित करता है (विश्वसनीयता: **{confidence}%**)।",
                "rejected_negative_header": "**अस्वीकृति के प्राथमिक जिम्मेदार कारक:**",
                "rejected_factors": {
                    "credit": "• **क्रेडिट इतिहास में डिफॉल्ट**: स्वच्छ क्रेडिट रिकॉर्ड की कमी ऋणदाताओं के लिए उच्च पुनर्भुगतान जोखिम दर्शाती है।",
                    "income": "• **सीमित मासिक आय**: $3,500 से कम की प्राथमिक मासिक आय ऋण की किस्तों को चुकाना कठिन बनाती है।",
                    "amount": "• **उच्च ऋण-से-आय अनुपात**: अनुरोधित ऋण राशि आपकी वर्तमान घरेलू आय की तुलना में बहुत अधिक है।",
                    "term": "• **लंबी ऋण अवधि**: लंबी चुकौती अवधि दीर्घकालिक जोखिम प्रोफाइल को बढ़ाती है।",
                    "general": "• **उच्च संचयी जोखिम स्कोर**: संयुक्त जोखिम कारक चुकौती में कठिनाइयों की उच्च संभावना का संकेत देते हैं।"
                },
                "rejected_outro": "**महत्वपूर्ण जानकारी**: ये वित्तीय सुधारों में मदद के लिए एआई द्वारा उत्पन्न सुझाव हैं। हम कभी भी केवल 'ऋण अस्वीकृत' नहीं कहते—आप अपनी पात्रता में सुधार करके पुनः आवेदन कर सकते हैं!",
                
                "suggestions_header": "आपके मूल्यांकन के आधार पर, पात्रता में सुधार करने के कुछ व्यावहारिक सुझाव नीचे दिए गए हैं:",
                "suggestions_info": "आप चैट में 'report' लिखकर या डाउनलोड बटन पर क्लिक करके अपनी पूर्ण पात्रता सुधार रिपोर्ट देख सकते हैं।",
                "suggestions_not_needed": "आपका ऋण स्वीकृत हो गया है! आपको पात्रता सुधारने की आवश्यकता नहीं है, लेकिन क्रेडिट उपयोग को 30% से कम रखना अच्छा स्कोर बनाए रखने में मदद करता है।",
                "suggestions_general_fallback": "सटीक सुझाव प्राप्त करने के लिए कृपया पहले क्रेडिट मूल्यांकन पूरा करें। सामान्यतः ऋण की राशि कम करना और बकाया भुगतान समय पर करना सहायक होता है।",
                
                "suggestions_list": {
                    "credit": {
                        "title": "क्रेडिट इतिहास सुधारें",
                        "description": "पुराने बकाया ऋणों का भुगतान करें, क्रेडिट डिफॉल्ट को हल करें और एक स्थिर क्रेडिट खाता रिकॉर्ड बनाए रखें।"
                    },
                    "amount": {
                        "title": "ऋण राशि कम करें",
                        "description": "अपनी ऋण चुकौती क्षमता के अनुसार कम ऋण राशि के लिए आवेदन करने पर विचार करें (जैसे ${amount}k के बजाय ${suggested_amount}k)।"
                    },
                    "income": {
                        "title": "मासिक आय बढ़ाएं",
                        "description": "मासिक आय बढ़ाएं या तब आवेदन करें जब आपके पास एक मजबूत आधार वेतन या अतिरिक्त सत्यापित आय स्रोत हों।"
                    },
                    "co_income": {
                        "title": "सह-आवेदक जोड़ें",
                        "description": "स्थिर आय और अच्छे क्रेडिट प्रोफाइल वाले सह-आवेदक को जोड़ने से आपकी पात्रता में उल्लेखनीय सुधार होगा।"
                    },
                    "term": {
                        "title": "ऋण की अवधि घटाएं",
                        "description": "दीर्घकालिक ब्याज जोखिम से बचने के लिए एक मानक पुनर्भुगतान अवधि (जैसे 360 दिन या उससे कम) के लिए आवेदन करें।"
                    },
                    "transactions": {
                        "title": "नियमित बैंकिंग लेनदेन रखें",
                        "description": "एक स्थिर लेनदेन इतिहास साबित करने के लिए अपने बैंक खाते में पर्याप्त राशि बनाए रखें और सक्रिय रहें।"
                    },
                    "profile": {
                        "title": "प्रोफाइल सुधरने पर आवेदन करें",
                        "description": "नया आवेदन जमा करने से पहले कम से कम 3-6 महीने तक अपने वित्तीय प्रोफाइल को बेहतर बनाने का प्रयास करें।"
                    }
                },
                
                "report_status": {
                    "Approved": "सशर्त स्वीकृति",
                    "Rejected": "वित्तीय समायोजन की आवश्यकता"
                },
                "report_reasons": {
                    "credit": "पुराना डिफॉल्ट या खराब क्रेडिट इतिहास होना।",
                    "income": "मासिक आय का अपर्याप्त होना (मासिक आय: ${income:.2f})।",
                    "amount": "आय की तुलना में अत्यधिक ऋण राशि का अनुरोध करना (${amount:.2f}k)।",
                    "term": "ऋण की अत्यधिक जोखिमपूर्ण अवधि ({term:.0f} दिन)।",
                    "general": "उच्च संचयी वित्तीय जोखिम संकेतक।"
                },
                "report_eligibility_status": {
                    "Approved": "95% (स्वीकृत / न्यूनतम जोखिम)",
                    "Rejected": "85% (स्वीकृत / कम जोखिम)"
                },
                "report_checklist": [
                    "क्रेडिट रिपोर्ट की समीक्षा करें और सभी बकाया भुगतान क्लियर करें",
                    "सुनिश्चित करें कि ऋण राशि वार्षिक घरेलू आय के 2 गुना से कम हो",
                    "पिछले 12-24 महीनों से एक स्थिर रोजगार रिकॉर्ड बनाए रखें",
                    "ऋण प्रोफाइल में एक सह-आवेदक को शामिल करें",
                    "पिछले 6 महीनों से बैंक खाते में सक्रिय और सकारात्मक लेनदेन बनाए रखें"
                ]
            },
            "Tamil": {
                "welcome": "வணக்கம்! ஸ்மார்ட் லெண்டர் AI உதவியாளருக்கு உங்களை வரவேற்கிறோம். \nநான் உங்கள் கடன் கணிப்பு முடிவை விளக்க முடியும், உங்கள் கடன் ஏன் அங்கீகரிக்கப்பட்டது அல்லது நிராகரிக்கப்பட்டது என்பதை நீங்கள் புரிந்து கொள்ள உதவ முடியும், மேலும் வங்கி சார்ந்த சந்தேகங்களுக்கு பதிலளிப்பேன்.",
                "faqs_prompt": "கீழே உள்ள கேள்விகளில் ஒன்றைத் தேர்ந்தெடுக்கவும் அல்லது என்னிடம் ஏதாவது கேட்கவும்:",
                "explain_prompt_needed": "உங்கள் கடன் தகுதியை விளக்க முதலில் பணிவிடத்தில் (Workspace) மதிப்பீட்டைச் சமர்ப்பிக்கவும்.",
                "fallback": "நான் உங்களுக்கு உதவ தயாராக உள்ளேன், ஆனால் உங்கள் கேள்வி எனக்கு முழுமையாக புரியவில்லை. நான் உங்கள் கடன் முடிவை விளக்க முடியும், தகுதியை மேம்படுத்துவதற்கான ஆலோசனைகளை வழங்க முடியும், வங்கி சார்ந்த கேள்விகளுக்கு (கடன் மதிப்பெண், EMI அல்லது கடன் காலம் போன்றவை) பதிலளிக்க முடியும். தயவுசெய்து உங்கள் கேள்வியை மாற்றி கேட்கவும்.",
                "sync_banner": "சமீபத்திய கணிப்புடன் ஒத்திசைக்கப்பட்டது:",
                "approved_title": "### 🎉 நற்செய்தி! உங்கள் கடன் விண்ணப்பம் அங்கீகரிக்கப்பட்டது.",
                "approved_intro": "எங்கள் AI பகுப்பாய்வின்படி இது **{risk} Risk** சுயவிவரத்தைக் கொண்டுள்ளது மற்றும் இதன் நம்பகத்தன்மை மதிப்பீடு **{confidence}%** ஆகும்.",
                "approved_positive_header": "**இந்த சாதகமான முடிவுக்கு வழிவகுத்த முக்கிய காரணங்கள்:**",
                "approved_factors": {
                    "credit": "• **சிறந்த கடன் வரலாறு**: இதற்குமுன் எந்தவொரு கடன் தவணைத் தவறுகளும் இல்லை. இதுவே மிக முக்கியமான சாதக காரணியாகும்.",
                    "income": "• **நிலையான மாத வருமானம்**: உங்களின் தனிப்பட்ட மாத வருமானம் வலுவான திருப்பிச் செலுத்தும் திறனைக் காட்டுகிறது.",
                    "co_income": "• **இணை விண்ணப்பதாரர் ஆதரவு**: இணை விண்ணப்பதாரரின் வருமானம் கடன் ஆபத்தைக் கணிசமாகக் குறைக்கிறது.",
                    "amount": "• **சரியான கடன் தொகை**: கோரப்பட்ட கடன் தொகை உங்கள் குடும்ப வருமானத்துடன் ஒப்பிடுகையில் சரியாக உள்ளது.",
                    "term": "• **ஆரோக்கியமான கடன் காலம்**: நிலையான திருப்பிச் செலுத்தும் காலம் கடனை எளிதாக நிர்வகிக்க உதவுகிறது.",
                    "general": "• **நிலையான கடன் சுயவிவரம்**: பொதுவான நிதி குறிகாட்டிகள் ஏற்றுக்கொள்ளத்தக்க வரம்புகளுக்குள் உள்ளன."
                },
                "approved_outro": "**குறிப்பு**: இவை சமர்ப்பிக்கப்பட்ட விண்ணப்பத்தின் அடிப்படையில் AI உருவாக்கிய பரிந்துரைகள் ஆகும். உங்கள் சிறந்த கடன் மதிப்பெண்ணைத் தக்கவைக்க, தவணைகளைச் சரியாகச் செலுத்துமாறு அறிவுறுத்துகிறோம்!",
                
                "rejected_title": "### 📋 கடன் மதிப்பீட்டு சுருக்கம்: நிராகரிக்கப்பட்டது",
                "rejected_intro": "இந்த விண்ணப்பம் **{risk} Risk** சுயவிவரத்தைக் கொண்டுள்ளதாக AI பகுப்பாய்வு குறிப்பிடுகிறது (நம்பகத்தன்மை: **{confidence}%**).",
                "rejected_negative_header": "**நிராகரிப்புக்கான முக்கிய காரணங்கள்:**",
                "rejected_factors": {
                    "credit": "• **முந்தைய கடன் தவணைத் தவறுகள்**: சுத்தமான கடன் வரலாறு இல்லாதது கடன் வழங்குநர்களுக்குத் திருப்பிச் செலுத்தும் ஆபத்தை உணர்த்துகிறது.",
                    "income": "• **குறைந்த மாத வருமானம்**: உங்களது மாத வருமானம் $3,500 க்கும் குறைவாக இருப்பதால் கடன் தவணைகளைச் செலுத்துவது கடினமாகலாம்.",
                    "amount": "• **அதிக கடன்-வருமான விகிதம்**: கோரப்பட்ட கடன் தொகை உங்கள் தற்போதைய குடும்ப வருமானத்துடன் ஒப்பிடுகையில் மிக அதிகமாக உள்ளது.",
                    "term": "• **நீண்ட கடன் காலம்**: திருப்பிச் செலுத்தும் காலம் அதிகமாக இருப்பது நீண்ட கால ஆபத்தை உருவாக்குகிறது.",
                    "general": "• **அதிக கூட்டு ஆபத்து மதிப்பெண்**: ஒருங்கிணைந்த கடன் காரணிகள் திருப்பிச் செலுத்துவதில் சிக்கல்கள் இருப்பதைக் காட்டுகின்றன."
                },
                "rejected_outro": "**முக்கிய தகவல்**: இவை உங்கள் நிதி சுயவிவரத்தை மேம்படுத்த உதவும் வகையில் AI உருவாக்கிய பரிந்துரைகள் ஆகும். நாங்கள் ஒருபோதும் 'கடன் நிராகரிக்கப்பட்டது' என்று மட்டும் கூற மாட்டோம்—உங்கள் தகுதியை மேம்படுத்தி மீண்டும் விண்ணப்பிக்கலாம்!",
                
                "suggestions_header": "உங்கள் மதிப்பீட்டின் அடிப்படையில் தகுதியை மேம்படுத்த சில முக்கியமான பரிந்துரைகள் கீழே தரப்பட்டுள்ளன:",
                "suggestions_info": "சட்டப்பில் 'report' என்று தட்டச்சு செய்வதன் மூலம் அல்லது பதிவிறக்க பொத்தானைக் கிளிக் செய்வதன் மூலம் முழு தகுதி அறிக்கையைக் காணலாம்.",
                "suggestions_not_needed": "உங்கள் கடன் அங்கீகரிக்கப்பட்டது! நீங்கள் தகுதியை மேம்படுத்தத் தேவையில்லை, ஆனால் கடன் பயன்பாட்டை 30% க்கும் குறைவாக வைத்திருப்பது நல்லது.",
                "suggestions_general_fallback": "உங்களுக்குத் தகுந்த பரிந்துரைகளை வழங்க, முதலில் கடன் மதிப்பீட்டைச் செய்யவும். பொதுவாகக் கடன் தொகையைக் குறைப்பது மற்றும் தவணைகளைச் சரியாகச் செலுத்துவது உதவும்.",
                
                "suggestions_list": {
                    "credit": {
                        "title": "கடன் வரலாற்றை மேம்படுத்தவும்",
                        "description": "நிலுவையில் உள்ள கடன்களைச் செலுத்தவும், முந்தைய தவணைத் தவறுகளைச் சரிசெய்யவும், சீரான கடன் பதிவைப் பராமரிக்கவும்."
                    },
                    "amount": {
                        "title": "கடன் தொகையைக் குறைக்கவும்",
                        "description": "திருப்பிச் செலுத்தும் திறனுக்கு ஏற்ப குறைந்த கடன் தொகையைக் கோரலாம் (உதாரணமாக ${amount}k க்குப் பதிலாக ${suggested_amount}k)."
                    },
                    "income": {
                        "title": "மாத வருமானத்தை அதிகரிக்கவும்",
                        "description": "வருமானத்தை அதிகரிக்கவும் அல்லது நிலையான ஊதியம் அல்லது கூடுதல் வருமானம் இருக்கும்போது விண்ணப்பிக்கவும்."
                    },
                    "co_income": {
                        "title": "இணை விண்ணப்பதாரரைச் சேர்க்கவும்",
                        "description": "நிலையான வருமானமும் நல்ல கடன் வரலாறும் கொண்ட ஒருவரை இணை விண்ணப்பதாரராகச் சேர்ப்பது தகுதியை அதிகரிக்கும்."
                    },
                    "term": {
                        "title": "கடன் காலத்தைக் குறைக்கவும்",
                        "description": "நீண்ட கால வட்டி ஆபத்தைக் குறைக்கக் குறுகிய திருப்பிச் செலுத்தும் காலத்தைக் தேர்ந்தெடுக்கவும் (360 நாட்கள் அல்லது அதற்குக் குறைவாக)."
                    },
                    "transactions": {
                        "title": "சீரான வங்கிப் பரிவர்த்தனைகளைப் பராமரிக்கவும்",
                        "description": "வங்கி கணக்கில் போதிய இருப்புத் தொகையை வைத்துச் சீரான பரிவர்த்தனைகளைக் காண்பிக்கவும்."
                    },
                    "profile": {
                        "title": "சுயவிவரத்தை மேம்படுத்திய பின் விண்ணப்பிக்கவும்",
                        "description": "புதிய விண்ணப்பத்தை சமர்ப்பிப்பதற்கு முன் 3-6 மாதங்கள் நிதிப் பராமீட்டர்களை மேம்படுத்த முயற்சிக்கவும்."
                    }
                },
                
                "report_status": {
                    "Approved": "நிபந்தனைக்குட்பட்ட அனுமதி",
                    "Rejected": "நிதிச் சீரமைப்பு தேவைப்படுகிறது"
                },
                "report_reasons": {
                    "credit": "முந்தைய தவணைத் தவறுகள் அல்லது பலவீனமான கடன் மதிப்பெண் வரலாறு.",
                    "income": "விண்ணப்பதாரரின் மாத வருமானம் போதுமானதாக இல்லை (மாதம் ${income:.2f}).",
                    "amount": "வருமானத்துடன் ஒப்பிடுகையில் மிக அதிக கடன் தொகை கோరப்பட்டுள்ளது (${amount:.2f}k).",
                    "term": "அதிக ஆபத்துள்ள கடன் காலம் ({term:.0f} நாட்கள்).",
                    "general": "அதிக ஒருங்கிணைந்த நிதி ஆபத்து மதிப்புகள்."
                },
                "report_eligibility_status": {
                    "Approved": "95% (அங்கீகரிக்கப்பட்டது / குறைந்த ஆபத்து)",
                    "Rejected": "85% (அங்கீகரிக்கப்பட்டது / மிதமான ஆபத்து)"
                },
                "report_checklist": [
                    "கடன் அறிக்கையைச் சரிபார்த்து நிலுவைகளைச் செலுத்தவும்",
                    "கடன் தொகை குடும்ப ஆண்டு வருமானத்தை விட 2 மடங்கு குறைவாக இருப்பதை உறுதி செய்யவும்",
                    "கடந்த 12-24 மாதங்களாக நிலையான வேலைப் பதிவை உறுதிப்படுத்தவும்",
                    "கடன் சுயவிவரத்தில் இணை விண்ணப்பதாரரைச் சேர்க்கவும்",
                    "கடந்த 6 மாதங்களாகச் செயலில் உள்ள வங்கிப் பரிவர்த்தனைகளைப் பராமரிக்கவும்"
                ]
            },
            "Kannada": {
                "welcome": "ನಮಸ್ಕಾರ! ಸ್ಮಾರ್ಟ್ ಲೆಂಡರ್ AI ಅಸಿಸ್ಟೆಂಟ್‌ಗೆ ಸುಸ್ವಾಗತ. \nನಿಮ್ಮ ಸಾಲದ ಮುನ್ಸೂಚನೆಯನ್ನು ವಿವರಿಸಲು, ಸಾಲದ ಅರ್ಹತೆಯನ್ನು ಹೇಗೆ ಹೆಚ್ಚಿಸುವುದು ಎಂದು ತಿಳಿಸಲು ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ನಿಮ್ಮ ಸಾಲ ಏಕೆ ಅನುಮೋದನೆಯಾಗಿದೆ ಅಥವಾ ತಿರಸ್ಕರಿಸಲ್ಪಟ್ಟಿದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
                "faqs_prompt": "ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನನ್ನನ್ನು ಏನನ್ನಾದರೂ ಕೇಳಿ:",
                "explain_prompt_needed": "ನಿಮ್ಮ ಸಾಲದ ಅರ್ಹತೆಯ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ದಯವಿಟ್ಟು ಮೊದಲು ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ.",
                "fallback": "ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಸಿದ್ಧನಿದ್ದೇನೆ, ಆದರೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆ ನನಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ. ನಾನು ನಿಮ್ಮ ಸಾಲದ ಫಲಿತಾಂಶವನ್ನು ವಿವರಿಸಬಲ್ಲೆ, ಅರ್ಹತೆಯನ್ನು ಸುಧಾರಿಸಲು ಸಲಹೆ ನೀಡಬಲ್ಲೆ, ಬ್ಯಾಂಕಿಂಗ್ ಪ್ರಶ್ನೆಗಳಿಗೆ (ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್, ಇಎಂಐ ಅಥವಾ ಸಾಲದ ಅವಧಿ) ಉತ್ತರಿಸಬಲ್ಲೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬದಲಾಯಿಸಿ ಕೇಳಿ.",
                "sync_banner": "ಇತ್ತೀಚಿನ ಅಂದಾಜಿನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ:",
                "approved_title": "### 🎉 ಶುಭ ಸುದ್ದಿ! ನಿಮ್ಮ ಸಾಲದ ಮೌಲ್ಯಮಾಪನ ಅನುಮೋದಿಸಲಾಗಿದೆ.",
                "approved_intro": "ನಮ್ಮ AI ವಿಶ್ಲೇಷಣೆಯ ಪ್ರಕಾರ ಇದು **{risk} Risk** ಪ್ರೊಫೈಲ್ ಆಗಿದೆ ಮತ್ತು ಇದರ ವಿಶ್ವಾಸಾರ್ಹತೆ ರೇಟಿಂಗ್ **{confidence}%** ಆಗಿದೆ.",
                "approved_positive_header": "**ಈ ಫಲಿತಾಂಶವನ್ನು ಬೆಂಬಲಿಸುವ ಪ್ರಮುಖ ಧನಾತ್ಮಕ ಅಂಶಗಳು:**",
                "approved_factors": {
                    "credit": "• **ಅತ್ಯುತ್ತಮ ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ**: ಈ ಹಿಂದೆ ಯಾವುದೇ ಬಾಕಿ ಪಾವತಿ ವಿಳಂಬವಿಲ್ಲ. ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ಇದು ಅತ್ಯಂತ ಪ್ರಮುಖ ಅಂಶವಾಗಿದೆ.",
                    "income": "• **ಬಲವಾದ ಪ್ರಾಥಮಿಕ ಆದಾಯ**: ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಸಿಕ ಆದಾಯವು ಉತ್ತಮ ಆರ್ಥಿಕ ಸಾಮರ್ಥ್ಯವನ್ನು ತೋರಿಸುತ್ತದೆ.",
                    "co_income": "• **ಸಹ-ಅರ್ಜಿದಾರರ ಬೆಂಬಲ**: ಸಹ-ಅರ್ಜಿದಾರರ ಆದಾಯವು ಸಾಲದ ಮರುಪಾವತಿ ಅಪಾಯವನ್ನು ಇನ್ನಷ್ಟು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
                    "amount": "• **ಸರಿಯಾದ ಸಾಲದ ಪ್ರಮಾಣ**: ನೀವು ವಿನಂತಿಸಿದ ಸಾಲದ ಮೊತ್ತವು ನಿಮ್ಮ ಒಟ್ಟು ಆದಾಯದೊಂದಿಗೆ ಸಮತೋಲನದಲ್ಲಿದೆ.",
                    "term": "• **ಉತ್ತಮ ಸಾಲದ ಅವಧಿ**: ಪ್ರಮಾಣಿತ ಮರುಪಾವತಿ ಅವಧಿಯು ಸಾಲದ ಹೊರೆಯನ್ನು ಸುಲಭವಾಗಿ ನಿಭಾಯಿಸಲು ನೆರವಾಗುತ್ತದೆ.",
                    "general": "• **ಸ್ಥಿರ ಮರುಪಾವತಿ ಪ್ರೊಫೈಲ್**: ಸಾಮಾನ್ಯ ಆರ್ಥಿಕ ಸೂಚಕಗಳು ಸ್ವೀಕಾರಾರ್ಹ ಮಿತಿಗಳಲ್ಲಿವೆ."
                },
                "approved_outro": "**ಸೂಚನೆ**: ಇವು ಸಲ್ಲಿಕೆಯಾದ ಅರ್ಜಿಯ ಆಧಾರದ ಮೇಲೆ AI ರಚಿಸಿದ ಶಿಫಾರಸುಗಳಾಗಿವೆ. ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸಕಾಲದಲ್ಲಿ ಪಾವತಿಯನ್ನು ಮುಂದುವರಿಸಿ!",
                
                "rejected_title": "### 📋 ಸಾಲ ಮೌಲ್ಯಮಾಪನ ಸಾರಾಂಶ: ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
                "rejected_intro": "ಈ ಅಪ್ಲಿಕೇಶನ್ **{risk} Risk** ಹೊಂದಿದೆ ಎಂದು AI ವಿಶ್ಲೇಷಣೆ ಸೂಚಿಸುತ್ತದೆ (ವಿಶ್ವಾಸಾರ್ಹತೆ: **{confidence}%**).",
                "rejected_negative_header": "**ತಿರಸ್ಕಾರಕ್ಕೆ ಕಾರಣವಾದ ಪ್ರಮುಖ ಅಂಶಗಳು:**",
                "rejected_factors": {
                    "credit": "• **ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸದಲ್ಲಿ ಸುಸ್ತಿ**: ಸ್ವಚ್ಛ ಕ್ರೆಡಿಟ್ ದಾಖಲೆ ಇಲ್ಲದಿರುವುದು ಸಾಲ ನೀಡುವವರಿಗೆ ಹೆಚ್ಚಿನ ಅಪಾಯವನ್ನು ತೋರಿಸುತ್ತದೆ.",
                    "income": "• **ಸೀಮಿತ ಮಾಸಿಕ ಆದಾಯ**: $3,500 ಗಿಂತ ಕಡಿಮೆ ಆದಾಯವಿದ್ದರೆ ಸಾಲದ ಕಂತುಗಳನ್ನು ಪಾವತಿಸುವುದು ಕಷ್ಟಕರವಾಗಬಹುದು.",
                    "amount": "• **ಹೆಚ್ಚಿನ ಸಾಲ-ಆದಾಯ ಅನುಪಾತ**: ವಿನಂತಿಸಿದ ಸಾಲದ ಮೊತ್ತವು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಆದಾಯಕ್ಕೆ ಹೋಲಿಸಿದರೆ ತುಂಬಾ ಹೆಚ್ಚಾಗಿದೆ.",
                    "term": "• **ದೀರ್ಘ ಸಾಲದ ಅವಧಿ**: ಮರುಪಾವತಿ ಅವಧಿ ದೀರ್ಘವಾಗಿದ್ದರೆ ಆರ್ಥಿಕ ಅಪಾಯದ ಪ್ರಮಾಣ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
                    "general": "• **ಹೆಚ್ಚಿನ ಒಟ್ಟು ಅಪಾಯದ ಸ್ಕೋರ್**: ಸಂಯೋಜಿತ ಅಪಾಯದ ಅಂಶಗಳು ಮರುಪಾವತಿ ಕಷ್ಟವಾಗುವ ಸಾಧ್ಯತೆಯನ್ನು ಸೂಚಿಸುತ್ತವೆ."
                },
                "rejected_outro": "**ಪ್ರಮುಖ ಮಾಹಿತಿ**: ಇವು ನಿಮ್ಮ ಆರ್ಥಿಕ ಪ್ರೊಫೈಲ್ ಸುಧಾರಿಸಲು AI ರಚಿಸಿದ ಶಿಫಾರಸುಗಳಾಗಿವೆ. ನಾವು ಕೇವಲ 'ಸಾಲ ತಿರಸ್ಕರಿಸಲ್ಪಟ್ಟಿದೆ' ಎಂದು ಹೇಳುವುದಿಲ್ಲ—ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಸುಧಾರಿಸಿ ಮತ್ತೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು!",
                
                "suggestions_header": "ನಿಮ್ಮ ಅಂದಾಜಿನ ಆಧಾರದ ಮೇಲೆ, ಅರ್ಹತೆಯನ್ನು ಸುಧಾರಿಸಲು ಕೆಲವು ಪ್ರಾಯೋಗಿಕ ಸಲಹೆಗಳು ಇಲ್ಲಿವೆ:",
                "suggestions_info": "ನೀವು ಚಾಟ್‌ನಲ್ಲಿ 'report' ಎಂದು ಟೈಪ್ ಮಾಡುವ ಮೂಲಕ ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಸಂಪೂರ್ಣ ವರದಿಯನ್ನು ಪಡೆಯಬಹುದು.",
                "suggestions_not_needed": "ನಿಮ್ಮ ಸಾಲ ಅನುಮೋದನೆಯಾಗಿದೆ! ನಿಮಗೆ ಅರ್ಹತೆ ಸುಧಾರಣೆಗಳು ಬೇಕಾಗಿಲ್ಲ, ಆದರೆ ಉತ್ತಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸಕಾಲದಲ್ಲಿ ಪಾವತಿ ಮಾಡಿ.",
                "suggestions_general_fallback": "ನಿಮಗೆ ಸೂಕ್ತವಾದ ಸಲಹೆಗಳನ್ನು ನೀಡಲು, ದಯವಿಟ್ಟು ಮೊದಲು ಸಾಲದ ಅಂದಾಜನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ. ಸಾಮಾನ್ಯವಾಗಿ ಸಾಲದ ಮೊತ್ತವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು ಮತ್ತು ಬಾಕಿ ಪಾವತಿಸುವುದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
                
                "suggestions_list": {
                    "credit": {
                        "title": "ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ ಸುಧಾರಿಸಿ",
                        "description": "ಬಾಕಿ ಇರುವ ಸಾಲಗಳನ್ನು ಪಾವತಿಸಿ, ಕ್ರೆಡಿಟ್ ಸುಸ್ತಿಗಳನ್ನು ಬಗೆಹರಿಸಿ ಮತ್ತು ಸ್ಥಿರವಾದ ಕ್ರೆಡಿಟ್ ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಿ."
                    },
                    "amount": {
                        "title": "ಸಾಲದ ಪ್ರಮಾಣವನ್ನು ಕಡಿಮೆ ಮಾಡಿ",
                        "description": "ಸಾಲದ ಹೊರೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಕಡಿಮೆ ಮೊತ್ತಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ (ಉದಾ. ${amount}k ಬದಲಿಗೆ ${suggested_amount}k)."
                    },
                    "income": {
                        "title": "ಮಾಸಿಕ ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸಿ",
                        "description": "ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸಿಕೊಳ್ಳಿ ಅಥವಾ ಸ್ಥಿರ ಉದ್ಯೋಗ ಅಥವಾ ಹೆಚ್ಚುವರಿ ಆದಾಯದ ಮೂಲಗಳಿರುವಾಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ."
                    },
                    "co_income": {
                        "title": "ಸಹ-ಅರ್ಜಿದಾರರನ್ನು ಸೇರಿಸಿ",
                        "description": "ಸ್ಥಿರ ಆದಾಯ ಮತ್ತು ಉತ್ತಮ ಕ್ರೆಡಿಟ್ ಪ್ರೊಫೈಲ್ ಇರುವವರನ್ನು ಸಹ-ಅರ್ಜಿದಾರರಾಗಿ ಸೇರಿಸುವುದು ಅರ್ಹತೆಯನ್ನು ಗಮನಾರ್ಹವಾಗಿ ಹೆಚ್ಚಿಸುತ್ತದೆ."
                    },
                    "term": {
                        "title": "ಸಾಲದ ಅವಧಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ",
                        "description": "ದೀರ್ಘಾವಧಿಯ ಬಡ್ಡಿಯ ಅಪಾಯವನ್ನು ತಪ್ಪಿಸಲು ಕಡಿಮೆ ಮರುಪಾವತಿ ಅವಧಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ (360 ದಿನಗಳು ಅಥವಾ ಕಡಿಮೆ)."
                    },
                    "transactions": {
                        "title": "ಸಕ್ರಿಯ ಬ್ಯಾಂಕ್ ವಹಿವಾಟುಗಳನ್ನು ಇರಿಸಿ",
                        "description": "ಸ್ಥಿರವಾದ ವಹಿವಾಟಿನ ದಾಖಲೆಯನ್ನು ಸಾಬೀತುಪಡಿಸಲು ಬ್ಯಾಂಕ್ ಖಾತೆಯಲ್ಲಿ ಸೂಕ್ತವಾದ ಉಳಿತಾಯವನ್ನು ನಿರ್ವಹಿಸಿ."
                    },
                    "profile": {
                        "title": "ಪ್ರೊಫೈಲ್ ಸುಧಾರಿಸಿದ ನಂತರ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
                        "description": "ಹೊಸ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸುವ ಮೊದಲು ಕನಿಷ್ಠ 3-6 ತಿಂಗಳ ಕಾಲ ನಿಮ್ಮ ಆರ್ಥಿಕ ಪ್ರೊಫೈಲ್ ಸುಧಾರಿಸಲು ಪ್ರಯತ್ನಿಸಿ."
                    }
                },
                
                "report_status": {
                    "Approved": "ಷರತ್ತುಬದ್ಧ ಅನುಮೋದನೆ",
                    "Rejected": "ಆರ್ಥಿಕ ಹೊಂದಾಣಿಕೆಗಳ ಅಗತ್ಯವಿದೆ"
                },
                "report_reasons": {
                    "credit": "ಹಿಂದಿನ ಸಾಲ ಮರುಪಾವತಿ ಸುಸ್ತಿ ಅಥವಾ ಕಳಪೆ ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ ದಾಖಲೆ.",
                    "income": "ಅರ್ಜಿದಾರರ ಮಾಸಿಕ ಆದಾಯವು ಸಾಕಷ್ಟಿಲ್ಲ (ತಿಂಗಳಿಗೆ ${income:.2f}).",
                    "amount": "ಆದಾಯಕ್ಕೆ ಹೋಲಿಸಿದರೆ ಅತಿಯಾದ ಸಾಲದ ಮೊತ್ತವನ್ನು ಕೋರಲಾಗಿದೆ (${amount:.2f}k).",
                    "term": "ಹೆಚ್ಚಿನ ಅಪಾಯವಿರುವ ಸಾಲದ ಅವಧಿ ({term:.0f} ದಿನಗಳು).",
                    "general": "ಹೆಚ್ಚಿನ ಒಟ್ಟು ಆರ್ಥಿಕ ಅಪಾಯದ ಸೂಚಕಗಳು."
                },
                "report_eligibility_status": {
                    "Approved": "95% (ಅನುಮೋದಿಸಲಾಗಿದೆ / ಕನಿಷ್ಠ ರಿಸ್ಕ್)",
                    "Rejected": "85% (ಅನುಮೋದಿಸಲಾಗಿದೆ / ಕಡಿಮೆ ರಿಸ್ಕ್)"
                },
                "report_checklist": [
                    "ಕ್ರೆಡಿಟ್ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಬಾಕಿ ಪಾವತಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
                    "ಸಾಲದ ಮೊತ್ತವು ವಾರ್ಷಿಕ ಆದಾಯದ 2 ಪಟ್ಟು ಮೀರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ",
                    "ಕಳೆದ 12-24 ತಿಂಗಳುಗಳಿಂದ ಸ್ಥಿರ ಉದ್ಯೋಗದ ದಾಖಲೆ ನಿರ್ವಹಿಸಿ",
                    "ಸಾಲದ ಪ್ರೊಫೈಲ್‌ಗೆ ಸಹ-ಅರ್ಜಿದಾರರನ್ನು ಸೇರಿಸಿ",
                    "ಕಳೆದ 6 ತಿಂಗಳುಗಳಿಂದ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಸಕ್ರಿಯ ವಹಿವಾಟುಗಳನ್ನು ನಿರ್ವಹಿಸಿ"
                ]
            }
        }

        # Localized FAQs list
        self.faqs_multilingual = {
            "English": [
                {"id": "why_rejected", "question": "Why was my loan rejected?", "answer": "Loans are typically rejected due to low credit score/credit history default, high debt-to-income ratio (low income relative to the loan amount), or employment instability. To see why your specific application was rejected, please check your latest eligibility assessment."},
                {"id": "why_approved", "question": "Why was my loan approved?", "answer": "An approval recommendation means your application scored highly across key risk assessments, showing excellent repayment capability. Positive factors include a strong credit history (no previous defaults), stable income, and low overall risk profile."},
                {"id": "improve_score", "question": "How can I improve my credit score?", "answer": "You can improve your credit score by: 1) Paying all credit card bills and loans on time. 2) Keeping credit utilization below 30%. 3) Avoiding too many credit applications in a short period. 4) Regularly checking your credit report for errors."},
                {"id": "reapply", "question": "Can I apply again?", "answer": "Yes! You can reapply after improving your financial parameters, such as increasing your monthly income, reducing the requested loan amount, or adding a co-applicant to distribute repayment risk."},
                {"id": "credit_history", "question": "What is credit history?", "answer": "Credit history tracks your past borrowing and repayment behaviors. A rating of 1.0 indicates a good history (timely repayments and no defaults), which is the most critical factor that lenders look for."},
                {"id": "what_affects_approval", "question": "What affects loan approval?", "answer": "Key factors include your credit history, applicant income, co-applicant income, requested loan amount, loan repayment term, and property location. Balancing your income against requested debt is crucial."},
                {"id": "docs_required", "question": "What documents are required?", "answer": "Generally, you need: 1) Identity Proof (Passport/Driver's License). 2) Income Proof (Payslips/Tax filings). 3) Bank statements for the last 6 months. 4) Collateral property documents."},
                {"id": "what_is_emi", "question": "What is EMI?", "answer": "EMI stands for Equated Monthly Installment. It is the fixed amount you pay back to the lender each month until the loan is fully repaid, covering both principal and interest."},
                {"id": "loan_tenure", "question": "What is loan tenure?", "answer": "Loan tenure is the duration of the loan (e.g., 360 days or 15/30 years) within which the borrower must repay the loan amount with interest."},
                {"id": "how_lender_works", "question": "How does Smart Lender work?", "answer": "Smart Lender evaluates key financial factors like income, credit history, and loan term using an advanced XGBoost machine learning model trained on historical lending outcomes to assess creditworthiness."},
                {"id": "accuracy", "question": "How accurate is this prediction?", "answer": "Our AI prediction model is highly accurate, built with cross-validated financial variables. However, it should only be used as a guideline. Final decisions are made by banking audit officers."}
            ],
            "Telugu": [
                {"id": "why_rejected", "question": "నా లోన్ ఎందుకు తిరస్కరించబడింది?", "answer": "సాధారణంగా తక్కువ క్రెడిట్ స్కోర్/గతంలో లోన్ బకాయిలు ఉండటం, అధిక అప్పు-ఆదాయ నిష్పత్తి (ఆదాయం కంటే లోన్ మొత్తం ఎక్కువగా ఉండటం) లేదా ఉపాధి అస్థిరత వంటి కారణాల వల్ల లోన్లు తిరస్కరించబడతాయి. మీ దరఖాస్తు ఎందుకు తిరస్కరించబడిందో తెలుసుకోవడానికి మీ తాజా అర్హత నివేదికను చూడండి."},
                {"id": "why_approved", "question": "నా లోన్ ఎందుకు ఆమోదించబడింది?", "answer": "ఆమోదం పొందిందంటే మీ దరఖాస్తు ముఖ్యమైన ప్రమాద అంచనాలలో మంచి మార్కులు సాధించిందని, అద్భుతమైన రీపేమెంట్ సామర్థ్యాన్ని కలిగి ఉందని అర్థం. మంచి క్రెడిట్ హిస్టరీ (మునుపటి బకాయిలు లేకపోవడం), స్థిరమైన ఆదాయం దీనికి సానుకూల అంశాలు."},
                {"id": "improve_score", "question": "నా క్రెడిట్ స్కోరును నేను ఎలా మెరుగుపరచుకోవాలి?", "answer": "మీరు ఈ క్రింది విధంగా క్రెడిట్ స్కోరును మెరుగుపరచుకోవచ్చు: 1) అన్ని క్రెడిట్ కార్డు బిల్లులు మరియు లోన్ వాయిదాలను సకాలంలో చెల్లించడం. 2) క్రెడిట్ వినియోగాన్ని 30% కంటే తక్కువగా ఉంచడం. 3) తక్కువ సమయంలో ఎక్కువ క్రెడిట్ అప్లికేషన్లు పెట్టుకోకపోవడం."},
                {"id": "reapply", "question": "నేను మళ్లీ దరఖాస్తు చేసుకోవచ్చా?", "answer": "అవును! నెలవారీ ఆదాయాన్ని పెంచుకోవడం, తక్కువ లోన్ మొత్తం అడగడం లేదా సహాయక దరఖాస్తుదారుని జోడించడం ద్వారా మీ ఆర్థిక పారామితులను మెరుగుపరిచిన తర్వాత మీరు మళ్లీ దరఖాస్తు చేసుకోవచ్చు."},
                {"id": "credit_history", "question": "క్రెడిట్ హిస్టరీ అంటే ఏమిటి?", "answer": "క్రెడిట్ హిస్టరీ మీ గత రుణాలు మరియు రీపేమెంట్ ప్రవర్తనలను ట్రాక్ చేస్తుంది. 1.0 రేటింగ్ ఉంటే మంచి హిస్టరీ (సకాలంలో చెల్లింపులు, బకాయిలు లేకపోవడం) ఉన్నట్లు భావిస్తారు, ఇది లోన్ ఆమోదానికి అత్యంత కీలకం."},
                {"id": "what_affects_approval", "question": "లోన్ ఆమోదాన్ని ఏ అంశాలు ప్రభావితం చేస్తాయి?", "answer": "మీ క్రెడిట్ చరిత్ర, దరఖాస్తుదారు ఆదాయం, సహ-దరఖాస్తుదారు ఆదాయం, అభ్యర్థించిన లోన్ మొత్తం, లోన్ రీపేమెంట్ గడువు మరియు ఆస్తి ప్రాంతం ప్రధాన అంశాలు."},
                {"id": "docs_required", "question": "ఏ పత్రాలు అవసరం?", "answer": "సాధారణంగా కావలసినవి: 1) గుర్తింపు కార్డు (పాస్‌పోర్ట్/డ్రైవింగ్ లైసెన్స్). 2) ఆదాయ రుజువు (పేస్లిప్స్/ఐటి రిటర్న్స్). 3) గత 6 నెలల బ్యాంక్ స్టేట్‌మెంట్స్. 4) తాకట్టు పెట్టే ఆస్తి పత్రాలు."},
                {"id": "what_is_emi", "question": "EMI అంటే ఏమిటి?", "answer": "EMI అంటే ఈక్వేటెడ్ మంత్లీ ఇన్‌స్టాల్‌మెంట్. లోన్ మరియు వడ్డీ పూర్తిగా చెల్లించే వరకు మీరు ప్రతి నెల రుణదాతకు చెల్లించాల్సిన స్థిరమైన మొత్తం."},
                {"id": "loan_tenure", "question": "లోన్ గడువు (tenure) అంటే ఏమిటి?", "answer": "లోన్ గడువు అనేది రుణం తీసుకున్న మొత్తాన్ని వడ్డీతో కలిపి తిరిగి చెల్లించడానికి రుణదాత కేటాయించిన కాలవ్యవధి (ఉదా. 360 రోజులు లేదా 15 సంవత్సరాలు)."},
                {"id": "how_lender_works", "question": "స్మార్ట్ లెండర్ ఎలా పనిచేస్తుంది?", "answer": "ఆర్థిక వేరియబుల్స్ మరియు గత లోన్ డేటా ఆధారంగా క్రెడిట్ యోగ్యతను అంచనా వేయడానికి స్మార్ట్ లెండర్ అధునాతన XGBoost మెషిన్ లెర్నింగ్ మోడల్‌ను ఉపయోగిస్తుంది."},
                {"id": "accuracy", "question": "ఈ అంచనా ఎంత ఖచ్చితమైనది?", "answer": "మా AI అంచనా మోడల్ చారిత్రక బ్యాంకింగ్ డేటా ఆధారంగా అత్యంత ఖచ్చితత్వంతో రూపొందించబడింది. అయితే, ఇది నిర్ణయాలకు సహాయకారిగా మాత్రమే పనిచేస్తుంది. అంతిమ నిర్ణయం బ్యాంకింగ్ అధికారుల చేతుల్లో ఉంటుంది."}
            ],
            "Hindi": [
                {"id": "why_rejected", "question": "मेरा लोन क्यों रिजेक्ट हुआ?", "answer": "लोन आमतौर पर कम क्रेडिट स्कोर/डिफॉल्ट इतिहास, ऋण-से-आय अनुपात (आय के अनुपात में लोन अधिक होना) या रोजगार अस्थिरता के कारण अस्वीकृत होते हैं। आपका विशिष्ट आवेदन क्यों अस्वीकृत हुआ, यह देखने के लिए कृपया अपनी पात्रता रिपोर्ट देखें।"},
                {"id": "why_approved", "question": "मेरा लोन क्यों स्वीकृत हुआ?", "answer": "स्वीकृति का मतलब है कि आपके आवेदन ने मुख्य जोखिम मूल्यांकनों में उत्कृष्ट अंक प्राप्त किए हैं, जो आपकी मजबूत चुकौती क्षमता दिखाता है। सकारात्मक कारकों में अच्छा क्रेडिट इतिहास (कोई पुराना डिफॉल्ट नहीं) और स्थिर आय शामिल हैं।"},
                {"id": "improve_score", "question": "मैं अपना क्रेडिट स्कोर कैसे सुधार सकता हूँ?", "answer": "आप अपना क्रेडिट स्कोर इस प्रकार सुधार सकते हैं: 1) सभी बिलों और किस्तों का समय पर भुगतान करें। 2) क्रेडिट सीमा का 30% से कम उपयोग करें। 3) अल्पावधि में बहुत सारे नए ऋणों के लिए आवेदन करने से बचें।"},
                {"id": "reapply", "question": "क्या मैं दोबारा आवेदन कर सकता हूँ?", "answer": "हाँ! आप अपनी मासिक आय बढ़ाकर, ऋण राशि को कम करके, या सह-आवेदक जोड़कर अपने वित्तीय प्रोफाइल को बेहतर बनाने के बाद दोबारा आवेदन कर सकते हैं।"},
                {"id": "credit_history", "question": "क्रेडिट इतिहास क्या है?", "answer": "क्रेडिट इतिहास आपके पुराने कर्ज लेने और चुकाने के व्यवहार को दर्शाता है। 1.0 की रेटिंग अच्छे इतिहास (समय पर भुगतान, कोई डिफॉल्ट नहीं) को दर्शाती है, जिसे बैंक सबसे पहले देखते हैं।"},
                {"id": "what_affects_approval", "question": "लोन स्वीकृति को क्या प्रभावित करता है?", "answer": "मुख्य कारकों में आपका क्रेडिट इतिहास, आवेदक की मासिक आय, सह-आवेदक की आय, अनुरोधित लोन राशि, पुनर्भुगतान की अवधि और संपत्ति का क्षेत्र शामिल हैं।"},
                {"id": "docs_required", "question": "कौन से दस्तावेज आवश्यक हैं?", "answer": "सामान्यतः आवश्यक दस्तावेज: 1) पहचान प्रमाण (पासपोर्ट/ड्राइविंग लाइसेंस)। 2) आय प्रमाण (वेतन पर्ची/आईटीआर)। 3) पिछले 6 महीनों का बैंक स्टेटमेंट। 4) संपत्ति के दस्तावेज।"},
                {"id": "what_is_emi", "question": "ईएमआई (EMI) क्या है?", "answer": "ईएमआई का मतलब 'समान मासिक किस्त' है। यह वह निश्चित राशि है जो आप लोन चुकाने तक हर महीने बैंक को देते हैं, जिसमें मूलधन और ब्याज दोनों शामिल होते हैं।"},
                {"id": "loan_tenure", "question": "लोन की अवधि (tenure) क्या है?", "answer": "लोन की अवधि वह समय सीमा है जिसके भीतर उधारकर्ता को ब्याज सहित लोन चुकाना होता है (जैसे 360 दिन या 20 वर्ष)।"},
                {"id": "how_lender_works", "question": "स्मार्ट लेंडर कैसे काम करता है?", "answer": "स्मार्ट लेंडर प्रमुख वित्तीय कारकों का मूल्यांकन करने और ऋण जोखिम का अनुमान लगाने के लिए एक उन्नत ऐतिहासिक डेटा-प्रशिक्षित XGBoost मशीन लर्निंग मॉडल का उपयोग करता है।"},
                {"id": "accuracy", "question": "यह भविष्यवाणी कितनी सटीक है?", "answer": "हमारा एआई मॉडल अत्यधिक सटीक और सत्यापित है। हालाँकि, इसका उपयोग केवल वित्तीय मार्गदर्शन के लिए किया जाना चाहिए। अंतिम निर्णय बैंक अधिकारियों द्वारा किया जाता है।"}
            ],
            "Tamil": [
                {"id": "why_rejected", "question": "எனது கடன் ஏன் நிராகரிக்கப்பட்டது?", "answer": "குறைந்த கடன் மதிப்பெண், முந்தைய கடன் தவணைத் தவறுகள், அதிக கடன்-வருமான விகிதம் அல்லது வேலை உறுதியற்ற தன்மை ஆகியவற்றால் கடன்கள் நிராகரிக்கப்படுகின்றன. உங்கள் குறிப்பிட்ட விண்ணப்பம் ஏன் நிராகரிக்கப்பட்டது என்பதை அறிய தகுதி அறிக்கையைச் சரிபார்க்கவும்."},
                {"id": "why_approved", "question": "எனது கடன் ஏன் அங்கீகரிக்கப்பட்டது?", "answer": "அங்கீகாரம் என்பது உங்கள் விண்ணப்பம் திருப்பிச் செலுத்தும் திறனில் சிறந்த மதிப்பீட்டைப் பெற்றுள்ளது என்பதைக் காட்டுகிறது. நல்ல கடன் வரலாறு மற்றும் நிலையான வருமானம் போன்றவை சாதகமான காரணிகள் ஆகும்."},
                {"id": "improve_score", "question": "எனது கடன் மதிப்பெண்ணை (Credit Score) எவ்வாறு மேம்படுத்துவது?", "answer": "கடன் மதிப்பெண்ணை மேம்படுத்த: 1) அனைத்துக் கடன் அட்டை மற்றும் கடன் தவணைகளைச் சரியாகச் செலுத்துங்கள். 2) கடன் வரம்பில் 30% க்கும் குறைவாகப் பயன்படுத்துங்கள். 3) குறுகிய காலத்தில் பல கடன்களுக்கு விண்ணப்பிக்கக் கூடாது."},
                {"id": "reapply", "question": "நான் மீண்டும் விண்ணப்பிக்கலாமா?", "answer": "ஆம்! மாத வருமானத்தை அதிகரிப்பது, கோரும் கடன் தொகையைக் குறைப்பது அல்லது இணை விண்ணப்பதாரரைச் சேர்ப்பது மூலம் உங்கள் நிதி சுயவிவரத்தை மேம்படுத்திய பின் மீண்டும் விண்ணப்பிக்கலாம்."},
                {"id": "credit_history", "question": "கடன் வரலாறு (Credit History) என்றால் என்ன?", "answer": "கடன் வரலாறு என்பது நீங்கள் வாங்கிய முந்தைய கடன்கள் மற்றும் திருப்பிச் செலுத்திய முறையைக் குறிக்கும் பதிவாகும். 1.0 மதிப்பீடு இருந்தால் தவணைத் தவறுகள் ஏதுமில்லாத நல்ல வரலாறு என்று பொருள், இது கடனுக்கு மிக அவசியம்."},
                {"id": "what_affects_approval", "question": "கடன் ஒப்புதலை பாதிக்கும் காரணிகள் யாவை?", "answer": "கடன் வரலாறு, விண்ணப்பதாரரின் வருமானம், இணை விண்ணப்பதாரரின் வருமானம், கடன் தொகை, திருப்பிச் செலுத்தும் காலம் மற்றும் சொத்தின் இருப்பிடம் ஆகியவை கடன் ஒப்புதலை பாதிக்கும் முக்கிய காரணிகள் ஆகும்."},
                {"id": "docs_required", "question": "என்ன ஆவணங்கள் தேவை?", "answer": "பொதுவாக தேவைப்படுபவை: 1) அடையாளச் சான்று (பாஸ்போர்ட்/ஓட்டுநர் உரிமம்). 2) வருமானச் சான்று (சம்பளச் சீட்டு/வரித் தாக்கல்). 3) கடந்த 6 மாத வங்கி கணக்கு அறிக்கை. 4) சொத்து ஆவணங்கள்."},
                {"id": "what_is_emi", "question": "EMI என்றால் என்ன?", "answer": "EMI என்பது சமமான மாதாந்திர தவணையைக் குறிக்கும். அசல் மற்றும் வட்டி அடங்கிய நிலையான தொகையை, கடன் முடியும் வரை ஒவ்வொரு மாதமும் கடன் வழங்கியவருக்குச் செலுத்த வேண்டும்."},
                {"id": "loan_tenure", "question": "கடன் காலம் (Loan Tenure) என்றால் என்ன?", "answer": "கடன் காலம் என்பது வாங்கிய கடனை வட்டியுடன் திருப்பிச் செலுத்த அனுமதிக்கப்படும் கால அவகாசமாகும் (எ.கா. 360 நாட்கள் அல்லது 20 ஆண்டுகள்)."},
                {"id": "how_lender_works", "question": "ஸ்மார்ட் லெண்டர் எவ்வாறு செயல்படுகிறது?", "answer": "வருமானம், கடன் வரலாறு போன்ற நிதி குறிகாட்டிகளை மதிப்பீடு செய்ய வரலாற்றுத் தரவுகளால் பயிற்றுவிக்கப்பட்ட மேம்பட்ட XGBoost இயந்திர கற்றல் மாதிரியை ஸ்மார்ட் லெண்டர் பயன்படுத்துகிறது."},
                {"id": "accuracy", "question": "இந்த கணிப்பு எவ்வளவு துல்லியமானது?", "answer": "எங்கள் AI மாதிரி மிகவும் துல்லியமானது. இருப்பினும், இறுதி ஒப்புதல் முடிவுகள் வங்கித் தணிக்கை அதிகாரிகளின் சரிபார்ப்பிற்கு உட்பட்டது."}
            ],
            "Kannada": [
                {"id": "why_rejected", "question": "ನನ್ನ ಸಾಲ ಏಕೆ ತಿರಸ್ಕರಿಸಲ್ಪಟ್ಟಿತು?", "answer": "ಕಡಿಮೆ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್/ಸುಸ್ತಿ ಇತಿಹಾಸ, ಹೆಚ್ಚಿನ ಸಾಲ-ಆದಾಯ ಅನುಪಾತ ಅಥವಾ ಉದ್ಯೋಗದ ಅಸ್ಥಿರತೆಯಿಂದಾಗಿ ಸಾಮಾನ್ಯವಾಗಿ ಸಾಲಗಳು ತಿರಸ್ಕರಿಸಲ್ಪಡುತ್ತವೆ. ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಅರ್ಜಿ ತಿರಸ್ಕರಿಸಲು ಕಾರಣ ತಿಳಿಯಲು ನಿಮ್ಮ ಅರ್ಹತಾ ವರದಿ ಪರಿಶೀಲಿಸಿ."},
                {"id": "why_approved", "question": "ನನ್ನ ಸಾಲ ಏಕೆ ಅನುಮೋದನೆಯಾಯಿತು?", "answer": "ಅನುಮೋದನೆ ಎಂದರೆ ನಿಮ್ಮ ಅರ್ಜಿ ಉತ್ತಮ ಮರುಪಾವತಿ ಸಾಮರ್ಥ್ಯ ಹೊಂದಿದೆ ಎಂದು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗಿದೆ. ಉತ್ತಮ ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ (ಯಾವುದೇ ಸುಸ್ತಿ ಇಲ್ಲದಿರುವುದು) ಮತ್ತು ಸ್ಥಿರ ಆದಾಯ ಇದಕ್ಕೆ ಧನಾತ್ಮಕ ಅಂಶಗಳಾಗಿವೆ."},
                {"id": "improve_score", "question": "ನನ್ನ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಹೇಗೆ ಸುಧಾರಿಸಬಹುದು?", "answer": "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಿಸಲು: 1) ಎಲ್ಲಾ ಕಂತು ಮತ್ತು ಬಿಲ್‌ಗಳನ್ನು ಸಕಾಲದಲ್ಲಿ ಪಾವತಿಸಿ. 2) ಕ್ರೆಡಿಟ್ ಮಿತಿಯ 30% ಕ್ಕಿಂತ ಕಡಿಮೆ ಬಳಸಿ. 3) ಅಲ್ಪಾವಧಿಯಲ್ಲಿ ಹಲವಾರು ಹೊಸ ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಡಿ."},
                {"id": "reapply", "question": "ನಾನು ಮತ್ತೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದೇ?", "answer": "ಹೌದು! ಮಾಸಿಕ ಆದಾಯ ಹೆಚ್ಚಿಸಿಕೊಳ್ಳುವ ಮೂಲಕ, ಸಾಲದ ಮೊತ್ತವನ್ನು ಕಡಿಮೆ ಮಾಡುವ ಮೂಲಕ ಅಥವಾ ಸಹ-ಅರ್ಜಿದಾರರನ್ನು ಸೇರಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಹಣಕಾಸಿನ ನಿಯತಾಂಕಗಳನ್ನು ಸುಧಾರಿಸಿ ಮತ್ತೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು."},
                {"id": "credit_history", "question": "ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ ಎಂದರೇನು?", "answer": "ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ ನಿಮ್ಮ ಹಿಂದಿನ ಸಾಲ ಪಡೆಯುವಿಕೆ ಮತ್ತು ಮರುಪಾವತಿಯ ವಿವರವನ್ನು ತೋರಿಸುತ್ತದೆ. 1.0 ರೇಟಿಂಗ್ ಉತ್ತಮ ಇತಿಹಾಸವನ್ನು (ಸಕಾಲದಲ್ಲಿ ಪಾವತಿ, ಸುಸ್ತಿ ಇಲ್ಲದಿರುವುದು) ಬಿಂಬಿಸುತ್ತದೆ, ಇದು ಸಾಲ ಪಡೆಯಲು ಅತಿ ಮುಖ್ಯ."},
                {"id": "what_affects_approval", "question": "ಸಾಲ ಅನುಮೋದನೆಗೆ ಏನು ಪ್ರಭಾವ ಬೀರುತ್ತದೆ?", "answer": "ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ, ವೈಯಕ್ತಿಕ ಆದಾಯ, ಸಹ-ಅರ್ಜಿದಾರರ ಆದಾಯ, ಸಾಲದ ಮೊತ್ತ, ಮರುಪಾವತಿ ಅವಧಿ ಮತ್ತು ಆಸ್ತಿ ಇರುವ ಸ್ಥಳ ಮುಖ್ಯ ಪ್ರಭಾವಶಾಲಿ ಅಂಶಗಳು."},
                {"id": "docs_required", "question": "ಯಾವ ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ?", "answer": "ಸಾಮಾನ್ಯವಾಗಿ ಬೇಕಾಗುವ ದಾಖಲೆಗಳು: 1) ಗುರುತಿನ ಚೀಟಿ (ಪಾಸ್‌ಪೋರ್ಟ್/ಚಾಲನಾ ಪರವಾನಗಿ). 2) ಆದಾಯ ದಾಖಲೆ (ವೇತನ ಚೀಟಿ/ಐಟಿಆರ್). 3) ಕಳೆದ 6 ತಿಂಗಳ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್. 4) ಆಸ್ತಿ ಪತ್ರಗಳು."},
                {"id": "what_is_emi", "question": "ಇಎಂಐ (EMI) ಎಂದರೇನು?", "answer": "ಇಎಂಐ ಎಂದರೆ ಸಮಾನ ಮಾಸಿಕ ಕಂತು. ಸಾಲ ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ಬ್ಯಾಂಕ್‌ಗೆ ಪಾವತಿಸಬೇಕಾದ ಸ್ಥಿರ ಮೊತ್ತ, ಇದರಲ್ಲಿ ಅಸಲು ಮತ್ತು ಬಡ್ಡಿ ಸೇರಿರುತ್ತದೆ."},
                {"id": "loan_tenure", "question": "ಸಾಲದ ಅವಧಿ (Tenure) ಎಂದರೇನು?", "answer": "ಸಾಲದ ಅವಧಿ ಎಂದರೆ ಪಡೆದ ಸಾಲವನ್ನು ಬಡ್ಡಿಯೊಂದಿಗೆ ಬ್ಯಾಂಕ್‌ಗೆ ಹಿಂದಿರುಗಿಸಲು ಇರುವ ಒಟ್ಟು ಕಾಲಾವಕಾಶ (ಉದಾ. 360 ದಿನಗಳು ಅಥವಾ 15 ವರ್ಷಗಳು)."},
                {"id": "how_lender_works", "question": "ಸ್ಮಾರ್ಟ್ ಲೆಂಡರ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?", "answer": "ಆದಾಯ, ಕ್ರೆಡಿಟ್ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಸಾಲ ನೀಡಿಕೆಯ ಅಪಾಯವನ್ನು ಅಳೆಯಲು ಐತಿಹಾಸಿಕ ಸಾಲದ ದತ್ತಾಂಶದಿಂದ ತರಬೇತಿ ಪಡೆದ ಅತ್ಯಾಧುನಿಕ XGBoost ಮಾದರಿಯನ್ನು ಇದು ಬಳಸುತ್ತದೆ."},
                {"id": "accuracy", "question": "ಈ ಮುನ್ಸೂಚನೆ ಎಷ್ಟು ನಿಖರವಾಗಿದೆ?", "answer": "ನಮ್ಮ ಎಐ ಮಾದರಿ ಐತಿಹಾಸಿಕ ದತ್ತಾಂಶದ ಮೇಲೆ ಅತ್ಯಂತ ನಿಖರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಆದಾಗ್ಯೂ, ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಗಳ ಅಂತಿಮ ಪರಿಶೀಲನೆಯೇ ನಿರ್ಣಾಯಕವಾಗಿರುತ್ತದೆ."}
            ]
        }

    def get_faqs(self, language="English"):
        lang = language if language in self.faqs_multilingual else "English"
        return self.faqs_multilingual[lang]

    def explain_prediction(self, prediction, data, language="English"):
        lang = language if language in self.translations else "English"
        t = self.translations[lang]

        if not prediction or not data:
            return t["explain_prompt_needed"]
        
        status = prediction.get('prediction', 'Unknown')
        risk = prediction.get('risk_level', 'High')
        confidence = prediction.get('confidence', 0.0)

        # Retrieve variables
        credit_history = float(data.get('Credit History', 1.0))
        income = float(data.get('Applicant Income', 0.0))
        co_income = float(data.get('Coapplicant Income', 0.0))
        amount = float(data.get('Loan Amount', 0.0))
        term = float(data.get('Loan Amount Term', 360.0))

        if status == 'Approved':
            factors = []
            if credit_history == 1.0:
                factors.append(t["approved_factors"]["credit"])
            if income > 5000:
                factors.append(t["approved_factors"]["income"])
            if co_income > 0:
                factors.append(t["approved_factors"]["co_income"])
            if amount < (income + co_income) * 1.5:
                factors.append(t["approved_factors"]["amount"])
            if term <= 360:
                factors.append(t["approved_factors"]["term"])
            
            if not factors:
                factors.append(t["approved_factors"]["general"])

            factors_str = "\n".join(factors)
            title = t["approved_title"]
            intro = t["approved_intro"].format(risk=risk, confidence=confidence)
            header = t["approved_positive_header"]
            outro = t["approved_outro"]

            return f"{title}\n\n{intro}\n\n{header}\n{factors_str}\n\n{outro}"
        else:
            factors = []
            if credit_history == 0.0:
                factors.append(t["rejected_factors"]["credit"])
            if income < 3500:
                factors.append(t["rejected_factors"]["income"])
            if amount > (income + co_income) * 3:
                factors.append(t["rejected_factors"]["amount"])
            if term > 360:
                factors.append(t["rejected_factors"]["term"])
            
            if not factors:
                factors.append(t["rejected_factors"]["general"])

            factors_str = "\n".join(factors)
            title = t["rejected_title"]
            intro = t["rejected_intro"].format(risk=risk, confidence=confidence)
            header = t["rejected_negative_header"]
            outro = t["rejected_outro"]

            return f"{title}\n\n{intro}\n\n{header}\n{factors_str}\n\n{outro}"

    def generate_suggestions(self, prediction, data, language="English"):
        lang = language if language in self.translations else "English"
        t = self.translations[lang]

        if not prediction or not data:
            return []
        
        status = prediction.get('prediction', 'Unknown')
        if status == 'Approved':
            # Translate positive suggestion cards
            suggs_list = t["suggestions_list"]
            return [
                {
                    "title": suggs_list["credit"]["title"] if "credit" in suggs_list else "Maintain Credit",
                    "description": "Keep paying off bills on time to ensure your score remains high." if lang == "English" else "మీ క్రెడిట్ స్కోరును అధికంగా ఉంచడానికి సకాలంలో బిల్లులను చెల్లించండి." if lang == "Telugu" else "अपना स्कोर ऊंचा रखने के लिए समय पर बिलों का भुगतान जारी रखें।"
                }
            ]
        
        credit_history = float(data.get('Credit History', 1.0))
        income = float(data.get('Applicant Income', 0.0))
        co_income = float(data.get('Coapplicant Income', 0.0))
        amount = float(data.get('Loan Amount', 0.0))
        term = float(data.get('Loan Amount Term', 360.0))

        suggestions = []
        suggs_list = t["suggestions_list"]

        if credit_history == 0.0:
            suggestions.append(suggs_list["credit"])
        if amount > (income + co_income) * 2:
            suggested_amount = round((income + co_income) * 2, 1)
            # Replace placeholder in translated suggestions
            sugg_item = suggs_list["amount"].copy()
            sugg_item["description"] = sugg_item["description"].replace("${amount}", str(amount)).replace("${suggested_amount}", str(suggested_amount))
            suggestions.append(sugg_item)
        if income < 4000:
            suggestions.append(suggs_list["income"])
        if co_income == 0:
            suggestions.append(suggs_list["co_income"])
        if term > 360:
            suggestions.append(suggs_list["term"])
        
        if len(suggestions) < 2:
            suggestions.append(suggs_list["transactions"])
            suggestions.append(suggs_list["profile"])
            
        return suggestions

    def generate_report(self, prediction, data, language="English"):
        lang = language if language in self.translations else "English"
        t = self.translations[lang]

        if not prediction or not data:
            return None
        
        status = prediction.get('prediction', 'Unknown')
        risk = prediction.get('risk_level', 'High')
        confidence = prediction.get('confidence', 0.0)

        credit_history = float(data.get('Credit History', 1.0))
        income = float(data.get('Applicant Income', 0.0))
        co_income = float(data.get('Coapplicant Income', 0.0))
        amount = float(data.get('Loan Amount', 0.0))
        term = float(data.get('Loan Amount Term', 360.0))

        # Compile localized reasons
        reasons = []
        reasons_t = t["report_reasons"]
        if credit_history == 0.0:
            reasons.append(reasons_t["credit"])
        if income < 3500:
            reasons.append(reasons_t["income"].format(income=income))
        if amount > (income + co_income) * 3:
            reasons.append(reasons_t["amount"].format(amount=amount))
        if term > 360:
            reasons.append(reasons_t["term"].format(term=term))
            
        if not reasons:
            reasons.append(reasons_t["general"])

        # Translate status and eligibility projection
        current_status = t["report_status"].get(status, status)
        estimated_eligibility = t["report_eligibility_status"].get(status, "85%")

        # Localized checklist
        checklist_items = t["report_checklist"]
        checklist = [
            {"item": checklist_items[0], "checked": credit_history == 1.0},
            {"item": checklist_items[1], "checked": amount < (income + co_income) * 2},
            {"item": checklist_items[2], "checked": True},
            {"item": checklist_items[3], "checked": co_income > 0},
            {"item": checklist_items[4], "checked": True}
        ]

        return {
            "current_status": current_status,
            "major_reasons": reasons,
            "risk_level": risk,
            "suggestions": [s['description'] for s in self.generate_suggestions(prediction, data, language)],
            "estimated_eligibility": estimated_eligibility,
            "checklist": checklist
        }

    def process_query(self, query, prediction, data, history=None, language="English"):
        lang = language if language in self.translations else "English"
        t = self.translations[lang]
        query_lower = query.lower()

        # Handle predictions check
        has_prediction = prediction is not None and 'prediction' in prediction
        status = prediction.get('prediction', 'Rejected') if has_prediction else None

        # Check greetings
        greetings = {
            "English": ["hello", "hi", "hey", "greetings"],
            "Telugu": ["నమస్కారం", "హలో", "నమస్తే"],
            "Hindi": ["नमस्ते", "हेलो", "प्रणाम", "नमस्कार"],
            "Tamil": ["வணக்கம்", "ஹலோ"],
            "Kannada": ["ನಮಸ್ಕಾರ", "ಹಲೋ", "ನಮಸ್ತೆ"]
        }
        
        # Check if greeting belongs to any language
        user_greet = any(g in query_lower for list_g in greetings.values() for g in list_g)
        if user_greet:
            return t["welcome"]
            
        # Check for dynamic prediction explanations (why approved/rejected)
        is_why = any(w in query_lower for w in ["why", "ఎందుకు", "क्यों", "ஏன்", "ಏಕೆ"])
        is_reject = any(r in query_lower for r in ["reject", "denied", "fail", "తిరస్కరించబడింది", "అస్వీకారం", "अस्वीकृत", "खारिज", "நிராகரிக்கப்பட்டது", "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ"])
        is_approve = any(a in query_lower for a in ["approve", "pass", "success", "ఆమోదించబడింది", "ఆమోదం", "स्वीकृत", "पास", "ஒப்புதல்", "அங்கீகரிக்கப்பட்டது", "ಅನುಮೋದಿಸಲಾಗಿದೆ"])

        if is_why and is_reject:
            if has_prediction and status == 'Rejected':
                return self.explain_prediction(prediction, data, language)
            elif has_prediction and status == 'Approved':
                return "Your loan assessment was actually approved!" if lang == "English" else "మీ లోన్ ఆమోదించబడింది! దాని వివరాలు చదవండి."
            else:
                return t["explain_prompt_needed"]

        if is_why and is_approve:
            if has_prediction and status == 'Approved':
                return self.explain_prediction(prediction, data, language)
            elif has_prediction and status == 'Rejected':
                return "Your latest loan assessment was rejected." if lang == "English" else "మీ దరఖాస్తు తిరస్కరించబడింది. వివరాలు చూడండి."
            else:
                return t["explain_prompt_needed"]

        # Explain general query
        if "explain" in query_lower or "వివరించు" in query_lower or "समझाएं" in query_lower or "விளக்கு" in query_lower or "ವಿವರಿಸಿ" in query_lower:
            if has_prediction:
                return self.explain_prediction(prediction, data, language)
            else:
                return t["explain_prompt_needed"]

        # Suggestions
        is_sugg = any(s in query_lower for s in ["improve", "how can i", "reapply", "మెరుగు", "ఎలా", "सुधार", "कैसे", "மேம்படுத்த", "எப்படி", "ಸುಧಾರಿಸು", "ಹೇಗೆ"])
        if is_sugg:
            if has_prediction and status == 'Rejected':
                suggs = self.generate_suggestions(prediction, data, language)
                sugg_text = "\n".join([f"**{s['title']}**: {s['description']}" for s in suggs])
                return f"{t['suggestions_header']}\n\n{sugg_text}\n\n{t['suggestions_info']}"
            elif has_prediction and status == 'Approved':
                return t["suggestions_not_needed"]
            else:
                return t["suggestions_general_fallback"]

        # Check FAQs
        faqs = self.get_faqs(language)
        for faq in faqs:
            # Check matching words
            faq_q = faq['question'].lower()
            if faq_q in query_lower or any(word in query_lower for word in faq_q.split() if len(word) > 4):
                return faq['answer']

        # Extra keyword matching for EMIs / Term / Credit History
        if "emi" in query_lower or "monthly installment" in query_lower:
            return faqs[7]['answer'] if len(faqs) > 7 else t["fallback"]
        if "tenure" in query_lower or "term" in query_lower or "ગడువు" in query_lower or "अवधि" in query_lower or "காலம்" in query_lower or "ಅವಧಿ" in query_lower:
            return faqs[8]['answer'] if len(faqs) > 8 else t["fallback"]
        if "credit" in query_lower or "history" in query_lower or "క్రెడిట్" in query_lower or "क्रेडिट" in query_lower or "கடன் வரலாறு" in query_lower:
            return faqs[4]['answer'] if len(faqs) > 4 else t["fallback"]

        return t["fallback"]
