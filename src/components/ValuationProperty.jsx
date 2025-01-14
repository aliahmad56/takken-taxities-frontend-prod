import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeading from "../utils/PageHeading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../context/AuthContext";
import { AddValuationProperty } from "../apis/valuation/AddValuationProperty";
import { GetParameters } from "../apis/parameters/getParameters";

const ValuationProperty = () => {
  // State variables to hold form data
  const [livingArea, setLivingArea] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [squareMeter, setSquareMeter] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [year, setYear] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const navigate = useNavigate();

  const [valuationId, setValuationId] = useState("");

  const { t } = useTranslation();
  const { isLoggedIn } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);

  const auth = isLoggedIn();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetParameters(auth.userData.token, logOut);

        if (response && response.data?.status) {
          console.log(response.data?.AdressDetails[0]?.addressName);
          setSelectedArea(response.data?.AdressDetails[0]?.addressName);
        } else {
          // toast.error("message.setParametersError");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      address === "" ||
      city === "" ||
      zipCode === 0 ||
      houseNumber === "" ||
      squareMeter === "" ||
      selectedArea === "" ||
      year === "" ||
      propertyType === "" ||
      livingArea === null
    ) {
      toast.error(t("message.error"));
    } else if (selectedArea === null) {
      toast.error(t("message.setParametersError"));
    } else {
      try {
        const valuation = {
          address: address,
          city: city,
          zipCode: parseInt(zipCode, 10),
          houseNo: parseInt(houseNumber, 10),
          livingArea: parseInt(livingArea, 10),
          plotSize: parseInt(squareMeter, 10),
          area: selectedArea,
          constructionYear: parseInt(year, 10),
          propertyType: propertyType,
        };

        const response = await AddValuationProperty(
          valuation,
          auth.userData.token,
          logOut
        );

        if (response && response.data?.status) {
          // Display success toast

          setValuationId(response.data.PropertyDetails.id);
          toast.success(t("message.success"));
          navigate("/reference", {
            state: { valuationId: response.data.PropertyDetails.id },
          });
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
        toast.error("message.serverError");
        console.error(error);
      }

      // Reset form fields
    }
  };
  const handleCancel = () => {
    // Reset form fields
    setAddress("");
    setCity("");
    setZipCode(0);
    setHouseNumber("");
    setSquareMeter("");
    setSelectedArea("");
    setLivingArea(0);
    setYear("");
    setPropertyType("");
  };
  const squareMeterValues = [
    { id: 1, value: "50" },
    { id: 2, value: "75" },
    { id: 3, value: "100" },
    { id: 4, value: "125" },
    { id: 5, value: "150" },
  ];
  const areaOptions = [
    { id: 1, value: "Terrace House" },
    { id: 2, value: "End House" },
    { id: 3, value: "Corner House" },
    { id: 4, value: "Semi Detached House" },
    { id: 5, value: "Detached House" },
  ];
  const propertyTypeOptions = [
    { id: "house", value: t("typeOfProperty.options.house") },
    { id: "apartment", value: t("typeOfProperty.options.apartment") },
    { id: "condo", value: t("typeOfProperty.options.condo") },
    { id: "townhouse", value: t("typeOfProperty.options.townhouse") },
    { id: "duplex", value: t("typeOfProperty.options.duplex") },
  ];
  const title = t("valuationTitle");

  return (
    <div className="flex flex-col w-full">
      <PageHeading title={title} />
      <div className="xs:w-[95%] md:w-5/6 h-auto bg-white shadow-md md:px-8 pt-6 pb-8 mb-4 flex flex-col my-2 md:mt-8 mt-4  border rounded-lg">
        <form onSubmit={handleSubmit} className="lg:px-20 md:px-10 xs:px-1">
          <h1 className="text-1B1839 font-open-sans md:text-[24px] xs:text-[18px] md:text-start xs:text-center font-semibold leading-normal tracking-wide md:mt-10 xs:mt-2">
            {t("valuationSubTitle")}
          </h1>
          <div className="md:w-full xs:px-3 md:px-0  mb-6 md:mb-0 mt-5">
            <label
              className="block  tracking-wide text-grey-darker md:text-base text-sm semi-bold  mb-2 out"
              htmlFor="grid-address"
            >
              {t("address.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-2xl outline-none md:py-3 md:px-4 py-2 px-2 mb-3 "
              id="grid-address"
              type="text"
              placeholder={t("address.placeholder")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="xs:px-3 md:px-0  md:flex ">
            <div className="md:w-1/2  ">
              <label
                className="block  tracking-wide text-grey-darker md:text-sm text-xs semi-bold mb-2"
                htmlFor="grid-first-name"
              >
                {t("zipCode.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-2xl outline-none md:py-3 md:px-4 py-2 px-2 mb-3 "
                id="grid-first-name"
                type="number"
                placeholder={t("zipCode.placeholder")}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="md:w-1/2 xs:pl-0  md:pl-3 ">
              <label
                className="block  tracking-wide text-grey-darker md:text-sm text-xs semi-bold mb-2"
                htmlFor="grid-last-name"
              >
                {t("houseNumber.label")}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter roundedfull md:py-3 md:px-4 py-2 px-2 rounded-2xl outline-none"
                id="grid-last-name"
                type="number"
                placeholder={t("houseNumber.placeholder")}
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-1/2 xs:px-3 md:px-0  ">
            <label
              className="block  tracking-wide text-grey-darker md:text-sm xs:text-[14px]  semi-bold mb-2 mt-2"
              htmlFor="grid-last-name"
            >
              {t("city.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter roundedfull md:py-3 md:px-4 py-2 px-2 rounded-2xl outline-none"
              id="grid-last-name"
              type="text"
              placeholder={t("city.placeholder")}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 w-full xs:px-3 md:px-0   py-3">
            <label
              className="block  tracking-wide text-grey-darker md:text-[24px] xs:text-[14px] semi-bold "
              htmlFor="grid-last-name2"
            >
              {t("sqmLivingArea.label")}
            </label>
            <select
              className="border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl outline-none mt-3 mb-2"
              id="grid-square-meter"
              value={livingArea}
              onChange={(e) => setLivingArea(e.target.value)}
            >
              <option value="" disabled selected>
                {t("sqmLivingArea.placeholder")}
              </option>
              {squareMeterValues.map((squareMeterOption) => (
                <option
                  key={squareMeterOption.id}
                  value={squareMeterOption.value}
                >
                  {squareMeterOption.value}
                </option>
              ))}
            </select>
          </div>

          <div className="md:w-1/2 xs:px-3 md:px-0  md:mb-0 py-3">
            <label
              className="block  tracking-wide text-grey-darker md:text-[22px] xs:text-[14px] semi-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("plotSize.label")}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 md:text-sm text-xs w-full p-3 rounded-2xl  outline-none"
              id="grid-square-meter"
              value={squareMeter}
              onChange={(e) => setSquareMeter(e.target.value)}
            >
              <option value="" disabled selected>
                {t("plotSize.placeholder")}
              </option>
              {squareMeterValues.map((squareMeterOption) => (
                <option
                  key={squareMeterOption.id}
                  value={squareMeterOption.value}
                >
                  {squareMeterOption.value}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 xs:px-3 md:px-0  mb-6 md:mb-0">
            <label
              className="block  tracking-wide text-grey-darker md:text-[22px] xs:text-[14px] semi-bold mb-2"
              htmlFor="grid-area"
            >
              {t("area.label")}
            </label>

            <select
              className=" border border-gray-300 text-gray-900 md:text-sm text-xs w-full p-3 rounded-2xl outline-none"
              id="grid-area"
              value={selectedArea}
              disabled
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option value="" disabled>
                {t("area.placeholder")}
              </option>
              {areaOptions.map((areaOption) => (
                <option key={areaOption.value} value={areaOption.value}>
                  {areaOption.value}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 xs:px-3 md:px-0  py-3">
            <label
              className="block  tracking-wide text-grey-darker md:text-[22px] xs:text-[14px] semi-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("constructionYear.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter roundedfull md:py-3 md:px-4 py-2 px-2 rounded-2xl outline-none"
              id="grid-last-name"
              type="number"
              placeholder={t("constructionYear.placeholder")}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 mb-6  xs:px-3 md:px-0 md:mb-0">
            <label
              className="block  tracking-wide text-grey-darker md:text-[22px] xs:text-[14px] semi-bold mb-2"
              htmlFor="grid-area"
            >
              {t("typeOfProperty.label")}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 md:text-sm text-xs w-full p-3 rounded-2xl  outline-none"
              id="grid-area"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="" disabled>
                {t("typeOfProperty.placeholder")}
              </option>
              {propertyTypeOptions.map((propertyType) => (
                <option key={propertyType.id} value={propertyType.value}>
                  {propertyType.value}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 md:w-1/3 w-2/3  xs:px-3 md:px-0 flex justify-end ml-auto">
            <button
              onClick={() => handleCancel()}
              type="button" // Add type="button" to specify it as a button
              className="lg:w-[200px] w-[160px] shadow-xl py-2.5 px-4 md:text-sm text-xs font-semibold rounded-2xl outline-none text-black border border-[#000] focus:outline-none mr-2"
            >
              {t("button.cancel")}
            </button>
            <button
              type="submit"
              className="lg:w-[200px] w-[160px] shadow-xl py-2.5 px-4 md:text-sm text-xs font-semibold rounded-2xl outline-none text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValuationProperty;
