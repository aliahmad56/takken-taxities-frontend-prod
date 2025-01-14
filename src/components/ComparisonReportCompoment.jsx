import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PageHeading from "../utils/PageHeading";
import logo from "../assets/images/logo.svg";
import { PrinterIcon } from "../assets/images/proprtyCardAssets";
import { ShowTableData } from "../utils/ShowTableData";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReferenceValueCalculation } from "../apis/calculations/referenceValues";
import { AuthContext } from "../context/AuthContext";

import ReactToPrint from "react-to-print";
import { Loader } from "../assets/images/loader";
import { ValuationPriceCalculation } from "../apis/calculations/valuationPrice";
import { TaxContext } from "../context/taxContext";

const PrintableContent = React.forwardRef(({ children }, ref) => (
  <div
    ref={ref}
    id="comparisonReport"
    className="flex flex-col w-full h-auto mb-20 print:ml-5 mx-auto"
  >
    {children}
  </div>
));

const ComparisonReportComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const valuationId = location?.state?.valuationId;

  const { isLoggedIn } = useContext(AuthContext);
  const [referneceObjects, setReferneceObjects] = useState([]);
  const { logOut } = useContext(AuthContext);
  const [valuationData, setValuationData] = useState([
    {
      label: t("report.items.valObj"),
      value: 0,
    },
  ]);

  const [outcomeData, setOutcomeData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { taxationValue, setTaxationValue } = useContext(TaxContext);

  const handleTaxationChange = (event) => {
    setTaxationValue(parseFloat(event.target.value).toFixed(2));
  };
  const auth = isLoggedIn();
  let componentRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const [referenceResponse, valuationResponse] = await Promise.all([
          ReferenceValueCalculation(
            { valuationId: valuationId },
            auth.userData.token,
            logOut
          ),
          ValuationPriceCalculation(
            { valuationPropertyId: valuationId },
            auth.userData.token,
            logOut
          ),
        ]);

        if (
          referenceResponse &&
          referenceResponse.data &&
          valuationResponse &&
          valuationResponse.data
        ) {
          const referenceData = referenceResponse.data.refrence;
          const valuationObject = valuationResponse.data.valuationObject;

          setValuationData((prevValuationData) => [
            {
              ...prevValuationData[0],
              value: valuationObject || 0,
            },
          ]);

          const updatedReferenceData = referenceData.map((ref) => ({
            label: `${t("report.items.ref")} ${ref.referencePropertyNumber}`,
            value: ref.finalRefenceObjectValue.toFixed(2),
          }));

          const values = updatedReferenceData.map((item) =>
            parseFloat(item.value)
          );
          const highestValue = Math.max(...values).toFixed(2);
          const lowestValue = Math.min(...values).toFixed(2);
          const averageValue = (
            values.reduce((acc, val) => acc + val, 0) / values.length
          ).toFixed(2);

          setOutcomeData([
            { label: t("report.items.avg"), value: averageValue.toString() },
            {
              label: t("report.items.highest"),
              value: highestValue.toString(),
            },
            { label: t("report.items.lowest"), value: lowestValue.toString() },
            { label: t("report.items.taxation"), value: "00000000" },
          ]);

          setReferneceObjects(updatedReferenceData);
        } else {
          toast.error(t("message.fault"));
        }
      } catch (error) {
        toast.error(t("message.serverError"));
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  // const outcomeData = [
  //   { label: t("report.items.avg"), value: "409963.84" },
  //   { label: t("report.items.highest"), value: "410875" },
  //   { label: t("report.items.lowest"), value: "407770.63" },
  //   { label: t("report.items.taxation"), value: "00000000" },
  // ];
  let ReferenceData = [];
  const heading = t("reportTitle");
  // const handleUpdateTax = (value) => {
  //   // Your logic to update tax value
  //   console.log(value);
  //   // setTaxValue(value);
  // };
  const totalValue =
    parseFloat(valuationData[0].value) + parseFloat(taxationValue || 0);

  return (
    <div className="flex flex-col w-full h-auto mb-20">
      {loader ? (
        // Show the loader while loading is true
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
          <PageHeading title={heading} />
          <PrintableContent ref={(el) => (componentRef = el)}>
            <div className="md:w-5/6 w-[95%] h-auto bg-white shadow-md  mb-4 flex flex-col my-2 mt-8 border rounded-xl">
              <div className="bg-gray-800 inline-flex justify-center lg:text-xl md:text-lg xs:text-base  py-3 items-center text-white text-center font-sans  rounded-t-xl font-normal">
                <h1>{t("websiteHeading")}</h1>
              </div>

              <div className="flex justify-between items-center">
                <div className=" py-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="md:w-[120px] md:h-auto xs:w-[80px] xs:h-auto md:pl-6"
                  />
                </div>

                <div className="lg:text-3xl md:text-xl xs:text-base font-bold font-open-sans text-gray-800 text-center">
                  {t("reportTitle")}
                </div>

                <ReactToPrint
                  trigger={() => (
                    <div className="bg-gray-800 rounded-l-xl md:w-[64px] xs:w-10 flex items-center justify-end px-2 cursor-pointer">
                      <PrinterIcon />
                    </div>
                  )}
                  content={() => componentRef}
                />
              </div>

              <div className="bg-[#FF3131] inline-flex justify-center  py-3 items-center text-white text-center font-sans lg:text-xl md:text-lg xs:text-base  font-normal">
                <h1>{t("report.items.heading1")}</h1>
              </div>
              <div className="bg-[#404040] inline-flex justify-between md:px-20 xs:px-8   py-3 lg:text-lg text-base  items-center text-white text-center font-sans  font-normal">
                <h1>{t("report.items.values")}</h1>
                <h1>{t("report.items.price")} ($)</h1>
              </div>
              <ShowTableData data={valuationData} />
              <ShowTableData data={referneceObjects} />
              <div className="bg-white inline-flex justify-center  py-6 items-center text-white text-center font-sans text-xl  rounded-t-xl font-normal" />
              <div className="bg-[#FF3131] inline-flex justify-center  py-3 items-center text-white text-center font-sans lg:text-lg text-base  font-normal">
                <h1>{t("report.items.heading2")}</h1>
              </div>
              <div className="bg-[#404040] inline-flex justify-between md:px-20 xs:px-8  py-3 items-center text-white text-center font-sans lg:text-lg text-base  font-normal">
                <h1>{t("report.items.values")}</h1>
                <h1>{t("report.items.price")} (€)</h1>
              </div>

              <ShowTableData data={outcomeData} />
            </div>
            <div className="bg-[#404040] md:w-5/6 w-[90%] h-auto mt-10 inline-flex justify-center px-20 rounded-xl py-3 items-center text-white text-center font-sans  lg:text-xl md:text-lg xs:text-base  font-normal gap-4">
              <h1>{t("report.items.valObj")}</h1>
              <h1>{totalValue}</h1>
            </div>
            <div className="md:w-5/6 w-[90%] ">
              <h1 className="text-start text-xl font-bold font-open-sans text-gray-800 mt-6">
                {t("report.items.des")}
              </h1>
              <div className="bg-[#F1F1F1] w-full mt-10 inline-flex justify-center  rounded-xl items-center text-black text-center">
                <textarea className="w-full h-64 border border-gray-300 rounded-md resize-none   p-4 bg-[#F1F1F1]" />
              </div>
            </div>{" "}
          </PrintableContent>
          <div className="mt-4 md:w-5/6 w-[90%] md:gap-6  xs:gap-2 flex  items-center justify-center">
            <button
              onClick={() => navigate("/parameter")}
              type="button" // Add type="button" to specify it as a button
              className="shadow-xl md:py-2.5  py-2 md:px-8 px-2 md:text-sm  xs:text-xs font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.updateParameters")}
            </button>
            <button
              onClick={() => navigate("/")}
              type="button" // Add type="button" to specify it as a button
              className="shadow-xl md:py-2.5  py-2 md:px-8 px-2 md:text-sm  xs:text-xs font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.changeReference")}
            </button>
            <button
              onClick={() =>
                navigate("/reference", {
                  state: { valuationId: location.state.valuationId },
                })
              }
              className="shadow-xl md:py-2.5  py-2 md:px-8 px-2 md:text-sm  xs:text-xs font-semibold rounded-2xl text-white bg-[#FF3131] hover:bg-[#FF3150] focus:outline-none"
            >
              {t("button.addReference")}
            </button>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default ComparisonReportComponent;
