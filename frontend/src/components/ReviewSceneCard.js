import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

const ReviewSceneCard = ({ id,scene, sceneType, sceneTitle,deleteScenesListener }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [reviewtext, setReviewText] = useState("null!!");
  const [title, setTitle] = useState("null!!");

  const handleShow = () => {
    setShow(true);
    // setReviewText(scene.props)
  };
  const delet = (e) => {
    e.preventDefault();
    deleteScenesListener(id)

  };

  return (
    <>
      <Card style={{ width: "10rem", height: "10rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{sceneType}</Card.Title>
          <Card.Text>{sceneTitle}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            edit
          </Button>
          <Button variant="primary" onClick={delet}>
            delet
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{scene}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewSceneCard;
