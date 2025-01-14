import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import PageHeading from "../utils/PageHeading";
import numberToWords from "number-to-words";

import { AuthContext } from "../context/AuthContext";

import { useTranslation } from "react-i18next";
import { GetParameters } from "../apis/parameters/getParameters";
import { UpdateParameters } from "../apis/parameters/updateParameters";

const StandardParameters = () => {
  // State variables to hold form data
  const { t } = useTranslation();

  const [price, setPrice] = useState(0);
  const [plotSize, setPlotSize] = useState("");
  const [priceUnit, setPriceUnit] = useState(0); // priceUnit

  const [terracedHouse, setTerracedHouse] = useState("");
  const [endHouse, setEndHouse] = useState("");
  const [cornerHouse, setCornerHouse] = useState("");
  const [semiDetachedHouse, setSemiDetachedHouse] = useState("");
  const [detachedHouse, setDetachedHouse] = useState("");

  const [status, setStatus] = useState("View");
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const auth = isLoggedIn();

  // Function to handle form submission
  const areaOptions = [
    { id: 1, value: "Terrace House" },
    { id: 2, value: "End House" },
    { id: 3, value: "Corner House" },
    { id: 4, value: "Semi Detached House" },
    { id: 5, value: "Detached House" },
  ];
  const [addressDetails, setAddressDetails] = useState([
    {
      addressName: "",
      addressValue: 0,
    },
  ]);

  const addAddress = () => {
    setAddressDetails([
      ...addressDetails,
      { addressName: "", addressValue: 0 },
    ]);
  };

  const handleAddressNameChange = (index, value) => {
    const updatedDetails = [...addressDetails];
    updatedDetails[index].addressName = value;
    setAddressDetails(updatedDetails);
  };

  const handleAddressValueChange = (index, value) => {
    const updatedDetails = [...addressDetails];
    updatedDetails[index].addressValue = parseFloat(value);
    setAddressDetails(updatedDetails);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetParameters(auth.userData.token, logOut);

        if (response && response.data?.status) {
          // Display success toast

          setPrice(response?.data.showStandardParameters?.livingArea);
          setPriceUnit(response.data.showStandardParameters?.livingAreaSize);
          setPlotSize(response.data.showStandardParameters?.plotSize);
          setTerracedHouse(response.data.showStandardParameters?.teraccedHouse);
          setEndHouse(response.data.showStandardParameters?.endHouse);
          setCornerHouse(response.data.showStandardParameters?.cornerHouse);
          setSemiDetachedHouse(
            response.data.showStandardParameters?.semiDetachedHouse
          );
          setDetachedHouse(response.data.showStandardParameters?.detachedHouse);
          setAddressDetails(response.data.AdressDetails);

          setStatus("View");
        } else {
          // Display error toast with the specific message from the server
          // const errorMessage =
          //   response && response.data?.message
          //     ? response.data?.message
          //     : t("message.fault");
          // toast.error(errorMessage);
        }
      } catch (error) {
        // Display error toast with a generic message
        // toast.error(t("message.serverError"));
        console.error(error);
      }
    };
    const auth = isLoggedIn();
    fetchData(); // Call the asynchronous function
  }, []); // Empty dependency array for componentDidMount behavior
  // console.log(addressDetails);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      price === "" ||
      priceUnit === null ||
      terracedHouse === null ||
      endHouse === null ||
      cornerHouse === null ||
      semiDetachedHouse === null ||
      detachedHouse === null ||
      plotSize === null
    ) {
      toast.error(t("message.error"));
    } else {
      try {
        const parameter = {
          plotSize: parseFloat(plotSize), //plotSize,
          livingArea: parseFloat(price),
          adressDetails: addressDetails,
          teraccedHouse: parseFloat(terracedHouse),
          endHouse: parseFloat(endHouse),
          cornerHouse: parseFloat(cornerHouse),
          semiDetachedHouse: parseFloat(semiDetachedHouse),
          detachedHouse: parseFloat(detachedHouse),
        };
        if (!auth.userData.token) {
          console.log("no token");
        }

        const response = await UpdateParameters(
          parameter,
          auth.userData.token,
          logOut
        );

        if (response && response.data.status) {
          // Display success toast
          // console.log(response.data);
          // console.log(response.data.standardParameter.detachedHouse);
          // toast.success(t("message.parametersUpdated"));
          // setPrice(response.data.standardParameter.plotSize);
          setPriceUnit(response.data.standardParameter.livingArea);
          setPlotSize(response.data.standardParameter.plotSize);
          setTerracedHouse(response.data.standardParameter.terracedHouse);
          setEndHouse(response.data.standardParameter.endHouse);
          setCornerHouse(response.data.standardParameter.cornerHouse);
          setSemiDetachedHouse(
            response.data.standardParameter.semiDetachedHouse
          );
          setDetachedHouse(response.data.standardParameter.detachedHouse);
          setAddressDetails(response.data.adress);

          setStatus("View");
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
    }
  };

  const handleCancel = () => {
    // Reset form fields
  };
  const values = [
    { id: 1, unit: "sq.m", label: t("parameters.livingArea.options.sqm") },
    { id: 2, unit: "sq.ft", label: t("parameters.livingArea.options.sqft") },
    // Add other conversions
    { id: 3, unit: "sq.yd", label: t("parameters.livingArea.options.sqyd") },
    { id: 4, unit: "sq.km", label: t("parameters.livingArea.options.sqkm") },
    // Add more as needed
  ];

  const valuations = [
    { id: 0, value: 0, label: "Plus 0.0%" },
    { id: 3, value: 3, label: "Plus 2.5%" },
    { id: 5, value: 5, label: "Plus 5.0%" },
    { id: 8, value: 8, label: "Plus 7.5%" },
    { id: 10, value: 10, label: "Plus 10.0%" },
    { id: 13, value: 13, label: "Plus 12.5%" },
    { id: 15, value: 15, label: "Plus 15.0%" },
    { id: 20, value: 20, label: "Plus 20.0%" },
  ];

  const costs = [
    { id: 0.0, value: 0.0, label: "Basic is 0%" },
    { id: 3, value: 2.5, label: "Basic is 2.5%" },
    { id: 5, value: 5, label: "Basic is 5.0%" },
    { id: 8, value: 7.5, label: "Basic is 7.5%" },
    { id: 10, value: 10, label: "Basic is 10.0%" },
    { id: 13, value: 12.5, label: "Basic is 12.5%" },
  ];
  const convertToWords = (num) => {
    // Replace 'and' with '&'
    let words = numberToWords.toWords(num).replace(/,/g, " &");
    words = words.replace(/-/g, " ");
    words = words.charAt(0).toUpperCase() + words.slice(1);
    return words;
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setStatus("Edit");
  };
  const heading = t("parameters.heading");

  return (
    <div className="flex flex-col w-full">
      <PageHeading title={heading} />
      <div className="xs:w-[95%] md:w-5/6 h-auto bg-white shadow-md md:px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mt-8 border rounded-lg">
        <form onSubmit={handleSubmit} className="lg:px-20 md:px-10 xs:px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-1B1839 font-open-sans text-2xl  md:text-[24px] xs:text-[20px] md:text-start xs:text-center font-semibold leading-normal tracking-wide mt-5 px-3">
              {t("parameters.subheading")}
            </h1>
            {status !== "Edit" ? (
              <button
                type="button"
                onClick={handleEdit}
                className="shadow-xl py-2.5 md:px-12 px-4 text-sm font-semibold rounded-2xl text-black border border-[#000] focus:outline-none mr-2"
              >
                {t("button.edit")}
              </button>
            ) : null}
          </div>
          <div className="md:w-1/2 px-3 mb-6 py-3 mt-5">
            <label
              className="block tracking-wide text-grey-darker md:text-xl text-base semi-bold mb-4"
              htmlFor="grid-last-name"
            >
              {t("parameters.livingArea.label")}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl outline-none"
              id="grid-square-meter"
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
              disabled={status !== "Edit"}
            >
              <option value="" disabled>
                {t("parameters.livingArea.placeholder")}
              </option>
              {values.map((value) => (
                <option key={value.id} value={value.unit}>
                  {value.label}
                </option>
              ))}
            </select>

            <div className="relative">
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 outline-none rounded-2xl py-3 px-4 mt-4 pr-10" // Added pr-10 for padding on the right side
                id="grid-last-name"
                type="number"
                placeholder={t("parameters.livingArea.price")}
                value={price}
                readOnly={status !== "Edit"}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Adding the $ sign */}
              <div className="absolute top-4 right-4 flex items-center pointer-events-none">
                <span className="text-grey-dark">$</span>
              </div>
              <div
                className="text-grey-dark mt-2 ml-5"
                style={{
                  color: "#9B9B9B",
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "28.473px",
                }}
              >
                {(price && convertToWords(price)) || ""}
              </div>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 outline-none rounded-2xl py-3 px-4 mt-4 pr-10" // Added pr-10 for padding on the right side
                id="grid-last-name1"
                type="number"
                placeholder="Plot Size"
                value={plotSize}
                readOnly={status !== "Edit"}
                onChange={(e) => setPlotSize(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-1/2 px-3 mb-6">
            <label
              className="block tracking-wide text-grey-darker md:text-xl text-base semi-bold mb-3"
              htmlFor="grid-area"
            >
              {t("parameters.terraced.label")}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl  outline-none"
              id="grid-area"
              value={terracedHouse}
              onChange={(e) => setTerracedHouse(e.target.value)}
              disabled={status !== "Edit"}
            >
              <option value="" disabled>
                {t("parameters.terraced.placeholder")}
              </option>
              {valuations.map((value) => (
                <option key={value.id} value={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 px-3 mb-6">
            <label
              className="block tracking-wide text-grey-darker md:text-xl text-base semi-bold mb-3"
              htmlFor="grid-area"
            >
              {t("parameters.endHouse.label")}{" "}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl  outline-none"
              id="grid-area"
              value={endHouse}
              onChange={(e) => setEndHouse(e.target.value)}
              disabled={status !== "Edit"}
            >
              <option value="" disabled>
                {t("parameters.endHouse.placeholder")}
              </option>
              {valuations.map((value) => (
                <option key={value.id} value={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 px-3 mb-6">
            <label
              className="block tracking-wide text-grey-darker md:text-xl text-base semi-bold mb-3"
              htmlFor="grid-area"
            >
              {t("parameters.corner.label")}{" "}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl  outline-none"
              id="grid-area"
              value={cornerHouse}
              onChange={(e) => setCornerHouse(e.target.value)}
              disabled={status !== "Edit"}
            >
              <option value="" disabled>
                {t("parameters.corner.placeholder")}
              </option>
              {valuations.map((value) => (
                <option key={value.id} value={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 px-3 mb-6">
            <label
              className="block tracking-wide text-grey-darker md:text-xl text-base semi-bold mb-3"
              htmlFor="grid-area"
            >
              {t("parameters.semiDetached.label")}{" "}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl  outline-none"
              id="grid-area"
              value={semiDetachedHouse}
              disabled={status !== "Edit"}
              onChange={(e) => setSemiDetachedHouse(e.target.value)}
            >
              <option value="" disabled>
                {t("parameters.semiDetached.placeholder")}
              </option>
              {valuations.map((value) => (
                <option key={value.id} value={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 px-3 mb-6">
            <label
              className="block tracking-wide text-grey-darker md:text-xl text-base semi-bold mb-3"
              htmlFor="grid-area"
            >
              {t("parameters.detached.label")}{" "}
            </label>
            <select
              className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl  outline-none"
              id="grid-area"
              value={detachedHouse}
              disabled={status !== "Edit"}
              onChange={(e) => setDetachedHouse(e.target.value)}
            >
              <option value="" disabled>
                {t("parameters.detached.placeholder")}
              </option>
              {valuations.map((value) => (
                <option key={value.id} value={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          {addressDetails.map((detail, index) => (
            <div key={index} className="md:w-1/2 px-3 mb-6 mt-3">
              <label
                className="block tracking-wide text-grey-darker md:text-xl text-base font-semibold mb-3"
                htmlFor={`grid-area-name-${index}`}
              >
                Area {index + 1}
              </label>

              <select
                className=" border border-gray-300 text-gray-900 md:text-sm text-xs w-full p-3 rounded-2xl outline-none"
                id="grid-area"
                placeholder="Area Name"
                value={detail.addressName}
                disabled={status !== "Edit"}
                onChange={(e) => handleAddressNameChange(index, e.target.value)}
              >
                <option value="" disabled>
                  {t("area.placeholder")}
                </option>
                {areaOptions.map((areaOption) => (
                  <option key={areaOption.id} value={areaOption.value}>
                    {areaOption.value}
                  </option>
                ))}
              </select>

              {/* Area Value */}
              <label
                className="block tracking-wide text-grey-darker md:text-xl text-base font-semibold mb-3 mt-3"
                htmlFor={`grid-area-value-${index}`}
              ></label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 outline-none rounded-2xl py-3 px-4 mt-4 pr-10" // Added pr-10 for padding on the right side
                id="grid-last-name"
                type="number"
                placeholder={t("parameters.livingArea.price")}
                value={detail.addressValue}
                readOnly={status !== "Edit"}
                onChange={(e) =>
                  handleAddressValueChange(index, e.target.value)
                }
              />
            </div>
          ))}

          <div className="md:w-1/2 flex justify-center">
            {status === "Edit" && (
              <button
                onClick={addAddress}
                type="button"
                className="justify-center mx-auto shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                + {t("button.add")}
              </button>
            )}
          </div>
          <div className="mt-8 md:w-1/2 w-2/3 flex justify-start ml-auto ">
            {status === "Edit" ? (
              <button
                onClick={() => handleCancel()}
                type="button" // Add type="button" to specify it as a button
                className="w-[45%] shadow-xl md:py-2.5  py-1 px-2 text-sm font-semibold rounded-2xl text-black border border-[#000] focus:outline-none mr-2"
              >
                {t("button.cancel")}
              </button>
            ) : null}

            {status !== "Edit" ? null : ( // </button> //   Update // > //   className="w-[45%] shadow-xl md:py-2.5  py-1 px-2 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none" //   onClick={handleEdit} //   type="button" // <button
              <button
                type="submit"
                className="w-[45%] shadow-xl md:py-2.5  py-1 px-2 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                {t("button.submit")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StandardParameters;
