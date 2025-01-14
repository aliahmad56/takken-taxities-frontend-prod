import React from "react";

function PageHeading({title}) {
  return (
    <div className="text-center lg:text-4xl md:text-3xl xs:text-2xl font-bold font-open-sans text-gray-800 mt-6 md:w-5/6 xs:w-full">
      {title}
    </div>
  );
}

export default PageHeading;
