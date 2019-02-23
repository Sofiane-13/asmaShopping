import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to="/">
        Receipts
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavLink className="nav-item nav-link text-dark" to="/shoppingList">
          Shopping-List
        </NavLink>
        <NavLink className="nav-item nav-link text-dark" to="/ingredients">
          Ingredients
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
