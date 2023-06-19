import React, { createContext, useState } from "react";

export const SceneDataContext = createContext({});
const UserInfoProvider = ({ children }) => {
  const [levelID, setLevelID] = useState();
  return (
    <SceneDataContext.Provider value={{ levelID, setLevelID}}>
      {children}
    </SceneDataContext.Provider>
  );
};

export default UserInfoProvider;
