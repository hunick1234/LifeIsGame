import React from "react";

const Click = ({ children }) => {
  const click = () => {
    console.log("click");
  };
  return <div onClick={click}>{children}</div>;
};

export default Click;
