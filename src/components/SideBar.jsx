import React, { useContext, useEffect, useState } from "react";
import {
  Comparison,
  Profile,
  StandardParameter,
  SubscriptionIcon,
} from "../assets/images/Sidebar/sidebarIcons";
import { Link } from "react-router-dom";
import { ActiveButtonContext } from "../context/ActiveButtonContext";
import { GetUserProfile } from "../apis/userProfile/getUserProfile";
import { UserInfoContext } from "../context/UserInfo";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
const Sidebar = () => {
  const { activeButton, setActiveButton } = useContext(ActiveButtonContext);
  const { userInfo } = useContext(UserInfoContext);
  const { t } = useTranslation();
  const { logOut } = useContext(AuthContext);

  const [name, setName] = useState("Waseem Khan");
  const [occupation, setOccupation] = useState("Real Estate Developer");

  const handleOptionClick = (option) => {
    setActiveButton(option);
  };
  const [img, setImg] = useState();

  const userDataString = localStorage.getItem("userData");
  const getUser = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("userData");
        const userData = storedData ? JSON.parse(storedData) : {};

        if (getUser && getUser.token) {
          const response = await GetUserProfile(getUser.token, logOut);

          if (response.data && response.data.status === true) {
            const userDetails = response.data.userDetails;

            if (userDetails.firstName && userDetails.lastName) {
              setName(`${userDetails.firstName} ${userDetails.lastName}`);
            } else {
              setName("Update Name");
            }

            if (userDetails.profileImage) {
              setImg(
                `${process.env.REACT_APP_IMAGE_PATH}${userDetails.profileImage}`
              );
            } else {
              setImg(
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              );
            }

            // Update the data or add new properties
            userData.userInfo = {
              ...userData.userInfo,
              profileImage: userDetails.profileImage,
              // Add more properties or modify existing ones as needed
            };

            // Store the updated data back in localStorage
            localStorage.setItem("userData", JSON.stringify(userData));

            if (userDetails.email) {
              setOccupation(userDetails.email);
            } else {
              setOccupation("temp@gmail.com");
            }
          } else {
            console.error(response.data.message);
          }
        } else {
          logOut();
          console.error("User data or token is missing.", getUser);
        }
      } catch (error) {
        // Handle errors
        console.error("An error occurred:", error.message);

        if (error.response && error.response.status === 400) {
          // Handle specifically status code 400 errors
          console.error("Bad Request error:", error.response);
        }
      }
    };

    fetchData();
  }, [getUser]);

  return (
    <aside className="flex flex-col md:min-w-64 xs:min-w-16 h-auto px-4 md:py-8 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l mt-1">
      <div className="flex flex-col items-center justify-center mt-2 mx-2 xs:hidden md:block">
        <img
          className="object-cover w-36 h-36 mx-2 rounded-full border-2 border-spacing-5px ml-8"
          src={img || "https://via.placeholder.com/150"}
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 text-center font-open-sans text-base font-normal text-[#0C2340] leading-normal tracking-wide">
          {name}
        </h4>
        <p className="mx-2 mt-2 text-center font-open-sans text-sm font-normal text-[#8792A4] leading-normal tracking-wide">
          {occupation}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 xs:mt-2 md:mt-6">
        <nav>
          <Link
            to="/"
            className={`flex items-center  xs:px-0  md:px-3 py-2 rounded-lg ${
              activeButton === "Comparison" ? "text-black" : "text-gray-700"
            }`}
            onClick={() => handleOptionClick("Comparison")}
          >
            <Comparison
              stroke={activeButton === "Comparison" ? "#202020" : "#8792A4"}
            />
            <span className="mx-2 font-medium   xs:hidden md:block">
              {t("sidebar.comparison")}
            </span>
          </Link>

          <Link
            to="/parameter"
            className={`flex items-center xs:px-0  md:px-3  py-2 mt-3 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
              activeButton === "Standard Parameters"
                ? "text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleOptionClick("Standard Parameters")}
          >
            <StandardParameter
              stroke={
                activeButton === "Standard Parameters" ? "#202020" : "#8792A4"
              }
            />
            <span className="mx-2 font-medium xs:hidden md:block">
              {t("sidebar.parameters")}
            </span>
          </Link>

          <Link
            to="#"
            className={`flex items-center xs:px-0  md:px-3  py-2 mt-3 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
              activeButton === "Subscription" ? "text-black" : "text-gray-600"
            }`}
            onClick={() => handleOptionClick("Subscription")}
          >
            <SubscriptionIcon
              stroke={activeButton === "Subscription" ? "#202020" : "#8792A4"}
            />
            <span className="mx-2 font-medium xs:hidden md:block">
              {t("sidebar.subscription")}
            </span>
          </Link>

          <Link
            to="/profile"
            className={`flex items-center xs:px-0  md:px-3 py-2 mt-3 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
              activeButton === "Account Settings"
                ? "text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleOptionClick("Account Settings")}
          >
            <Profile
              stroke={
                activeButton === "Account Settings" ? "#202020" : "#8792A4"
              }
            />
            <span className="mx-2 font-medium xs:hidden md:block">
              {t("sidebar.account")}
            </span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
