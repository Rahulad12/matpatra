import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../sclices/citizenAPIsclice";
import { logout } from "../sclices/authSlice";

import "../style/header.css";

const Header = () => {
  const { citizenInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({ _id: citizenInfo._id });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      bg="secondary"
      variant="dark"
      className="nav-bar nav-menu-text"
      expand="lg"
      collapseOnSelect
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-light">
          मत पत्र
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="text-light">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/candidates" className="text-light">
              Candidates
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/auth?redirect=/vote"
              className="text-light"
            >
              Vote
            </Nav.Link>

            {citizenInfo ? (
              <NavDropdown title={citizenInfo.name} id="basic-nav-dropdown" variant="dark" > 
                <NavDropdown.Item as={NavLink} to="/profile" >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/auth?redirect=/vote"
                className="text-light"
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
