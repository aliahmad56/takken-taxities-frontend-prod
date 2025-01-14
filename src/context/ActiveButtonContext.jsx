import React, {createContext, useState} from "react";

// Create the context
export const ActiveButtonContext = createContext();

// Create the context provider

export const ActiveButtonProvider = ({children}) => {
  const [activeButton, setActiveButton] = useState();

  return (
    <ActiveButtonContext.Provider value={{activeButton, setActiveButton}}>
      {children}
    </ActiveButtonContext.Provider>
  );
};
