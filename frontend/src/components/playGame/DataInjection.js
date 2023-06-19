import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";
import { useFetch } from "../../hook/useFetch";

const DataInjection = ({ children, url }) => {
  const data = useFetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <>
      {React.Children.map(children, (child) => (
        <>{React.cloneElement(child, { data: data })}</>
      ))}
    </>
  );
};

DataInjection.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
};

export default DataInjection;
