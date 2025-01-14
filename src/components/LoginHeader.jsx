import React from "react";
import logo from "../assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

function LoginHeader() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-end ">
        <LanguageSelector />
      </div>
      <div className="text-center 2xl:mb-5 mb-2 xs:mt-10 md:mt-0">
        <h1 className=" 2xl:text-3xl xl:text-2xl text-2xl font-normal text-gray-800 font-sans 2xl:mb-4 lg:mb-2 mb-4">
          {t("authPage.heading1")} <br /> {t("authPage.heading2")}
        </h1>
        <img
          src={logo}
          alt="Logo"
          className="mx-auto 2xl:w-[200px] w-[140px] h-auto"
        />
      </div>
    </>
  );
}

export default LoginHeader;
