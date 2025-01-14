import React, { useContext } from "react";
import {
  HouseIcon,
  BedIcon,
  LandIcon,
  LocationIcon,
  CalenderIcon,
  StrenghtIcon,
  WeaknessIcon,
  DeleteIcon,
  EditIcon,
} from "../assets/images/proprtyCardAssets";
import PageHeading from "../utils/PageHeading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DeleteReferenceObject } from "../apis/referneceObjects/deleteReferenceObject";
import { toast } from "react-toastify";

const PropertyCard = ({ data, index, color, valuationData }) => {
  const { t } = useTranslation();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const { weaknessPercent } = data?.Weaknesses[0] || "-";
  const { strengthPercent } = data?.Strengths[0] || "-";

  const { isLoggedIn } = useContext(AuthContext);

  const auth = isLoggedIn();
  const deleteReferenceObject = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!userConfirmed) {
      return;
    }

    try {
      const response = await DeleteReferenceObject(
        id,
        auth.userData.token,
        logOut
      );

      if (response && response.data.status) {
        toast.success("Deleted successfully");
        window.location.reload();

        console.log(data);
      } else {
        // Display error toast with the specific message from the server
        toast.error(response.data.message);
      }
    } catch (error) {
      // Display error toast with a generic message
      toast.error(t("message.serverError"));
      console.error(error);
    }
  };
  return (
    <>
      <div className="h-auto min-w-xs bg-white shadow-md px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mt-8 border rounded-lg">
        <div className="flex justify-center">
          <HouseIcon color={color} />
        </div>
        <h1 className="text-center text-[#202020] font-open-sans md:text-18 text-[14px] font-semibold mt-4">
          {t("referenceTitle")} {index}
        </h1>
        <div className="flex flex-row items-center mt-3">
          <BedIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-2">
            {valuationData?.propertyType}
          </h1>
        </div>
        <h1 className="text-start text-[#202020] font-open-sans md:text-16 text-[12px] font-normal mt-3">
          {valuationData?.constructionYear}
        </h1>
        <h1 className="text-start text-[#202020] font-open-sans md:text-16 text-[12px] font-normal mt-3">
          {valuationData?.area}
        </h1>
        <div className="flex flex-row items-center mt-3">
          <LandIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-2">
            {valuationData?.livingArea} Sqft
          </h1>
        </div>
        <div className="flex flex-row items-center mt-12">
          <LocationIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-3 ">
            {valuationData?.address && valuationData.address.length > 20
              ? `${valuationData.address.substring(0, 30)}...`
              : valuationData?.address}
          </h1>
        </div>
        <h1 className="text-start text-[#202020] font-open-sans md:text-16 text-[12px] font-normal mt-4">
          {data?.floors ? data?.floors : "1"}
        </h1>
        <h1 className="text-start text-[#202020] font-open-sans md:text-16 text-[12px] font-normal xs:mt-10 md:mt-12 lg:mt-12 ">
          ${data?.sellingPrice}
        </h1>
        <div className="flex flex-row items-center mt-3">
          <BedIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-2">
            {data?.propertyType}
          </h1>
        </div>
        <div className="flex flex-row items-center mt-3">
          <CalenderIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-2">
            {data?.sellingDate}
          </h1>
        </div>
        <div className="flex flex-row items-center mt-3">
          <LandIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-2">
            {data?.livingArea} Sqft
          </h1>
        </div>
        <div className="flex flex-row items-center mt-3">
          <LandIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-2">
            {data?.plotSize} Sqft
          </h1>
        </div>
        <h1 className="text-start text-[#202020] font-open-sans md:text-16 text-[12px] font-normal mt-3">
          {data?.constructionYear}
        </h1>
        <div className="flex flex-row items-center mt-3">
          <LocationIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-3 ">
            {/* {data?.address ? data?.address : "Not Available"} */}
            {data?.address && data?.address.length > 20
              ? `${data?.address.substring(0, 30)}...`
              : data?.address}
          </h1>
        </div>
        <div className="flex flex-row items-center mt-3">
          <StrenghtIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-3 ">
            {strengthPercent}%
          </h1>
        </div>
        <div className="flex flex-row items-center mt-3">
          <WeaknessIcon />
          <h1 className="text-[#202020] font-open-sans md:text-16 text-[12px] font-normal ml-3 ">
            {weaknessPercent}%
          </h1>
        </div>

        <div className="flex flex-row items-center justify-center mt-3 gap-6">
          <div
            className="h-6 w-6 cursor-pointer"
            onClick={() =>
              navigate("/update-referenceObject", {
                state: {
                  data,
                  valuationData,
                  status: "Update",
                  id: data?.id,
                },
              })
            }
          >
            <EditIcon size={30} />
          </div>
          <div
            className="h-6 w-6 cursor-pointer"
            onClick={() => deleteReferenceObject(data?.id)}
          >
            <DeleteIcon size={30} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
