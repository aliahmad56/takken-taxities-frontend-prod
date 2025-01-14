import React, { createContext, useState } from "react";
import i18n from "../i18n";

// Create the context
export const LanguageSelectorContext = createContext();

// Create the context provider
export const LanguageSelectorProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const chooseLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <LanguageSelectorContext.Provider
      value={{ selectedLanguage, chooseLanguage }}
    >
      {children}
    </LanguageSelectorContext.Provider>
  );
};
