import React, { useContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Notificaction from "./components/notication";
import { ActiveButtonProvider } from "./context/ActiveButtonContext";
import { UserInfoProvider } from "./context/UserInfo";
import LanguageSelector from "./components/LanguageSelector";
import AppRoutes from "./routes";
import { LanguageSelectorProvider } from "./context/langugeSelector";
import { TaxProvider } from "./context/taxContext";

function App() {
  return (
    <Router>
      <div>
        <ActiveButtonProvider>
          <LanguageSelectorProvider>
            <UserInfoProvider>
              <TaxProvider>
                <Notificaction />

                <AppRoutes />
              </TaxProvider>
            </UserInfoProvider>
          </LanguageSelectorProvider>
        </ActiveButtonProvider>
      </div>
    </Router>
  );
}

export default App;
