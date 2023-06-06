import { Outlet } from "react-router-dom";
import Navigator from "./navigator";
import Sidebar from "./sidebar";
import "d:\\LIG\\frontend\\src\\assets\\css\\userLayout.css"

const UserLayout = () => {
  return (
    <>
      <div className="leftbar">
        <Sidebar />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
