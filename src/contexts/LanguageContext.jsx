import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navbar
    home: 'Home',
    aboutUs: 'About Us',
    athletes: 'Athletes',
    sports: 'Sports',
    events: 'Events',
    news: 'News',
    gallery: 'Gallery',
    contactUs: 'Contact Us',
    registerPlayer: 'Player Registration',
    donate: 'Donate',
    donateNow: 'Donate Now',
    
    // Registration form
    playerRegistration: 'Player Registration',
    joinCommunity: 'Join Gujarat\'s Para Sports Community',
    mandatoryIdVerification: 'Mandatory: Para Athlete ID Verification',
    idType: 'ID Type *',
    uniqueIdNumber: 'Unique ID Number *',
    firstName: 'First Name *',
    lastName: 'Last Name *'
  },
  
  gu: {
    // Navbar
    home: 'મુખ્ય',
    aboutUs: 'અમારા વિશે',
    athletes: 'રમતવીરો',
    sports: 'રમતો',
    events: 'કાર્યક્રમો',
    news: 'સમાચાર',
    gallery: 'ગેલેરી',
    contactUs: 'સંપર્ક કરો',
    registerPlayer: 'ખેલાડી નોંધણી',
    donate: 'દાન',
    donateNow: 'હવે દાન કરો',
    
    // Registration form
    playerRegistration: 'ખેલાડી નોંધણી',
    joinCommunity: 'ગુજરાતના પેરા સ્પોર્ટ્સ સમુદાયમાં જોડાઓ',
    mandatoryIdVerification: 'ફરજિયાત: પેરા એથ્લેટ ID ચકાસણી',
    idType: 'ID પ્રકાર *',
    uniqueIdNumber: 'અનન્ય ID નંબર *',
    firstName: 'પ્રથમ નામ *',
    lastName: 'અંતિમ નામ *'
  },
  
  hi: {
    // Navbar
    home: 'होम',
    aboutUs: 'हमारे बारे में',
    athletes: 'खिलाड़ी',
    sports: 'खेल',
    events: 'कार्यक्रम',
    news: 'समाचार',
    gallery: 'गैलरी',
    contactUs: 'संपर्क करें',
    registerPlayer: 'खिलाड़ी पंजीकरण',
    donate: 'दान',
    donateNow: 'अभी दान करें',
    
    // Registration form
    playerRegistration: 'खिलाड़ी पंजीकरण',
    joinCommunity: 'गुजरात के पैरा स्पोर्ट्स समुदाय में शामिल हों',
    mandatoryIdVerification: 'अनिवार्य: पैरा एथलीट ID सत्यापन',
    idType: 'ID प्रकार *',
    uniqueIdNumber: 'अद्वितीय ID संख्या *',
    firstName: 'पहला नाम *',
    lastName: 'अंतिम नाम *'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};