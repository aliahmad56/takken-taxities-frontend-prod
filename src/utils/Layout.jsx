// Layout.js
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const Layout = ({children}) => {
  return (
    <div className="bg-[#FAFBFF]">
      <Header />
      <div className="flex space-x-2 md:space-x-8">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
