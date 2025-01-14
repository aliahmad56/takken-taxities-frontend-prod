import React from "react";
import { HouseIcon } from "../assets/images/proprtyCardAssets";
import { useTranslation } from "react-i18next";
const colorArray = ["#FFC32B", "#4CAF50", "#2196F3", "#FF5733", "#9B59B6"];

function PropertyCardHeadings() {
  const { t } = useTranslation();
  return (
    <div className="mt-[90px] md:px-4  max-w-[200px] px-2 mr-10">
      <div className="flex justify-center">
        <HouseIcon color={colorArray[2]} />
      </div>
      <h1 className=" text-[#459EFF]   font-open-sans md:text-18 text-[14px] font-semibold mt-4">
        {t("Comparison.items.PropertyName")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.PropertyType")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.ContYear")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.Area")}
      </h1>

      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.Sqft")}{" "}
      </h1>

      <h1 className=" text-[#459EFF]   font-open-sans md:text-18 text-[14px] font-semibold mt-5">
        {t("Comparison.items.Address")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.Location")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.FloorNumber")}
      </h1>

      <h1 className=" text-[#459EFF]   font-open-sans md:text-18 text-[14px] font-semibold mt-5">
        {t("Comparison.items.ReferenceObject")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.SellingPrice")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.TypeOfProperty")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.SellingDate")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.AcquireMetersLivingArea")}{" "}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.PlotSize")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.ContYear")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.PropertyAddress")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.Strengths")}
      </h1>
      <h1 className="text-[#8792A4] font-open-sans md:text-16 text-[12px] font-normal mt-3">
        {t("Comparison.items.Weakness")}
      </h1>
    </div>
  );
}

export default PropertyCardHeadings;
