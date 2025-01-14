import React from "react";
import { useTranslation } from "react-i18next";

function LoginFooter() {
  const { t } = useTranslation();
  return (
    <p
      className="text-center font-semibold text-gray-500 font-open-sans lg:text-sm md:text-lg 2xl:text-lg font-400 2xl:mt-8 md:mt-4 mt-8  "
      style={{
        color: "#202020",
      }}
    >
      {t("authPage.footer")}
    </p>
  );
}

export default LoginFooter;
