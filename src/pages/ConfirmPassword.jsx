import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import authImage from "../assets/images/authImage.svg";
import LoginHeader from "../components/LoginHeader";
import EyeIcon from "../assets/images/InputUtils/EyeIcon";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginFooter from "../components/LoginFooter";
import { SignUpApi } from "../apis/auth/SignUpAPI";
import { useTranslation } from "react-i18next";

function ConfirmPassword() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const number = location.state?.phoneNumber;
  const [agreed, setAgreed] = useState(false);

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t("authPage.error.password")),
    confirmPassword: Yup.string()
      .required(t("authPage.error.password"))
      .oneOf([Yup.ref("password"), null], t("authPage.error.passwordMatch")),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumberPrefix: "+92",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const signUpObj = {
        password: values.password,
        phoneNumber: number,
      };
      console.log(signUpObj);
      if (!agreed) {
        toast.error("Please agree to the terms and conditions");
        return;
      }
      try {
        const response = await SignUpApi(signUpObj);

        if (response.data && response.data.status === true) {
          console.log(response.data);
          toast.success("Account created successfully");
          navigate("/signin");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Handle errors
        console.log(error);
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
        <div className="max-w-xl w-full p-6 mx-auto lg:mt-0 mt-10">
          <form onSubmit={handleSubmit}>
            <LoginHeader />
            <div className="mb-4 mt-3">
              <h3 className=" 2xl:text-3xl lg:text-2xl md:text-xl text-2xl  text-center text-gray-800 font-open-sans font-bold leading-14">
                {t("authPage.signup.label")}
              </h3>

              <p
                className="text-center text-gray-500 font-open-sans font-400 mt-auto justify-end"
                style={{
                  color: "#202020",
                  fontSize: "14px",
                  lineHeight: "36px" /* 350% */,
                }}
              >
                {t("authPage.signup.message")}
              </p>
            </div>

            <div className="2xl:mt-8 lg:mt-4 md-mt-6 relative">
              <label className="2xl:text-md text-sm block mb-3 ml-3 font-semibold">
                {t("authPage.signup.password.label")}
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full text-sm border-b border-gray-300 px-4 py-2 rounded-[20px] outline-none"
                  placeholder={t("authPage.signup.password.placeholder")}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-7 cursor-pointer"
                  onClick={() => handleTogglePassword("password")}
                >
                  <EyeIcon />
                </div>
              </div>
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>

            <div className="2xl:mt-8 lg:mt-4 md-mt-6 relative">
              <label className="2xl:text-md text-sm block mb-3 ml-3 font-semibold">
                {t("authPage.signup.confirmPassword.label")}
              </label>
              <div className="relative flex items-center">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full text-sm border-b border-gray-300 px-4 py-3 rounded-[20px] outline-none"
                  placeholder={t("authPage.signup.confirmPassword.placeholder")}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-7 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmPassword")}
                >
                  <EyeIcon />
                </div>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="text-red-500">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="flex items-center mt-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value={agreed}
                className="w-4 h-4  border-gray-300 rounded text-red-600"
                style={{ background: "#202020" }}
                onChange={() => setAgreed(!agreed)}
              />

              <label
                htmlFor="agreeCheckbox"
                className="text-sm font-open-sans font-400 text-[#A0A0A0] ml-2"
              >
                {t("authPage.signup.terms1")}{" "}
                <span className="text-[#202020] font-semibold">
                  {t("authPage.signup.terms2")}
                </span>
              </label>
            </div>
            <div className="2xl:mt-4 lg:mt-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="md:w-1/4 w-2/4 shadow-xl 2xl:py-2.5 py-2 2xl:px-3 px-2 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                {t("button.countinue")}
              </button>
            </div>
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

export default ConfirmPassword;
