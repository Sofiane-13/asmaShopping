import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar style={{ display: "flex", justifyContent: "center" }} bg="light">
      <NavLink className="nav-item nav-link text-dark" to="/">
        Receipts
      </NavLink>
      <NavLink className="nav-item nav-link text-dark" to="/shoppingList">
        Shopping
      </NavLink>
      <NavLink className="nav-item nav-link text-dark" to="/ingredients">
        Ingredients
      </NavLink>
    </Navbar>
  );
};
export default NavBar;
