import React from "react";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const delet = () => {
  const delet = () => {
    console.log('click');
  };
  return (

      <p onClick={delet}>
        <MdDelete />
      </p>

  );
};

export default delet;
