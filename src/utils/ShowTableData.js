import React, { useContext, useState } from "react";
import { TaxContext } from "../context/taxContext";

export const ShowTableData = ({ data }) => {
  const { taxationValue, setTaxationValue } = useContext(TaxContext);

  const handleTaxationChange = (event) => {
    const value = event.target.value;
    setTaxationValue(value);
    // updateTax(value);
  };

  return (
    <>
      {data?.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor:
              item.label === "Valuation Object"
                ? "#F6F6F6"
                : index % 2 === 0
                ? "#EDEDED"
                : "#F6F6F6",
          }}
          className="flex justify-between md:px-20 xs:px-8 py-3 items-center text-black text-center font-sans lg:text-xl md:text-lg xs:text-base font-normal"
        >
          <h1>{item.label}</h1>
          {item.label === "Taxation Value" ? (
            <div>
              <input
                type="number"
                value={taxationValue}
                onChange={(event) => setTaxationValue(event.target.value)}
                className="mx-2 w-20" // No margin added
              />
              {/* <button
                onClick={handleTaxationChange}
                className="bg-[#FF3131] text-white px-2 py-1 rounded text-sm"
              >
                {" "}
                Add Tax
              </button> */}
            </div>
          ) : (
            <h1>{item.value}</h1>
          )}
        </div>
      ))}
    </>
  );
};
