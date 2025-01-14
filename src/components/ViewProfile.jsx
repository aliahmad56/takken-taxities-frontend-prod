import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserProfile } from "../apis/userProfile/getUserProfile";

import { UserInfoContext } from "../context/UserInfo";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserInfo = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-0 mb-4 px-3">
    <div className="text-gray-800 font-open-sans md:text-base  text-sm font-semibold">
      {label}
      {label !== "About" ? (
        <hr className="w-full my-2 border-gray-200" />
      ) : null}
    </div>
    <div className="text-gray-600 font-open-sans md:text-base  text-sm font-normal">
      {value}
      {label !== "About" ? (
        <hr className="w-full my-2 border-gray-200" />
      ) : null}
    </div>
  </div>
);

const ViewProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = isLoggedIn();

  // Add your user image state or prop

  const [userInfoData, setUserInfoData] = useState([]);
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.isLoggedIn) {
          const response = await GetUserProfile(auth.userData.token, logOut);
          if (response.data && response.data.status === true) {
            // Successful login
            setUserData(response.data.userDetails);

            if (response.data.userDetails.profileImage) {
              setUserImage(
                process.env.REACT_APP_IMAGE_PATH +
                  response.data.userDetails.profileImage
              );
            } else {
              setUserImage(
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              );
            }

            //handle image
          } else {
            console.error(response.data.message);
          }
        } else {
          logOut();
          console.error("User data or token is missing.", auth?.isLoggedIn);
        }
      } catch (error) {
        // Handle errors
        console.log(error);
        if (error.response && error.response.status === 400) {
          // Handle specifically status code 400 errors
          console.error("Bad Request error:", error.response);
        } else {
          // Handle other types of errors
          console.error("An error occurred:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUserName(userData.firstName + " " + userData.lastName);
      setUserEmail(userData.email);
      setUserInfo({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
      setUserInfoData([
        {
          label: t("view.owner"),
          value: userData.firstName + userData.lastName || "No User Name",
        },
        { label: t("view.email"), value: userData.email || "-" },
        { label: t("view.password"), value: "********" },
        { label: t("view.phoneNo"), value: `+${userData.phoneNumber}` || "-" },
        {
          label: t("view.telePhoneNumber"),
          value: userData.telephoneNumber || "051234567",
        },
        {
          label: t("view.dateAgencyEstablish"),
          value: userData.dateEstablished || "11/22/2022",
        },
        { label: t("view.address"), value: userData.address || "-" },
        { label: t("view.zipcode"), value: userData.zipCode || "-" },
        { label: t("view.city"), value: userData.city || "-" },
        { label: t("view.about"), value: userData.description || "-" },
      ]);
    }
  }, [userData]);

  const handleModifyPasswordClick = () => {
    navigate("/modify-password");
  };

  const handleEditProfileClick = () => {
    navigate("/edit-profile", { state: { userData } });
  };

  return (
    <>
      {userImage ? (
        <div className="flex flex-col w-full">
          <div className="xs:w-[95%] md:w-5/6 h-auto bg-white shadow-md md:px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mt-8 border rounded-lg">
            <div className="flex items-center">
              <img
                src={userImage}
                alt="User Avatar"
                className="md:w-32 md:h-32 w-20 h-20 mx-3 md:mx-5 object-cover rounded-full"
              />
              <div className="flex flex-col ml-5">
                <h3 className="font-Outfit md:text-xl text-lg font-normal leading-8 text-black">
                  {userName?.length > 1 && userName !== "null null"
                    ? userName
                    : "No User Name"}
                </h3>
                <h3 className="font-sans md:text-base text-sm font-normal leading-6 text-gray-700">
                  {userEmail?.length > 0 ? userEmail : "temp@gmail.com"}
                </h3>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 ">
              {userInfoData.map((info, index) => (
                <UserInfo key={index} label={info.label} value={info.value} />
              ))}
            </div>

            <div className="md:w-1/3 w-2/3 flex justify-end ml-auto gap-2 mt-10 mr-5">
              <button
                onClick={handleModifyPasswordClick}
                className="lg:w-[200px] w-[160px] shadow-xl md:py-2.5 py-1 px-4 text-sm font-semibold text-center rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                {t("button.modify")}
              </button>
              <button
                onClick={handleEditProfileClick}
                className="md:w-[200px] w-[160px] shadow-xl md:py-2.5 py-1 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none flex items-center justify-center"
              >
                {t("button.edit")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-screen">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProfile;
