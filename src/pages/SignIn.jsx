import React, { useContext, useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import authImage from "../assets/images/authImage.svg";
import LoginHeader from "../components/LoginHeader";
import EyeIcon from "../assets/images/InputUtils/EyeIcon";
import { toast } from "react-toastify";
import LoginFooter from "../components/LoginFooter";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LoginApi } from "../apis/auth/LoginAPI";
import { phoneNumberCode } from "../assets/phoneNumber";
import { useTranslation } from "react-i18next";

function SignIn() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useContext(AuthContext);
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("92");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    phoneNumberPrefix: Yup.string().required("Phone number prefix is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{8,13}$/, t("authPage.error.verifyPhone"))
      .required(t("authPage.error.phone")),
    password: Yup.string().required(t("authPage.error.password")),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumberPrefix: "92",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loginData = {
        phoneNumber: values.phoneNumberPrefix + values.phoneNumber,
        password: values.password,
      };

      try {
        const response = await LoginApi(loginData, t);

        if (response.data && response.data.status === true) {
          // Successful login
          console.log("Login Successful:", response.data.user);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              token: response.data.accessToken,
              userInfo: response.data.user,
            })
          );
          window.location.reload();
          toast.success(t("authPage.signin.success"));
          // Add your logic here for a successful login
        } else {
          console.log("Login Failed:", response.data.message);

          console.error("Login Failed:", response.data.message);
        }
      } catch (error) {
        // Handle errors
        console.log(error.response.data.message);
        // Handle specifically status code 400 errors
        console.error("Bad Request error:", error.response.status);
      }
    },
  });

  // Extract formik methods and values
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <div className="font-[open-sans] text-[#333]">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <div className="max-w-xl w-full p-6 mx-auto lg:mt-2 2xl:mt-4 mt-10">
          <form onSubmit={handleSubmit}>
            <LoginHeader />
            <div className="2xl:mb-4 2xl:mt-4 mb-2 mt-2">
              <h3 className=" 2xl:text-3xl lg:text-2xl md:text-xl  text-center text-gray-800 font-open-sans font-bold leading-14">
                {t("authPage.signin.label")}
              </h3>

              <p
                className="text-center text-gray-500 font-open-sans font-400 mt-auto justify-end"
                style={{
                  color: "#202020",
                  fontSize: "14px",
                  lineHeight: "48px" /* 350% */,
                }}
              >
                {t("authPage.signin.message")}
              </p>
            </div>
            <label className="2xl:text-md text-sm block mb-2 ml-3">
              {t("authPage.signin.phone.label")}
            </label>
            <div className="flex border-b border-gray-300 px-2 rounded-[20px]">
              <label
                htmlFor="phoneNumberPrefix"
                className="flex items-center px-3 text-gray-600"
              >
                <select
                  id="phoneNumberPrefix"
                  name="phoneNumberPrefix"
                  value={values.phoneNumberPrefix}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="outline-none max-w-[60px]"
                >
                  {phoneNumberCode?.map((country) => {
                    const getSpaces = (length) => {
                      switch (length) {
                        case 1:
                          return "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
                        case 2:
                          return "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
                        case 3:
                          return "\u00a0\u00a0\u00a0\u00a0\u00a0";
                        case 4:
                          return "\u00a0\u00a0\u00a0";
                        default:
                          return "\u00a0\u00a0\u00a0\u00a0"; // Default to two spaces
                      }
                    };

                    return (
                      <option
                        key={country.code}
                        value={country.dial_code}
                        className="flex justify-between"
                      >
                        <span>{country.dial_code}</span>
                        <span>{getSpaces(country.dial_code.length)}</span>
                        <span>{country.name}</span>
                      </option>
                    );
                  })}
                </select>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="flex-1 min-w-0 px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder={t("authPage.signin.phone.placeholder")}
              />
            </div>
            {touched.phoneNumberPrefix && errors.phoneNumberPrefix && (
              <div className="text-red-500">{errors.phoneNumberPrefix}</div>
            )}
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="text-red-500">{errors.phoneNumber}</div>
            )}

            <div className="mt-3 relative">
              <label className="2xl:text-md text-sm block mb-3 ml-3">
                {t("authPage.signin.password.label")}
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full text-sm border-b border-gray-300 px-4 py-3 rounded-[20px] outline-none"
                  placeholder={t("authPage.signin.password.placeholder")}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-7 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  <EyeIcon />
                </div>
              </div>
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="md:w-1/4 w-2/4 shadow-xl 2xl:py-2.5 py-2 2xl:px-3 px-2 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                {t("button.signin")}
              </button>
            </div>
            <p
              className="text-center text-gray-500 font-open-sans lg:text-sm md:text-lg 2xl:text-lg font-400 mt-2"
              style={{
                color: "#202020",

                cursor: "pointer",
              }}
            >
              {t("authPage.navigate.signin")}
              <span
                onClick={() => {
                  // Use the navigate function to go to the sign-in page
                  navigate("/signup");
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {" "}
                {t("authPage.signup.label")}
              </span>
            </p>
            <LoginFooter />
          </form>
        </div>

        <div className="hidden md:block max-md:order-1 h-screen min-h-full">
          <img
            src={authImage}
            className="w-full h-full object-cover"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
