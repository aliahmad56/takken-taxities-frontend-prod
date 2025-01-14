import React, { useState } from "react";
import { toast } from "react-toastify";
import PageHeading from "../utils/PageHeading";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

function ReferernceObjectForm({ index, onSubmit }) {
  const { t } = useTranslation();
  const [price, setPrice] = useState();
  const [propertyType, setPropertyType] = useState("");

  const [address, setAddress] = useState("");
  const [id, setId] = useState(Math.floor(Math.random() * 9) + 1);

  const [squareMeter, setSquareMeter] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [year, setYear] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [strengthsList, setStrengthsList] = useState([
    {
      strengthName: "",
      strengthAmount: 0,

      strengthData: "",
      strengthPercent: 0,
    },
  ]);

  const [weaknessesList, setWeaknessesList] = useState([
    {
      weaknessName: "",
      weaknessAmount: 0,
      weaknessData: "",
      weaknessPercent: 0,
    },
  ]);

  const [date, setDate] = useState();

  const handleInputChange = (index, field, value) => {
    const updatedStrengthsList = [...strengthsList];
    if (field === "strengthAmount") {
      // Parse value to an integer if the field is "strengthAmount"
      value = parseFloat(value, 10) || 0; // Ensure a valid integer, default to 0 if parsing fails
    }
    if (field === "strengthPercent") {
      // Parse value to an integer if the field is "strengthAmount"
      value = parseFloat(value, 10) || 0; // Ensure a valid integer, default to 0 if parsing fails
    }
    updatedStrengthsList[index][field] = value;
    setStrengthsList(updatedStrengthsList);
  };
  const handleInputChangeWeakness = (index, field, value) => {
    const updatedWeaknessesList = [...weaknessesList];
    if (field === "weaknessAmount") {
      // Parse value to an integer if the field is "strengthAmount"
      value = parseFloat(value, 10) || 0; // Ensure a valid integer, default to 0 if parsing fails
    }
    if (field === "weaknessPercent") {
      // Parse value to an integer if the field is "strengthAmount"
      value = parseFloat(value, 10) || 0; // Ensure a valid integer, default to 0 if parsing fails
    }

    updatedWeaknessesList[index][field] = value;

    setWeaknessesList(updatedWeaknessesList);
  };

  const handleAddStrength = () => {
    setStrengthsList([
      ...strengthsList,
      {
        strengthName: "",
        strengthAmount: 0,
        strengthData: "",
        strengthPercent: 0,
      },
    ]);
  };
  const handleAddWeakness = () => {
    setWeaknessesList([
      ...weaknessesList,
      {
        weaknessName: "",
        weaknessAmount: 0,
        weaknessData: "",
        weaknessPercent: 0,
      },
    ]);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    const hasEmptyFields = weaknessesList.some(
      (weakness) =>
        weakness.weaknessName === "" ||
        weakness.weaknessAmount === 0 ||
        weakness.weaknessData === "" ||
        weakness.weaknessPercent === 0
    );
    if (
      price === "" ||
      propertyType === "" ||
      date === "" ||
      address === "" ||
      squareMeter === "" ||
      plotSize === "" ||
      year === "" ||
      zipCode === "" ||
      houseNumber === "" ||
      city === "" ||
      strengthsList.length === 0 ||
      weaknessesList.length === 0 ||
      hasEmptyFields
    ) {
      console.log(
        price,
        propertyType,
        date,
        address,
        squareMeter,
        plotSize,
        year,
        zipCode,
        houseNumber,
        city,
        strengthsList,
        weaknessesList
      );
      toast.error(t("message.error"));
    } else {
      // toast.success(t("message.success"));
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      let referenceObject = {
        id,
        price: parseInt(price, 10),
        propertyType,
        formattedDate,
        address,
        squareMeter: parseInt(squareMeter, 10),
        plotSize: parseInt(plotSize, 10),
        year: parseInt(year, 10),
        zipCode: parseInt(zipCode, 10),
        houseNumber: parseInt(houseNumber, 10),
        city,
        strengthsList,
        weaknessesList,
      };

      setPrice("");
      setPropertyType("");
      setDate("");
      setAddress("");
      setSquareMeter("");
      setPlotSize("");
      setYear("");
      setZipCode("");
      setHouseNumber("");
      setCity("");
      setStrengthsList([
        {
          strengthName: "",
          strengthAmount: 0,
          strengthData: "",
          strengthPercent: 0,
        },
      ]);
      setWeaknessesList([
        {
          weaknessName: "",
          weaknessAmount: 0,
          weaknessData: "",
          weaknessPercent: 0,
        },
      ]);

      onSubmit(index, referenceObject);
    }

    e.preventDefault();
  };
  const handleCancel = () => {
    // Reset form fields
  };
  const squareMeterValues = [
    { id: "50sqm", value: "50" },
    { id: "75sqm", value: "75" },
    { id: "100sqm", value: "100" },
    { id: "125sqm", value: "125" },
    { id: "150sqm", value: "150" },
  ];

  const propertyTypeOptions = [
    { id: "house", value: t("typeOfProperty.options.house") },
    { id: "apartment", value: t("typeOfProperty.options.apartment") },
    { id: "condo", value: t("typeOfProperty.options.condo") },
    { id: "townhouse", value: t("typeOfProperty.options.townhouse") },
    { id: "duplex", value: t("typeOfProperty.options.duplex") },
  ];
  const roomOptions = [
    { id: "kitchen", value: t("strenghts.room.options.kitchen") },
    { id: "living_room", value: t("strenghts.room.options.livingroom") },
    { id: "bedroom", value: t("strenghts.room.options.bedroom") },
    { id: "bathroom", value: t("strenghts.room.options.bathroom") },
  ];
  return (
    <div className="md:w-5/6  w-[95%] h-auto bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mt-8 border rounded-lg">
      <form onSubmit={handleSubmit} className="md:10px xl:px-16 px-0">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => console.log("draft")}
            className=" shadow-xl md:py-2.5 md:px-4 py-1 px-1.5 text-sm font-semibold rounded-sm text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
          >
            {t("button.draft")}
          </button>
        </div>

        <div className="lg:w-[60%] w-full px-3 mb-6 md:mb-0 mt-5">
          <label
            className="block  tracking-wide text-grey-darker xl:text-2xl text-xl   semi-bold  mb-2"
            htmlFor="grid-address"
          >
            {t("sellingPrice.label")}
          </label>
          <input
            className="appearance-none block w-full  text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-3 mb-6  mt-3 outline-none"
            id="grid-address"
            type="number"
            placeholder={t("sellingPrice.placeholder")}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="lg:w-[60%] w-full px-3 mb-6 md:mb-0">
          <label
            className="block  tracking-wide text-grey-darker xl:text-2xl text-xl  semi-bold  "
            htmlFor="grid-area"
          >
            {t("typeOfProperty.label")}
          </label>
          <select
            className=" border border-gray-300 text-gray-900 text-md w-full px-4 py-3 rounded-2xl outline-none mb-4  mt-3"
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

        <div className="lg:w-[60%] w-full px-3 py-3">
          <label
            className="block  tracking-wide text-grey-darker xl:text-2xl text-xl  semi-bold     "
            htmlFor="grid-address"
          >
            {t("sellingDate.label")}
          </label>
          <Popover placement="bottom" enterDelay={0} leaveDelay={0}>
            <PopoverHandler>
              <Input
                className=" border border-gray-300 rounded-2xl outline-none py-3 px-4 mt-2 mb-2"
                onChange={() => null}
                value={date ? format(date, "PPP") : ""}
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className="border-0 "
                classNames={{
                  caption:
                    "flex justify-center py-2 mb-4 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "flex items-center",
                  nav_button:
                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                  nav_button_previous: "absolute left-1.5",
                  nav_button_next: "absolute right-1.5",
                  table: "w-full border-collapse",
                  head_row: "flex font-medium text-gray-900",
                  head_cell: "m-0.5 w-9 font-normal text-sm",
                  row: "flex w-full mt-2",
                  cell:
                    "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                  day_today: "rounded-md bg-gray-200 text-gray-900",
                  day_outside:
                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                  day_disabled: "text-gray-500 opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="lg:w-[60%] w-full px-3  py-3">
          <label
            className="block  tracking-wide text-grey-darker xl:text-2xl text-xl semi-bold "
            htmlFor="grid-last-name2"
          >
            {t("acqLivingArea.label")}
          </label>
          <select
            className="border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl outline-none mt-3 mb-2"
            id="grid-square-meter"
            value={squareMeter}
            onChange={(e) => setSquareMeter(e.target.value)}
          >
            <option value="" disabled selected>
              {t("acqLivingArea.placeholder")}
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

        <div className="lg:w-[60%] w-full px-3 md:mb-0 py-3">
          <label
            className="block  tracking-wide text-grey-darker xl:text-2xl text-xl semi-bold "
            htmlFor="grid-last-name3"
          >
            {t("plotSize.label")}
          </label>
          <select
            className=" border border-gray-300 text-gray-900 text-sm w-full p-3 rounded-2xl outline-none mb-2 mt-2"
            id="grid-square-meter3"
            value={plotSize}
            onChange={(e) => setPlotSize(e.target.value)}
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
        <div className="lg:w-[60%] w-full  px-3 py-3">
          <label
            className="block tracking-wide text-grey-darker xl:text-2xl text-xl semi-bold mb-2 "
            htmlFor="grid-last-name5"
          >
            {t("constructionYear.label")}
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 roundedfull py-2.5 px-3 rounded-2xl outline-none"
            id="grid-last-name5"
            type="number"
            placeholder={t("constructionYear.placeholder")}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <h1 className="text-1B1839 font-open-sans   px-3 lg:w-[60%] w-full xl:text-2xl text-x font-normal leading-normal tracking-wide mt-4">
          {t("propertySubTitle")}
        </h1>
        <div className="md:w-full px-2.5 mb-6 md:mb-0 mt-5">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm semi-bold  mb-2"
            htmlFor="grid-address"
          >
            {t("address.label")}
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-3 px-4 mb-3 outline-none "
            id="grid-address"
            type="text"
            placeholder={t("address.placeholder")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="-mx-3  px-3 md:flex ">
          <div className="md:w-1/2 px-3 ">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="grid-first-name"
            >
              {t("zipCode.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-4 mb-3 outline-none "
              id="grid-first-name"
              type="number"
              placeholder={t("zipCode.placeholder")}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
              htmlFor="grid-last-name4"
            >
              {t("houseNumber.label")}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 roundedfull py-2.5 px-4 rounded-2xl outline-none"
              id="grid-last-name4"
              type="number"
              placeholder={t("houseNumber.placeholder")}
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm semi-bold mb-2"
            htmlFor="grid-last-name6"
          >
            {t("city.label")}
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-4 outline-none"
            id="grid-last-name6"
            type="text"
            placeholder={t("city.placeholder")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="w-full p-8">
          {strengthsList.map((strength, index) => (
            <>
              <div key={strength.id}>
                <h1 className="text-1B1839 font-open-sans  px-3 lg:w-[60%] w-full xl:text-2xl text-x font-normal leading-normal tracking-wide mt-2 mb-2">
                  {t("strenghts.label")} {index + 1}
                </h1>
              </div>
              <div key={strength.id} className="mb-4">
                <div className="-mx-3  px-3 md:flex ">
                  <div className="md:w-1/2 px-3">
                    <select
                      id={`room-${index}`}
                      value={strength.strengthName}
                      onChange={(e) =>
                        handleInputChange(index, "strengthName", e.target.value)
                      }
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-4 mb-3 outline-none"
                    >
                      <option value="" disabled>
                        {t("strenghts.room.label")}
                      </option>
                      {roomOptions.map((roomOption) => (
                        <option key={roomOption.id} value={roomOption.value}>
                          {roomOption.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:w-1/2 px-3">
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 roundedfull py-2.5 px-4 rounded-2xl outline-none"
                      id={`amount-${index}`}
                      placeholder={t("strenghts.amount")}
                      type="number"
                      value={strength.strengthAmount}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "strengthAmount",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="-mx-3  px-3 md:flex ">
                  <div className="md:w-1/2 px-3 ">
                    <label
                      className="block  tracking-wide text-grey-darker text-sm semi-bold mb-2"
                      htmlFor={`strengths-${index}`}
                    >
                      {t("strenghts.strenghts")}
                    </label>

                    <input
                      type="text"
                      id={`strengths-${index}`}
                      value={strength.strengthData}
                      onChange={(e) =>
                        handleInputChange(index, "strengthData", e.target.value)
                      }
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-4 mb-3 outline-none "
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      className="block  tracking-wide text-grey-darker text-sm semi-bold mb-2"
                      htmlFor={`strghtPercentage-${index}`}
                    >
                      {t("strenghts.strghtPercentage")}
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 roundedfull py-2.5 px-4 rounded-2xl outline-none"
                      id={`strghtPercentage-${index}`}
                      value={strength.strengthPercent}
                      type="number"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "strengthPercent",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handleAddStrength}
              type="button"
              className="justify-center mx-auto shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              + {t("button.add")}
            </button>
          </div>
        </div>
        <div className="w-full p-8">
          {weaknessesList.map((weakness, index) => (
            <>
              <div key={weakness.id}>
                <h1 className="text-1B1839 font-open-sans px-3 lg:w-[60%] w-full xl:text-2xl text-x font-normal leading-normal tracking-wide mt-2 mb-2">
                  {t("weakness.label")} {index + 1}
                </h1>
              </div>
              <div key={weakness.id} className="mb-4">
                <div className="-mx-3 px-3 md:flex">
                  <div className="md:w-1/2 px-3">
                    <select
                      id={`room-${index}`}
                      value={weakness.weaknessName}
                      onChange={(e) =>
                        handleInputChangeWeakness(
                          index,
                          "weaknessName",
                          e.target.value
                        )
                      }
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-4 mb-3 outline-none"
                    >
                      <option value="" disabled>
                        {t("weakness.room.label")}
                      </option>
                      {roomOptions.map((roomOption) => (
                        <option key={roomOption.id} value={roomOption.value}>
                          {roomOption.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:w-1/2 px-3">
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 roundedfull py-2.5 px-4 rounded-2xl outline-none"
                      id={`amount-${index}`}
                      placeholder={t("weakness.amount")}
                      value={weakness.weaknessAmount}
                      type="number"
                      onChange={(e) =>
                        handleInputChangeWeakness(
                          index,
                          "weaknessAmount",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="-mx-3 px-3 md:flex">
                  <div className="md:w-1/2 px-3">
                    <label
                      className="block  tracking-wide text-grey-darker text-sm semi-bold mb-2"
                      htmlFor={`weaknesses-${index}`}
                    >
                      {t("weakness.weaknesses")}
                    </label>

                    <input
                      type="text"
                      id={`weaknesses-${index}`}
                      value={weakness.weaknessData}
                      onChange={(e) =>
                        handleInputChangeWeakness(
                          index,
                          "weaknessData",
                          e.target.value
                        )
                      }
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded-2xl py-2.5 px-4 mb-3 outline-none"
                    />
                  </div>

                  <div className="md:w-1/2 px-3">
                    <label
                      className="block  tracking-wide text-grey-darker text-sm semi-bold mb-2"
                      htmlFor={`wknPercentage-${index}`}
                    >
                      {t("weakness.wknPercentage")}
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 roundedfull py-2.5 px-4 rounded-2xl outline-none"
                      id={`wknPercentage-${index}`}
                      value={weakness.weaknessPercent}
                      type="number"
                      onChange={(e) =>
                        handleInputChangeWeakness(
                          index,
                          "weaknessPercent",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handleAddWeakness}
              type="button"
              className="justify-center mx-auto shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              + {t("button.add")}
            </button>
          </div>
        </div>

        <div className="mt-4 w-2/3 md:1/2 flex justify-end ml-auto">
          <button
            onClick={() => handleCancel()}
            type="button" // Add type="button" to specify it as a button
            className="w-[45%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-black border border-[#000] focus:outline-none mr-2"
          >
            {t("button.cancel")}
          </button>
          <button
            type="submit"
            className="w-[45%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
          >
            {t("button.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReferernceObjectForm;
