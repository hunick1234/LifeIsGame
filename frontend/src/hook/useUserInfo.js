import { useContext } from "react";
import { UserInfoContext } from "../context/LoginProvider";

const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export default useUserInfo;
