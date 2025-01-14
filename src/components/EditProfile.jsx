import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";
import { UpdateProfile } from "../apis/userProfile/updateProfile";
import { UploadImage } from "../apis/userProfile/uploadImage";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
const EditProfile = () => {
  const { t } = useTranslation();
  // State variables to hold form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [aboutYourself, setAboutYourself] = useState("");
  const { logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const location = useLocation();
  const userInfo = location?.state?.userData;

  const [userImage, setUserImage] = useState(null);
  const [ImageLink, setImageLink] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo?.firstName);
      setLastName(userInfo?.lastName);
      setEmail(userInfo?.email);
      setPhoneNumber(userInfo?.phoneNumber);
      setAddress(userInfo?.address);
      setZipCode(userInfo?.zipCode);
      setCity(userInfo?.city);
      setAboutYourself(userInfo?.description);
      setUserImage(userInfo?.profileImage);
      setImageLink(process.env.REACT_APP_IMAGE_PATH + userInfo?.profileImage);
    }
  }, []);

  const handleImageChange = async (event) => {
    const id = toast.loading(t("message.updateImgLoading"));
    try {
      // Display loading toast

      const file = event.target.files[0];

      if (file) {
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //   setUserImage(reader.result);
        // };
        // reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        const response = await UploadImage(formData, userData.token, logOut);

        if (response && response.data) {
          // Display success toast
          toast.update(id, {
            render: t("message.updateImg"),
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });

          setUserImage(response.data.urlPath);
          setImageLink(
            process.env.REACT_APP_IMAGE_PATH + response.data.urlPath
          );
        } else {
          // Display error toast
          toast.update(id, {
            render: t("message.updateImgError"),
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
          console.log(response);
        }
      }
    } catch (error) {
      // Display error toast if an unexpected error occurs
      toast.update(id, {
        render: t("message.serverError"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error(error);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("image-upload").click();
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      address === "" ||
      zipCode === "" ||
      city === "" ||
      aboutYourself === ""
    ) {
      toast.error(t("message.error"));
    } else {
      const profileData = {
        // phoneNumber: phoneNumber,
        profileImage: userImage,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        zipCode: zipCode,
        city: city,
        description: aboutYourself,
      };
      try {
        const response = await UpdateProfile(
          profileData,
          userData.token,
          logOut
        );

        if (response.data && response.data.status === true) {
          // Successful login
          navigate("/profile");
          toast.success(t("message.profileUpdated"));
        } else {
          toast.error(t("message.fault"));
          console.error("Login Failed:", response.data.message);
        }
      } catch (error) {
        // Handle errors
        console.log(error);
        // Handle specifically status code 400 errors
        console.error("Bad Request error:", error);
      }
    }
  };

  const handleCancel = () => {
    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setZipCode("");
    setCity("");
    setAboutYourself("");
  };

  return (
    <div className="flex flex-col w-full">
      {/* <PageHeading title="View Profile" /> */}
      <div className="xs:w-[95%] md:w-5/6 h-auto bg-white shadow-md md:px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mt-8 border rounded-lg">
        <form onSubmit={handleSubmit} className="lg:px-20 md:px-10 xs:px-2">
          <div className="relative flex items-center md:mt-10  mt-2 lg:mt-15">
            <div className="relative md:w-36 md:h-32  w-26 h-20">
              <img
                src={ImageLink}
                onClick={handleAvatarClick}
                alt="User Avatar"
                className="md:w-32 md:h-32 w-20 h-20 mx-3 md:mx-5  object-cover rounded-full cursor-pointer border-black border-4"
              />
              <img
                src="/EditImage.svg"
                onClick={handleAvatarClick}
                alt="User Avatar"
                className="absolute bottom-0 right-0 w-8 h-8 md:mr-6  mr-4 object-cover rounded-full cursor-pointer"
              />
            </div>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-gray-500 font-open-sans text-sm font-normal  mt-2 ml-5">
            {t("edit.img")}
          </p>
          <h1 className="text-1B1839 font-open-sans text-xl font-bold leading-normal tracking-wide mt-10">
            {t("edit.heading1")}
          </h1>
          <div className="flex flex-wrap -mx-3 mb-2 px-3">
            <div className="md:w-1/2 w-[90%] px-3 mb-2 mt-5">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
                htmlFor="grid-first-name"
              >
                {t("edit.fname.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
                id="grid-first-name"
                type="text"
                placeholder={t("edit.fname.placeholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-[90%] px-3 mb-2 mt-5">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2 "
                htmlFor="grid-last-name"
              >
                {t("edit.lname.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black rounded-2xl py-3 px-4 mb-3 outline-none"
                id="grid-last-name"
                type="text"
                placeholder={t("edit.lname.placeholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-3 px-3">
            <div className="md:w-1/2 w-[90%] px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
                htmlFor="grid-email"
              >
                {t("edit.email.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
                id="grid-email"
                type="email"
                placeholder={t("edit.email.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 w-[90%] px-3 mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
                htmlFor="grid-phone-number"
              >
                {t("edit.phoneNo.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
                id="grid-phone-number"
                type="tel"
                placeholder={t("edit.phoneNo.placeholder")}
                value={userData.userInfo.phoneNumber}
                disabled
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <h1 className="text-1B1839 font-open-sans text-xl font-bold leading-normal tracking-wide my-5 ">
            {t("edit.heading2")}
          </h1>
          <div className="md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="grid-address"
            >
              {t("edit.address.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
              id="grid-address"
              type="text"
              placeholder={t("edit.address.placeholder")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="-mx-3  px-3 md:flex">
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
                htmlFor="grid-zip-code"
              >
                {t("edit.zipCode.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
                id="grid-zip-code"
                type="number"
                placeholder={t("edit.zipCode.placeholder")}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
                htmlFor="grid-city"
              >
                {t("edit.city.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
                id="grid-city"
                type="text"
                placeholder={t("edit.city.placeholder")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="grid-about-yourself"
            >
              {t("edit.about.label")}
            </label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-black outline-none rounded-2xl py-3 px-4 mb-3 "
              id="grid-about-yourself"
              rows="4"
              placeholder={t("edit.about.placeholder")}
              value={aboutYourself}
              onChange={(e) => setAboutYourself(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-4 lg:w-1/3 w-[50%] flex justify-end ml-auto">
            <button
              type="submit"
              className="w-[45%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
