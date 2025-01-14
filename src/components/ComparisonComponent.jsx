import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import PropertyCard from "../components/propertyCard";
import { propertyData } from "../mockdata";
import { HouseIcon } from "../assets/images/proprtyCardAssets";
import PropertyCardHeadings from "../components/PropertyCardHeadings";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GetAllValuationReferenceObject } from "../apis/referneceObjects/getAllReferenceObject";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function ComparisonComponent() {
  const colorArray = ["#FFC32B", "#4CAF50", "#2196F3", "#FF5733", "#9B59B6"];
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/comparison-report", {
      state: {
        valuationId: valuationId,
        totalReferences: totalReferencesData,
      },
    });
  };
  const { t } = useTranslation();
  const location = useLocation();
  const valuationId = location?.state?.valuationId;

  const { isLoggedIn, logOut } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);

  const [valuationData, setValuationData] = useState({});
  const [referenceData, setReferenceData] = useState();

  const auth = isLoggedIn();

  const [totalReferencesData, setTotalReferencesData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllValuationReferenceObject(
          valuationId,
          auth.userData.token,
          logOut
        );

        if (response && response.data) {
          // Display success toast
          const {
            valuation: { ReferenceProperties, ...otherValues },
          } = response.data;
          setLoader(false);
          setValuationData(otherValues);

          setTotalReferencesData(ReferenceProperties.length);
          setReferenceData(ReferenceProperties);
          // console.log(response.data.valuation.ReferenceProperties);
        } else {
          // Display error toast with the specific message from the server
          toast.error(t("message.fault"));
        }
      } catch (error) {
        // Display error toast with a generic message
        toast.error(t("message.serverError"));
        console.error(error);
      }
    };

    fetchData(); // Invoke the asynchronous function immediately
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      {loader ? (
        <div className="w-full  h-screen flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <PropertyCardHeadings />

          <div className="flex-1 overflow-x-auto lg:max-w-screen-lg   xl:max-w-screen-xl  sm:max-w-screen-sm  md:max-w-screen-md mx-auto md:px-4 px-2 lg:px-6 py-8">
            <div className="flex flex-nowrap space-x-4">
              {referenceData?.map((data, index) => (
                <div
                  key={index}
                  className="lg:min-w-[300px] md :min-w-[260px] min-w-[240px]"
                >
                  <PropertyCard
                    data={data}
                    valuationData={valuationData}
                    index={index + 1}
                    color={colorArray[index]}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 lg:w-1/3 md:w-2/3 xs:w-full flex justify-end ml-auto">
              <button
                onClick={() => navigate("/")}
                type="button" // Add type="button" to specify it as a button
                className="lg:w-[200px] w-[160px]  shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-black border border-[#000] focus:outline-none mr-2"
              >
                {t("button.cancel")}
              </button>
              <button
                onClick={handleSubmit}
                className="lg:w-[200px] w-[160px] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
              >
                {t("button.generate")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ComparisonComponent;
