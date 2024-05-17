import React from "react";
import {  Nav, NavDropdown, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../sclices/citizenAPIsclice";
import { logout } from "../sclices/authSlice";

import "../style/header.css";

const Header = () => {
  const { citizenInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useLogoutMutation();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="light" variant="dark" className="nav-menu-text">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-secondary">
          मत पत्र
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" className="text-secondary">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/candidates" className="text-secondary">
            Candidates
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/auth?redirect=/vote"
            className="text-secondary"
          >
            Vote
          </Nav.Link>

          {citizenInfo ? (
            <NavDropdown title={citizenInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item  onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link
              as={NavLink}
              to="/auth?redirect=/vote"
              className="text-secondary"
              
            >
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
