import React, { useState, useRef } from "react";

import authImage from "../assets/images/authImage.svg";
import LoginHeader from "../components/LoginHeader";
import EyeIcon from "../assets/images/InputUtils/EyeIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginFooter from "../components/LoginFooter";
import { VerifyOTP } from "../apis/auth/VerifyOTP";
import { SentOTP } from "../apis/auth/SentOTP";
import { useTranslation } from "react-i18next";

function ConfirmOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const number = location.state?.phoneNumber;

  const [inputs, setInputs] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Only allow single-digit input
    if (value.length > 1) {
      value = value.slice(-1); // Keep only the last entered digit
    }

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Move to the next input if a number is entered
    if (/^\d$/.test(value) && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const ResendOTP = async (number) => {
    const numberObject = {
      phoneNumber: number,
    };
    try {
      const response = await SentOTP(numberObject);

      if (response.status === false) {
        toast.error(response.message);
      } else if (response && response.status === 200) {
        // Successful login
        console.log("Login successful:", response.data);
        toast.success(response.data.message);

        // toast.success("Login Successful");
        // Add your logic here for a successful login
      } else {
        toast.error("Failed to send OTP");
        console.error("Login Failed:", response.data);
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response error:", error.response.data);
        toast.error(error.response.data);
        // Add your logic for handling response errors
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        toast.error("Login Failed");
        // Add your logic for handling request errors
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        toast.error("Login Failed");
        // Add your logic for handling other types of errors
      }
    }
  };
  const handleFormSubmit = async () => {
    const otp = inputs.join("");
    if (otp.length !== 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    const otpObject = {
      otp: otp,
      phoneNumber: number,
    };
    try {
      const response = await VerifyOTP(otpObject);
      console.log(response);
      if (response.status === false) {
        toast.error(response.message);
      } else if (response && response.data) {
        if (response.data.status === false) {
          toast.error(response.data.message);
        } else {
          console.log("Login successful:", response.data);
          navigate("/confirm-password", { state: { phoneNumber: number } });
          toast.success("OTP Verification Successful");
        }
        // Successful login

        // Add your logic here for a successful login
      } else {
        toast.error("OTP Verification Failed");
        console.error("Login Failed:", response.data);
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response error:", error.response.data);

        // Add your logic for handling response errors
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);

        // Add your logic for handling request errors
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        toast.error("OTP Verification Failed");
        // Add your logic for handling other types of errors
      }
    }
  };
  return (
    <div className="font-[open-sans] text-[#333]">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <div className="max-w-xl w-full p-6 mx-auto lg:mt-5 mt-10">
          <LoginHeader />
          <div className="mb-4 mt-4">
            <h3 className="  2xl:text-3xl lg:text-2xl md:text-xl text-2xl  text-center text-gray-800 font-open-sans font-bold leading-14">
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
          <label className="2xl:text-md text-sm block mb-3 ml-3 text-gray-800 font-open-sans">
            <span style={{ color: "#202020", fontWeight: "bold" }}>
              {" "}
              {t("authPage.otp.text1")}
            </span>

            <br />

            <span style={{ color: "#A0A0A0", fontWeight: "600" }}>
              {" "}
              {t("authPage.otp.text2")}{" "}
            </span>
            <span style={{ color: "#202020", fontWeight: "bold" }}>
              {number}
            </span>
          </label>

          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {inputs.map((value, index) => (
              <div key={index} className="w-16 h-16">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center ">
            <button
              onClick={handleFormSubmit}
              className="md:w-1/4 w-2/4 shadow-xl 2xl:py-2.5 py-2 2xl:px-3 px-2 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.countinue")}
            </button>
          </div>

          <p
            className="text-center text-gray-500 font-open-sans   2xl:text-lg text-sm font-400 mt-4"
            style={{
              color: "#A0A0A0",

              cursor: "pointer",
            }}
          >
            {t("authPage.navigate.otp")}{" "}
            <span
              onClick={() => {
                ResendOTP(number);
              }}
              style={{
                cursor: "pointer",
                color: "#202020",
              }}
            >
              {t("authPage.otp.message")}
            </span>
          </p>

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

export default ConfirmOTP;
