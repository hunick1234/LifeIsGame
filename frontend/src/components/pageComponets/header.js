import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserPopover from "./UserPopover";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "../../assets/css/header.css";
function Header(prop) {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container className="menu">
          <Navbar.Brand>LIG</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/games">game list</Nav.Link>
          </Nav>
        </Container>
        <UserPopover isLogin={true}/>
  
      </Navbar>
    </>
  );
}

export default Header;
