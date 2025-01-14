import React, { useContext, useState } from "react";
import { LanguageSelectorContext } from "../context/langugeSelector";
import GlobeIcon from "../assets/images/globe"; // Update the path

// selected language pass koriasosi context api tn aur haya context api provider LanguageSelectorContext
const LanguageSelector = () => {
  const { selectedLanguage, chooseLanguage } = useContext(
    LanguageSelectorContext
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (e) => {
    e.preventDefault();
    chooseLanguage(e.target.value);
    setIsDropdownOpen(false); // Close the dropdown after selecting a language
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer"
      >
        <GlobeIcon />
        {isDropdownOpen ? (
          <select
            className="w-full border p-1 mt-1"
            defaultValue={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="de">Dutch</option>
            <option value="en">English</option>
            {/* <option value="it">Italian</option> */}
          </select>
        ) : (
          <div className="ml-2">{selectedLanguage}</div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
