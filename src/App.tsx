import { useState, useMemo, useEffect } from 'react';
import { Search, Shield, ArrowRight, X, Bookmark, Globe, Trophy, AlertCircle, Mic, MicOff, MessageSquare, Home, Building2, Phone, Mail } from 'lucide-react';
import { constitutionData } from './data/constitutionData';
import { constitutionQuiz } from './data/quizData';
import type { ConstitutionArticle } from './data/constitutionData';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [showMap, setShowMap] = useState<string | null>(null);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ConstitutionArticle | null>(null);
  
  const [language, setLanguage] = useState<'EN' | 'HI' | 'TE' | 'KN' | 'MR' | 'BN' | 'TA' | 'GU' | 'ML' | 'OR' | 'PA'>('EN');
  
  const stateToLanguage: { [key: string]: typeof language } = {
    "Delhi": 'HI', "Maharashtra": 'MR', "Karnataka": 'KN', "Telangana": 'TE', "Andhra Pradesh": 'TE',
    "Uttar Pradesh": 'HI', "West Bengal": 'BN', "Tamil Nadu": 'TA', "Gujarat": 'GU',
    "Kerala": 'ML', "Odisha": 'OR', "Punjab": 'PA', "Bihar": 'HI', "All": 'EN'
  };

  const translations = {
    EN: { title: "Know Your Rights", subtitle: "Understand the law in simple terms.", searchPlaceholder: "Describe what happened...", searchByIssue: "Search by Issue: ", all: "All", commonSituations: "Common Situations", legalAI: "Legal AI", quizMode: "Quiz Mode", home: "Home", documents: "Documents", contact: "Contact", readExplanation: "Read Explanation", noResults: "No results found.", suggestion: "Try simpler words.", showAll: "Show all laws", recommended: "Recommended Articles", selectState: "Select State", selectLanguage: "Language", aadharDoc: "Aadhar Card", panDoc: "PAN Card", birthDoc: "Birth Certificate", passportDoc: "Passport", aadharDesc: "Your unique identification document.", panDesc: "Required for financial transactions.", birthDesc: "Proof of birth and identity.", passportDesc: "Essential for international travel.", simpleMeaning: "Simple Meaning", teacherExplain: "Teacher Analogy", originalText: "Legal Text" },
    HI: { title: "अपने अधिकारों को जानें", subtitle: "कानून को सरल शब्दों में समझें।", searchPlaceholder: "बताएं कि क्या हुआ...", searchByIssue: "समस्या के आधार पर: ", all: "सभी", commonSituations: "सामान्य स्थितियां", legalAI: "कानूनी AI", quizMode: "क्विज मोड", home: "होम", documents: "दस्तावेज़", contact: "संपर्क", readExplanation: "व्याख्या पढ़ें", noResults: "कोई परिणाम नहीं मिला।", suggestion: "सरल शब्दों का प्रयास करें।", showAll: "सभी कानून दिखाएं", recommended: "अनुशंसित लेख", selectState: "राज्य चुनें", selectLanguage: "भाषा", aadharDoc: "आधार कार्ड", panDoc: "पैन कार्ड", birthDoc: "जन्म प्रमाण पत्र", passportDoc: "पासपोर्ट", aadharDesc: "आपका विशिष्ट पहचान दस्तावेज़।", panDesc: "वित्तीय लेनदेन के लिए आवश्यक।", birthDesc: "जन्म और पहचान का प्रमाण।", passportDesc: "अंतरराष्ट्रीय यात्रा के लिए आवश्यक।", simpleMeaning: "सरल अर्थ", teacherExplain: "शिक्षक की तरह", originalText: "मूल पाठ" },
    KN: { title: "ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ", subtitle: "ಕಾನೂನನ್ನು ಸರಳ ಪದಗಳಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.", searchPlaceholder: "ಏನಾಯಿತು ಎಂದು ವಿವರಿಸಿ...", searchByIssue: "ಸಮಸ್ಯೆಯ ಮೂಲಕ ಹುಡುಕಿ: ", all: "ಎಲ್ಲಾ", commonSituations: "ಸಾಮಾನ್ಯ ಸಂದರ್ಭಗಳು", legalAI: "ಕಾನೂನು AI", quizMode: "ಕ್ವಿಜ್ ಮೋಡ್", home: "ಹೋಮ್", documents: "ದಾಖಲೆಗಳು", contact: "ಸಂಪರ್ಕ", readExplanation: "ವಿವರಣೆ ಓದಿ", noResults: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.", suggestion: "ಸರಳ ಪದಗಳನ್ನು ಬಳಸಿ ನೋಡಿ.", showAll: "ಎಲ್ಲಾ ಕಾನೂನುಗಳನ್ನು ತೋರಿಸಿ", recommended: "ಶಿಫಾರಸು ಮಾಡಿದ ಲೇಖನಗಳು", selectState: "ರಾಜ್ಯವನ್ನು ಆರಿಸಿ", selectLanguage: "ಭಾಷೆ", aadharDoc: "ಆಧಾರ್ ಕಾರ್ಡ್", panDoc: "ಪ್ಯಾನ್ ಕಾರ್ಡ್", birthDoc: "ಜನನ ಪ್ರಮಾಣಪತ್ರ", passportDoc: "ಪಾಸ್‌ಪೋರ್ಟ್", aadharDesc: "ನಿಮ್ಮ ಅನನ್ಯ ಗುರುತಿನ ದಾಖಲೆ.", panDesc: "ಹಣಕಾಸಿನ ವ್ಯವಹಾರಗಳಿಗೆ ಅಗತ್ಯವಿದೆ.", birthDesc: "ಜನನ ಮತ್ತು ಗುರುತಿನ ಪುರಾವೆ.", passportDesc: "ಅಂತರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣಕ್ಕೆ ಅಗತ್ಯ.", simpleMeaning: "ಸರಳ ಅರ್ಥ", teacherExplain: "ಶಿಕ್ಷಕರ ಉದಾಹರಣೆ", originalText: "ಮೂಲ ಪಠ್ಯ" },
    MR: { title: "आपले हक्क जाणून घ्या", subtitle: "कायदा सोप्या भाषेत समजून घ्या.", searchPlaceholder: "काय झाले ते सांगा...", searchByIssue: "समस्येनुसार शोधा: ", all: "सर्व", commonSituations: "सामान्य परिस्थिती", legalAI: "लीगल AI", quizMode: "क्विझ मोड", home: "होम", documents: "दस्तऐवज", contact: "संपर्क", readExplanation: "स्पष्टीकरण वाचा", noResults: "निकाल सापडला नाही.", suggestion: "सोपे शब्द वापरून पहा.", showAll: "सर्व कायदे दाखवा", recommended: "शिफारस केलेले लेख", selectState: "राज्य निवडा", selectLanguage: "भाषा", aadharDoc: "आधार कार्ड", panDoc: "पॅन कार्ड", birthDoc: "जन्म दाखला", passportDoc: "पासपोर्ट", aadharDesc: "तुमचा अद्वितीय ओळख दस्तऐवज.", panDesc: "आर्थिक व्यवहारांसाठी आवश्यक.", birthDesc: "जन्म आणि ओळखीचा पुरावा.", passportDesc: "आंतरराष्ट्रीय प्रवासासाठी आवश्यक.", simpleMeaning: "सोपा अर्थ", teacherExplain: "शिक्षकाचे उदाहरण", originalText: "मूळ मजकूर" },
    TA: { title: "உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்", subtitle: "சரியான முறையில் சட்டத்தைப் புரிந்து கொள்ளுங்கள்.", searchPlaceholder: "என்ன நடந்தது என்று விவரிக்கவும்...", searchByIssue: "பிரச்சனை மூலம் தேடுங்கள்: ", all: "அனைத்தும்", commonSituations: "பொதுவான சூழ்நிலைகள்", legalAI: "சட்ட AI", quizMode: "வினாடி வினா முறை", home: "முகப்பு", documents: "ஆவணங்கள்", contact: "தொடர்பு", readExplanation: "விளக்கத்தைப் படியுங்கள்", noResults: "முடிவுகள் எதுவும் கிடைக்கவில்லை.", suggestion: "எளிமையான சொற்களை முயற்சிக்கவும்.", showAll: "அனைத்து சட்டங்களையும் காட்டு", recommended: "பரிந்துரைக்கப்பட்ட கட்டுரைகள்", selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்", selectLanguage: "மொழி", aadharDoc: "ஆதார் அட்டை", panDoc: "பான் அட்டை", birthDoc: "பிறப்புச் சான்றிதழ்", passportDoc: "கடவுச்சீட்டு", aadharDesc: "உங்கள் தனித்துவமான அடையாள ஆவணம்.", panDesc: "நிதி பரிவர்த்தனைகளுக்கு தேவை.", birthDesc: "பிறப்பு மற்றும் அடையாள சான்று.", passportDesc: "சர்வதேச பயணத்திற்கு அவசியமானது.", simpleMeaning: "எளிய பொருள்", teacherExplain: "ஆசிரியர் உதாரணம்", originalText: "அசல் உரை" },
    BN: { title: "আপনার অধিকার জানুন", subtitle: "সরল ভাষায় আইন বুঝুন।", searchPlaceholder: "কি হয়েছে বর্ণনা করুন...", searchByIssue: "সমস্যার মাধ্যমে খুঁজুন: ", all: "সব", commonSituations: "সাধারণ পরিস্থিতি", legalAI: "আইনি AI", quizMode: "কوییজ মোড", home: "হোম", documents: "নথিপত্র", contact: "যোগাযোগ", readExplanation: "ব্যাখ্যা পড়ুন", noResults: "কোন ফলাফল পাওয়া যায়নি।", suggestion: "সহজ শব্দ চেষ্টা করুন।", showAll: "সব আইন দেখান", recommended: "প্রস্তাবিত নিবন্ধ", selectState: "রাজ্য নির্বাচন করুন", selectLanguage: "ভাষা", aadharDoc: "আধার কার্ড", panDoc: "প্যান কার্ড", birthDoc: "জন্ম শংসাবত্র", passportDoc: "পাসপোর্ট", aadharDesc: "আপনার অনন্য পরিচয় নথি।", panDesc: "আর্থিক লেনদেনের জন্য প্রয়োজনীয়।", birthDesc: "জন্ম ও পরিচয়ের প্রমাণ।", passportDesc: "আন্তর্জাতিক ভ্রমণের জন্য অপরিহার্য।", simpleMeaning: "সরল অর্থ", teacherExplain: "শিক্ষকের উদাহরণ", originalText: "মূল পাঠ" },
    TE: { title: "మీ హక్కులను తెలుసుకోండి", subtitle: "చట్టాన్ని సరళంగా అర్థం చేసుకోండి.", searchPlaceholder: "ఏం జరిగిందో వివరించండి...", searchByIssue: "సమస్య ద్వారా: ", all: "అన్నీ", commonSituations: "సాధారణ పరిస్థితులు", legalAI: "లీగల్ AI", quizMode: "క్విజ్ మోడ్", home: "హోమ్", documents: "పత్రాలు", contact: "సంప్రదించండి", readExplanation: "వివరణ చదవండి", noResults: "ఫలితాలు లేవు.", suggestion: "సరళమైన పదాలను వాడండి.", showAll: "అన్ని చట్టాలు", recommended: "సిఫార్సు చేయబడినవి", selectState: "రాష్ట్రం", selectLanguage: "భాష", aadharDoc: "आधार కార్డ్", panDoc: "పాన్ కార్డ్", birthDoc: "పుట్టిన ధృవీకరణ పత్రం", passportDoc: "పాస్‌పోర్ట్", aadharDesc: "మీ ప్రత్యేక గుర్తింపు పత్రం.", panDesc: "ఆర్థిక లావాదేవీలకు అవసరం.", birthDesc: "జననం మరియు గుర్తింపు ఆధారం.", passportDesc: "అంతర్జాతీయ ప్రయాణానికి అవసరం.", simpleMeaning: "సరళమైన అర్థం", teacherExplain: "టీచర్ లాగా", originalText: "అసలు వచనం" },
    GU: { title: "તમારા અધિકારો જાણો", subtitle: "કાયદાને સરળ શબ્દોમાં સમજો.", searchPlaceholder: "શું થયું તે વર્ણવો...", searchByIssue: "સમસ્યા દ્વારા શોધો: ", all: "બધા", commonSituations: "સામાન્ય પરિસ્થિતિઓ", legalAI: "કાનૂની AI", quizMode: "ક્વિઝ મોડ", home: "હોಮ್", documents: "દસ્તાવેજો", contact: "સંપર્ક", readExplanation: "સ્પષ્ટતા વાંચો", noResults: "કોઈ પરિણામ મળ્યું નથી.", suggestion: "સરળ શબ્દોનો પ્રયાસ કરો.", showAll: "બધા કાયદા બતાવો", recommended: "ભલામણ કરેል લેખો", selectState: "રાજ્ય પસંદ કરો", selectLanguage: "ભાષા", aadharDoc: "આધાર કાર્ડ", panDoc: "પાન કાર્ડ", birthDoc: "જન્મ પ્રમાણપત્ર", passportDoc: "પાસપોર્ટ", aadharDesc: "તમારો અનન્ય ઓળખ દસ્તાવેજ.", panDesc: "નાણાકીય વ્યવહારો માટે જરૂરી.", birthDesc: "જન્મ અને ઓળખનો પુરોવો.", passportDesc: "આંતરરાષ્ટ્રીય પ્રવાસ માટે આવશ્યક.", simpleMeaning: "સરળ અર્થ", teacherExplain: "શિક્ષકનું ઉદાહરણ", originalText: "મૂળ લખાણ" },
    ML: { title: "നിങ്ങളുടെ അവകാശങ്ങൾ അറിയുക", subtitle: "നിയമത്തെ ലളിതമായ വാക്കുകളിൽ മനസ്സിലാക്കുക.", searchPlaceholder: "എന്താണ് സംഭവിച്ചതെന്ന് വിവരിക്കുക...", searchByIssue: "പ്രശ്നത്തിലൂടെ തിരയുക: ", all: "എല്ലാം", commonSituations: "സാധാരണ സാഹചര്യങ്ങൾ", legalAI: "ലീഗൽ AI", quizMode: "ക്വിസ് മോഡ്", home: "ഹോം", documents: "രേഖകൾ", contact: "ബന്ധപ്പെടുക", readExplanation: "വിശദീകരണം വായിക്കുക", noResults: "ഫലങ്ങളൊന്നും ലഭ്യമല്ല.", suggestion: "ലളിതമായ വാക്കുകൾ പരീക്ഷിക്കുക.", showAll: "എല്ലാ നിയമങ്ങളും കാണിക്കുക", recommended: "ശുപാർശ ചെയ്യുന്ന ലേഖനങ്ങൾ", selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", selectLanguage: "ഭാഷ", aadharDoc: "ആധാർ കാർഡ്", panDoc: "പാൻ കാർഡ്", birthDoc: "ജനന സർട്ടിഫിക്കറ്റ്", passportDoc: "പാസ്പോർട്ട്", aadharDesc: "നിങ്ങളുടെ അദ്വിതീയ തിരിച്ചറിയൽ രേഖ.", panDesc: "സാമ്പത്തിക ഇടപാടുകൾക്ക് ആവശ്യമാണ്.", birthDesc: "ജനനത്തിന്റെയും തിരിച്ചറിയലിന്റെയും തെളിവ്.", passportDesc: "അന്താരാഷ്ട്ര യാത്രകൾക്ക് അത്യാവശ്യമാണ്.", simpleMeaning: "ലളിതമായ അർത്ഥം", teacherExplain: "അധ്യാപകന്റെ ഉദാഹരണം", originalText: "യഥാർത്ഥ പാഠം" }
  };

  const t = translations[language as keyof typeof translations] || translations.EN;

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (stateToLanguage[state]) setLanguage(stateToLanguage[state]);
    setSelectedDistrict('All');
  };

  const getArticleContent = (article: ConstitutionArticle) => {
    const trans = article.translations ? (article.translations as any)[language] : null;
    return {
      title: trans?.title || article.title,
      simplified: trans?.simplified || article.simplified,
      content: trans?.content || article.content,
      teacher_analogy: trans?.teacher_analogy || article.teacher_analogy
    };
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    const langMap: any = { 'EN': 'en-IN', 'HI': 'hi-IN', 'TE': 'te-IN', 'KN': 'kn-IN', 'MR': 'mr-IN', 'BN': 'bn-IN', 'TA': 'ta-IN', 'GU': 'gu-IN' };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => setSearchTerm(event.results[0][0].transcript);
    recognition.start();
  };

  const askAssistant = () => {
    if (!assistantQuery) return;
    const query = assistantQuery.toLowerCase();
    const related = constitutionData.find(a => a.keywords.some(k => query.includes(k.toLowerCase())));
    setAssistantResponse(related ? `Article ${related.number}: ${related.title}. ${related.simplified}` : "Ask about 'theft', 'rights', or 'police'.");
  };

  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem('constitution_bookmarks') || '[]'));
  useEffect(() => localStorage.setItem('constitution_bookmarks', JSON.stringify(bookmarks)), [bookmarks]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const correct = index === constitutionQuiz[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < constitutionQuiz.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else setQuizFinished(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0); setScore(0); setQuizFinished(false);
    setSelectedAnswer(null); setIsCorrect(null);
  };

  const filteredArticles = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return constitutionData.filter(a => 
      (a.number.toLowerCase().includes(s) || a.title.toLowerCase().includes(s) || a.keywords.some(k => k.toLowerCase().includes(s))) &&
      (!selectedCategory || a.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  const categories = Array.from(new Set(constitutionData.map(a => a.category)));

  const documentData = useMemo(() => [
    { id: 'aadhar', title: t.aadharDoc, icon: <Shield size={32} />, description: t.aadharDesc, link: 'https://uidai.gov.in/', laws: [{ title: 'Right to Privacy', section: 'Art 21', info: 'Aadhar data is protected under privacy laws.' }, { title: 'Voluntary Nature', section: 'SC Ruling', info: 'Cannot be mandatory for all services.' }] },
    { id: 'pan', title: t.panDoc, icon: <Globe size={32} />, description: t.panDesc, link: 'https://www.incometax.gov.in/', laws: [{ title: 'Financial Identity', section: 'Income Tax Act', info: 'Mandatory for transactions above ₹50,000.' }] },
    { id: 'birth', title: t.birthDoc, icon: <Building2 size={32} />, description: t.birthDesc, link: 'https://crsorgi.gov.in/', laws: [{ title: 'Right to Identity', section: 'RBD Act 1969', info: 'Every birth must be registered within 21 days.' }] },
    { id: 'passport', title: t.passportDoc, icon: <AlertCircle size={32} />, description: t.passportDesc, link: 'https://www.passportindia.gov.in/', laws: [{ title: 'Right to Travel', section: 'Art 21', info: 'Right to go abroad is part of personal liberty.' }] }
  ], [t]);

  const indianStates = ["All", "Delhi", "Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Tamil Nadu", "Punjab", "Gujarat", "Kerala"];

  const lawyersData = [
    { name: "Adv. Rajesh Kumar", specialty: "Criminal & Civil Law", phone: "+91 98765 43210", email: "rajesh@legal.in", location: "District Court", state: "Delhi", district: "New Delhi", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b34766085%3A0x761f69771428561c!2sDelhi+High+Court!5e0!3m2!1sen!2sin!4v1" },
    { name: "Adv. Priya Sharma", specialty: "Family & Women Rights", phone: "+91 87654 32109", email: "priya@law.in", location: "High Court", state: "Maharashtra", district: "Mumbai City", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.8!2d72.8!3d18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c234b!2sBombay+High+Court!5e0!3m2!1sen!2sin!4v1" },
    { name: "Adv. Nitin Deshmukh", specialty: "Criminal Defense", phone: "+91 98220 11223", email: "nitin@pune.in", location: "Shivajinagar", state: "Maharashtra", district: "Pune", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1!2d73.8!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0!2sPune+District+Court!5e0!3m2!1sen!2sin!4v1" }
  ];

  const districts = useMemo(() => {
    if (selectedState === 'All') return ["All"];
    const filtered = lawyersData.filter(l => l.state === selectedState);
    return ["All", ...Array.from(new Set(filtered.map(l => l.district)))];
  }, [selectedState]);

  const filteredLawyers = useMemo(() => lawyersData.filter(l => 
    (selectedState === 'All' || l.state === selectedState) && (selectedDistrict === 'All' || l.district === selectedDistrict)
  ), [selectedState, selectedDistrict]);

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-logo" onClick={() => window.location.reload()} style={{cursor:'pointer'}}><Globe className="chakra-icon" size={28} /><span>Law</span></div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => window.scrollTo(0, 0)}><Home size={18} /><span>{t.home}</span></button>
          <button className="nav-btn" onClick={() => setShowDocuments(true)}><Building2 size={18} /><span>{t.documents}</span></button>
          <button className="nav-btn" onClick={() => setShowContact(true)}><Phone size={18} /><span>{t.contact}</span></button>
          <button className="nav-btn assistant-btn" onClick={() => setShowAssistant(true)}><MessageSquare size={18} /><span>{t.legalAI}</span></button>
          <button className="nav-btn" onClick={() => { setShowQuiz(true); resetQuiz(); }}><Trophy size={18} /><span>{t.quizMode}</span></button>
          <div className="lang-selector">
            <Globe size={18} /><select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
              <option value="EN">English</option>
              <option value="HI">हिंदी</option>
              <option value="TE">తెలుగు</option>
              <option value="KN">ಕನ್ನಡ</option>
              <option value="MR">मराठी</option>
              <option value="TA">தமிழ்</option>
              <option value="BN">বাংলা</option>
              <option value="GU">ગુજરાતી</option>
              <option value="ML">മലയാളം</option>
            </select>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>{t.title}</h1><p>{t.subtitle}</p>
          <div className="search-container">
            <Search className="search-icon" size={24} />
            <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button className={`voice-btn ${isListening ? 'listening' : ''}`} onClick={handleVoiceSearch} title="Voice Search">{isListening ? <MicOff size={20} /> : <Mic size={20} />}</button>
          </div>
          <div className="category-tags">
            <button className={!selectedCategory ? 'active' : ''} onClick={() => setSelectedCategory(null)}>{t.all}</button>
            {categories.map(c => <button key={c} className={selectedCategory === c ? 'active' : ''} onClick={() => setSelectedCategory(c)}>{c}</button>)}
          </div>
        </div>
      </header>

      <main className="content">
        <section className="quick-nav-section">
          <div className="quick-nav-cards">
            <button className="quick-nav-card" onClick={() => window.scrollTo(0, 0)}><div className="icon-wrapper"><Home size={32} /></div><div className="card-text"><h3>{t.home}</h3><p>Main Page</p></div></button>
            <button className="quick-nav-card" onClick={() => setShowDocuments(true)}><div className="icon-wrapper"><Building2 size={32} /></div><div className="card-text"><h3>{t.documents}</h3><p>Law Sections</p></div></button>
            <button className="quick-nav-card" onClick={() => setShowContact(true)}><div className="icon-wrapper"><Phone size={32} /></div><div className="card-text"><h3>{t.contact}</h3><p>Find Lawyers</p></div></button>
          </div>
        </section>

        <section className="article-grid">
          {filteredArticles.length > 0 ? filteredArticles.map(article => {
            const c = getArticleContent(article);
            return (
              <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
                <div className="article-header"><span className="article-number">Article {article.number}</span><button className={`bookmark-btn ${bookmarks.includes(article.id) ? 'active' : ''}`} onClick={(e) => toggleBookmark(article.id, e)}><Bookmark size={18} fill={bookmarks.includes(article.id) ? "currentColor" : "none"} /></button></div>
                <h3>{c.title}</h3><p className="preview">{c.simplified.substring(0, 80)}...</p>
                <div className="card-footer"><span>{t.readExplanation}</span><ArrowRight size={16} /></div>
              </div>
            );
          }) : (
            <div className="no-results-container">
              <div className="no-results"><AlertCircle size={48} /><p>{t.noResults}</p><button className="reset-search" onClick={() => setSearchTerm('')}>{t.showAll}</button></div>
              <div className="featured-articles-section"><h3>{t.recommended}</h3>
                <div className="article-grid">{constitutionData.slice(0, 3).map(a => { const c = getArticleContent(a); return <div key={a.id} className="article-card" onClick={() => setSelectedArticle(a)}><div className="article-header"><span>Art {a.number}</span></div><h3>{c.title}</h3><div className="card-footer"><span>{t.readExplanation}</span><ArrowRight size={16} /></div></div>; })}</div>
              </div>
            </div>
          )}
        </section>
      </main>

      {showDocuments && (
        <div className="modal-overlay" onClick={() => setShowDocuments(false)}>
          <div className="modal-content department-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowDocuments(false)}><X size={24} /></button>
            <div className="modal-header"><h1>{t.documents}</h1></div>
            <div className="departments-container">{documentData.map(doc => (
              <div key={doc.id} className="dept-section"><div className="dept-title-box">{doc.icon}<div><h2>{doc.title}</h2><p>{doc.description}</p></div></div>
                <div className="dept-laws-grid">{doc.laws.map((law, i) => <div key={i} className="law-info-card"><h4>{law.title}</h4><span>{law.section}</span><p>{law.info}</p></div>)}</div>
              </div>
            ))}</div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowContact(false)}><X size={24} /></button>
            <div className="modal-header"><h1>{t.contact}</h1></div>
            <div className="location-filters">
              <div className="filter-group"><label>{t.selectState}:</label><select value={selectedState} onChange={(e) => handleStateChange(e.target.value)}>{indianStates.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              {selectedState !== 'All' && <div className="filter-group"><label>District:</label><select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>{districts.map(d => <option key={d} value={d}>{d}</option>)}</select></div>}
            </div>
            {selectedState !== 'All' && <div className="area-overview-map"><iframe src={`https://maps.google.com/maps?q=${selectedDistrict !== 'All' ? selectedDistrict + ',' : ''}${selectedState}&t=&z=13&ie=UTF8&iwloc=&output=embed`} width="100%" height="250" style={{ border: 0, borderRadius: '1rem' }}></iframe></div>}
            <div className="lawyers-list">{filteredLawyers.map((l, i) => (
              <div key={i} className="lawyer-card-container"><div className="lawyer-card"><div className="lawyer-info"><h3>{l.name}</h3><span>{l.specialty}</span><p>{l.location}, {l.district}, {l.state}</p></div>
                <div className="lawyer-actions"><a href={`tel:${l.phone}`} className="call-btn"><Phone size={18} /></a><a href={`mailto:${l.email}`} className="email-btn"><Mail size={18} /></a><button onClick={() => setShowMap(showMap === l.name ? null : l.name)}><Globe size={18} /></button></div></div>
                {showMap === l.name && <div className="map-container"><iframe src={l.mapUrl} width="100%" height="200" style={{ border: 0 }}></iframe></div>}
              </div>
            ))}</div>
          </div>
        </div>
      )}

      {showAssistant && (
        <div className="modal-overlay" onClick={() => setShowAssistant(false)}>
          <div className="modal-content assistant-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => { setShowAssistant(false); setAssistantResponse(null); setAssistantQuery(''); }}><X size={24} /></button>
            <div className="assistant-header"><h1>{t.legalAI}</h1></div>
            <div className="assistant-body"><div className="assistant-input-group"><input type="text" placeholder="Ask here..." value={assistantQuery} onChange={(e) => setAssistantQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && askAssistant()} /><button onClick={askAssistant}>Ask AI</button></div>
              {assistantResponse && <div className="assistant-result"><p>{assistantResponse}</p></div>}
            </div>
          </div>
        </div>
      )}

      {selectedArticle && (() => {
        const c = getArticleContent(selectedArticle);
        return <div className="modal-overlay" onClick={() => setSelectedArticle(null)}><div className="modal-content" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setSelectedArticle(null)}><X size={24} /></button>
          <div className="modal-header"><h2>Art {selectedArticle.number}</h2><h1>{c.title}</h1></div>
          <div className="explanation-section"><div className="explanation-box simple"><h3>{t.simpleMeaning}</h3><p>{c.simplified}</p></div><div className="explanation-box original"><h3>{t.originalText}</h3><p>{c.content}</p></div></div>
        </div></div>;
      })()}

      {showQuiz && (
        <div className="modal-overlay" onClick={() => setShowQuiz(false)}>
          <div className="modal-content quiz-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowQuiz(false)}><X size={24} /></button>
            {!quizFinished ? (
              <div className="quiz-container">
                <div className="quiz-header"><span>Question {currentQuestion + 1} of {constitutionQuiz.length}</span><span>Score: {score}</span></div>
                <h2 className="quiz-question">{constitutionQuiz[currentQuestion].question}</h2>
                <div className="quiz-options">{constitutionQuiz[currentQuestion].options.map((option, idx) => (
                  <button key={idx} className={`option-btn ${selectedAnswer === idx ? (isCorrect ? 'correct' : 'wrong') : ''} ${selectedAnswer !== null && idx === constitutionQuiz[currentQuestion].correctAnswer ? 'correct' : ''}`} onClick={() => handleAnswer(idx)} disabled={selectedAnswer !== null}>{option}</button>
                ))}</div>
                {selectedAnswer !== null && <div className="quiz-feedback"><p>{constitutionQuiz[currentQuestion].explanation}</p><button className="next-btn" onClick={nextQuestion}>Next</button></div>}
              </div>
            ) : <div className="quiz-result"><Trophy size={64} /><h1>Completed!</h1><p>Score: {score}</p><button className="reset-btn" onClick={resetQuiz}>Try Again</button></div>}
          </div>
        </div>
      )}

      <footer className="footer"><p>&copy; 2026 Law. Patriotic Legal Guide 🇮🇳</p></footer>
    </div>
  );
}

export default App;
