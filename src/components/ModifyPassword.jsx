import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import PageHeading from "../utils/PageHeading";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../apis/userProfile/changePassword";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

const ModifyPassword = () => {
  // State variables to hold form data
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { logOut } = useContext(AuthContext);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      toast.error(t("message.error"));
    } else if (newPassword !== confirmPassword) {
      toast.error(t("message.modifyError"));
    } else {
      const passwordData = {
        currentPass: currentPassword,
        newPass: newPassword,
        confirmPass: confirmPassword,
      };

      try {
        const response = await ChangePassword(
          passwordData,
          userData.token,
          logOut
        );

        if (response.data && response.data.status === true) {
          // Successful login
          navigate("/profile");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
          console.error("Login Failed:", response.data.message);
        }
      } catch (error) {
        // Handle errors
        console.log(error);
        // Handle specifically status code 400 errors
        console.error("Bad Request error:", error.response);
      }

      // Reset form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex flex-col xs:w-[95%] md:w-2/3 ">
      <h2 className="text-black font-open-sans text-xl font-bold leading-normal mt-10">
        {t("change.heading")}
      </h2>

      <p className="text-gray-600 font-open-sans text-base font-normal lg:w-[50%] w-[90%] mt-4">
        {t("change.content")}
      </p>

      {/* <PageHeading title="Change Password" /> */}
      <div className="xs:w-[90%] md:w-5/6 h-auto bg-white shadow-md md:px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mt-8 border rounded-lg">
        <form onSubmit={handleSubmit} className="lg:px-15 md:px-10 xs:px-1">
          <div className="md:w-full px-3 mb-6 md:mb-0 mt-5">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="currentPassword"
            >
              {t("change.oldPassword.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3"
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="md:w-full px-3 mb-6 md:mb-0 mt-5">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="newPassword"
            >
              {t("change.newPassword.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3"
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="md:w-full px-3 mb-6 md:mb-0 mt-5">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="confirmPassword"
            >
              {t("change.confirmPassword.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className=" md:w-1/3 w-2/3 flex justify-end ml-auto mt-8 mr-3">
            <button
              type="submit"
              className="lg:w-[200px] w-[160px] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyPassword;
