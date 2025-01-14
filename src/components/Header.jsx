import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 shadow-md px-4 lg:px-6 py-2.5">
        <div className="flex  justify-between max-w-screen-3xl  md:mx-4 mx-0">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="w-[100px] h-auto" />
            </a>
          </div>
          <div className="flex items-center lg:order-3">
            <div className="mr-10">
              <LanguageSelector />
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-logout-red-hover focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              style={{ backgroundColor: "#FF3131" }}
            >
              {t("button.logout")}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
