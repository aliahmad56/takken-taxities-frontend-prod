import React, { useContext, useState } from "react";

import ReferernceObjectForm from "./ReferernceObjectForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AddReferenceObject } from "../apis/referneceObjects/addReferenceObject";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ReferenceObject = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const location = useLocation();
  console.log(location.state.valuationId);

  const auth = isLoggedIn();
  const [selectedOption, setSelectedOption] = useState("");
  const [ReferenceData, setReferenceData] = useState([]);
  const [currentReference, setCurrentReference] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);

  const { t } = useTranslation();
  const [referenceObjects, setReferenceObjects] = useState([
    `${t("referenceTitle")} 1`,
  ]);

  const addReferenceObject = () => {
    setReferenceObjects((prevObjects) => [
      ...prevObjects,
      `${t("referenceTitle")}  ${prevObjects.length + 1}`,
    ]);
  };

  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setCurrentIndex(1);

    setReferenceObjects([`${t("referenceTitle")} 1`]);
    setSelectedOption(e.target.value);
  };
  const handleFormSubmit = async (index, formData) => {
    setReferenceData((prevData) => {
      const newData = [...prevData];
      newData[index - 1] = formData;
      return newData;
    });

    try {
      const referenceObject = {
        valuationId: `${location.state.valuationId}`,
        sellingPrice: formData.price,
        propertyType: formData.propertyType,
        sellingDate: formData.formattedDate,
        livingArea: formData.squareMeter,
        plotSize: formData.plotSize,
        constructionYear: formData.year,
        address: formData.address,
        zipCode: formData.zipCode,
        houseNo: formData.houseNumber,
        city: formData.city,

        weaknessDataa: formData.weaknessesList,
        strengthDataa: formData.strengthsList,
      };

      const response = await AddReferenceObject(
        referenceObject,
        auth.userData.token,
        logOut
      );

      if (response && response.data.status) {
        // Display success toast
        console.log(response.data);
        addReferenceObject();
        setCurrentIndex(index + 1);
        toast.success(t("message.success"));
        if (index <= currentReference) {
          setCurrentReference(index + 1);
        }
      } else {
        // Display error toast with the specific message from the server
        const errorMessage =
          response && response.data.message
            ? response.data.message
            : t("message.fault");

        toast.error(errorMessage);
      }
    } catch (error) {
      // Display error toast with a generic message
      toast.error("message.server");
      console.error(error);
    }
  };

  const handleShowData = () => {
    console.log("All data:", ReferenceData);
    navigate("/comparison", {
      state: { valuationId: location.state.valuationId },
    });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="text-start text-base font-open-sans text-gray-800 mt-6 md:w-5/6  w-full">
        {referenceObjects.length > 0 && (
          <>
            {t("header")}
            {referenceObjects.map((header, index) => (
              <span key={index}>
                {index > 0 && " / "}
                {header}
              </span>
            ))}
          </>
        )}
      </div>

      <div className="text-center lg:text-4xl md:text-3xl xs:text-2xl font-bold font-open-sans text-gray-800 mt-6 w-5/6">
        {t("referenceTitle")} {currentIndex}
      </div>

      <h1 className="text-black font-open-sans md:text-2xl text-lg font-semibold mt-10 mb-5">
        {t("referenceSubTitle")}
      </h1>
      <div className="flex flex-col sm:flex-row    space-x-0 md:space-x-8">
      {/* Haya ate radio button kia ki awela show boyan 3, 4 ya 5 refrence add korosana re option goyan */}
      
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="3"
            checked={selectedOption === "3"}
            onChange={handleOptionChange}
            className="form-radio text-[#FF3131] border-[#FF3131] focus:ring-[#FF3131]"
          />
          <span className="ml-2">{t("compareOptions.3")}</span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            value="4"
            checked={selectedOption === "4"}
            onChange={handleOptionChange}
            className="form-radio text-[#FF3131] border-[#FF3131] focus:ring-[#FF3131]"
          />
          <span className="ml-2">{t("compareOptions.4")}</span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            value="5"
            checked={selectedOption === "5"}
            onChange={handleOptionChange}
            className="form-radio text-[#FF3131] border-[#FF3131] focus:ring-[#FF3131]"
          />
          <span className="ml-2">{t("compareOptions.5")}</span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            value="6"
            checked={selectedOption === "6"}
            onChange={handleOptionChange}
            className="form-radio text-[#FF3131] border-[#FF3131] focus:ring-[#FF3131]"
          />
          <span className="ml-2">{t("compareOptions.6")}</span>
        </label>
      </div>
      <div>
        {currentReference <= parseInt(selectedOption, 10) ? (
          <ReferernceObjectForm
            index={currentReference}
            onSubmit={handleFormSubmit}
          />
        ) : (
          handleShowData()
        )}
      </div>
    </div>
  );
};

export default ReferenceObject;
