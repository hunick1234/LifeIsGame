import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { DELET_SCENE, GET_SCENES, POST_SCENE } from "../../API";

const SenceWrapper = ({ children, levelID }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const gatScenes = async () => {
        let rep = await fetch(GET_SCENES(levelID), {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await rep.json();
        setItems(data.message);
      };
      gatScenes();
    } catch (error) {}
  }, []);

  const addItem = (item) => {
    try {
      const creatScene = async () => {
        const rep = await fetch(POST_SCENE(item.id, levelID), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const data = await rep.json();

        if (data.message !== null) {
        }
        console.log(data, "mnessage is null");
      };
      creatScene();
    } catch (error) {
      console.error("Error:", error);
      return <div>error</div>;
    }
    setItems([...items, item]); 
  };

  const deleteItem = (id) => {
    const reSence = items.filter((item) => id !== item.id);
    try {
      const deletScene = async () => {
        fetch(DELET_SCENE(id, levelID), {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
      };

      deletScene();
    } catch (error) {
      console.error("Error:", error);
    }
    setItems(reSence);
  };

  const deletAllItems = () => {};

  return (
    <Grid container spacing={2}>
      {/* Render children */}
      {React.Children.map(children, (child) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {React.cloneElement(child, { items, addItem, deleteItem })}
        </Grid>
      ))}
    </Grid>
  );
};

export default SenceWrapper;
