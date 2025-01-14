import React, { createContext, useState } from "react";

// Create the context
export const TaxContext = createContext();

// Create the context provider
export const TaxProvider = ({ children }) => {
  const [taxationValue, setTaxationValue] = useState(0);

  return (
    <TaxContext.Provider value={{ taxationValue, setTaxationValue }}>
      {children}
    </TaxContext.Provider>
  );
};
