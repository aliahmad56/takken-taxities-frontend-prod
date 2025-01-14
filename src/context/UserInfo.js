import React, {createContext, useState} from "react";

// Create the context
export const UserInfoContext = createContext();

// Create the context provider

export const UserInfoProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState();

  return (
    <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserInfoContext.Provider>
  );
};
