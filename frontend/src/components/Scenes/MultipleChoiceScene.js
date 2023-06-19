import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MultipleChoiceScene = ({ onClose, onAdd, info }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlAdd=()=>{

  }

  return (
    <>
      <Container>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="age"
          label="Age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </Container>
      <Button autoFocus color="inherit" onClick={"onSave"}>
        save
      </Button>
    </>
  );
};

MultipleChoiceScene.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
};

export default MultipleChoiceScene;
