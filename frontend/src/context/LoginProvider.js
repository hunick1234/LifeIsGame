import React, { createContext, useState } from "react";

export const UserInfoContext = createContext({});
const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ info: {} });
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
