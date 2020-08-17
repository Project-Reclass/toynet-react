import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  return (
    <header className="navHeader">
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img src={logo} className="logo" alt="Reclass logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            <Button className="btn-reclass" variant="link">Sign In</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
