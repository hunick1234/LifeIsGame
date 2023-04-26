import { Outlet } from "react-router-dom";
import Header2 from "./header2";
import Footer from "./footer";

const BackStageLayout = () => {
  return (
    <div>
      <Header2 />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BackStageLayout;
