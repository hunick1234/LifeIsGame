import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import '../../assets/css/header.css'
function Header(prop) {
  return (
    <>
      <Navbar  bg="light" variant="light">
        <Container className="menu">
          <Navbar.Brand href="#home">LIG</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">LogIn</Nav.Link>
            <Nav.Link href="/singup">Singup</Nav.Link>
            <Nav.Link href="/creatGame">creatGame</Nav.Link>
            <Nav.Link href="/gameList">gameList</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
