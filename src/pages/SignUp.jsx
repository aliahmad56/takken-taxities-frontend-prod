import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import authImage from "../assets/images/authImage.svg";
import LoginHeader from "../components/LoginHeader";
import EyeIcon from "../assets/images/InputUtils/EyeIcon";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginFooter from "../components/LoginFooter";
import { SignUpApi } from "../apis/auth/SignUpAPI";
import { SentOTP } from "../apis/auth/SentOTP";
import { phoneNumberCode } from "../assets/phoneNumber";
import { useTranslation } from "react-i18next";

function SignUp() {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    phoneNumberPrefix: Yup.string().required("Phone number prefix is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{8,13}$/, t("authPage.error.verifyPhone"))
      .required(t("authPage.error.phone")),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phoneNumberPrefix: "92",
      phoneNumber: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      const number = {
        phoneNumber: values.phoneNumberPrefix + values.phoneNumber,
      };

      try {
        const response = await SentOTP(number);

        if (response && response.status === 200) {
          // Successful login

          toast.success(response.data.message);
          navigate("/confirm-otp", {
            state: {
              phoneNumber: values.phoneNumberPrefix + values.phoneNumber,
            },
          });
          // toast.success("Login Successful");
          // Add your logic here for a successful login
        } else {
          toast.error(response.data.message);
          console.error("Login Failed:", response.data);
        }
      } catch (error) {
        // Handle errors
        if (error.response) {
          toast.error("Invalid Number");
        }
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
        <div className="max-w-xl w-full p-6 mx-auto lg:mt-5 mt-10">
          <form onSubmit={handleSubmit}>
            <LoginHeader />
            <div className="mb-4 mt-4">
              <h3 className="  2xl:text-3xl lg:text-2xl  text-2xl  text-center text-gray-800 font-open-sans font-bold leading-14">
                {t("authPage.signup.label")}
              </h3>

              <p
                className="text-center text-gray-500 font-open-sans font-400 mt-auto justify-end"
                style={{
                  color: "#202020",
                  fontSize: "14px",
                  lineHeight: "56px" /* 350% */,
                }}
              >
                {t("authPage.signup.message")}
              </p>
            </div>
            <label className="2xl:text-md text-sm block mb-3 ml-3">
              {t("authPage.signin.phone.label")}
            </label>
            <div className="flex border-b border-gray-300 px-4 rounded-[20px]">
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

            <div className="mt-8 flex justify-center ">
              <button
                type="submit"
                className="md:w-1/4 w-2/4 shadow-xl 2xl:py-2.5 py-2 2xl:px-3 px-2 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                {t("button.countinue")}
              </button>
            </div>

            <p
              className="text-center text-gray-500 font-open-sans  text-base lg:text-sm md:text-lg 2xl:text-lg font-400 mt-4"
              style={{
                color: "#202020",

                cursor: "pointer",
              }}
            >
              {t("authPage.navigate.signup")}{" "}
              <span
                onClick={() => {
                  // Use the navigate function to go to the sign-in page
                  navigate("/signin");
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {t("authPage.signin.label")}
              </span>
            </p>
          </form>
          <LoginFooter />
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

export default SignUp;
