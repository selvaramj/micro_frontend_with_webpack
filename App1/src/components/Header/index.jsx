import React from "react";
import "./Header.css";
import logo from "../../../public/AtomLogo.png";
import { Link } from "react-router";

const Header = (props) => {
  const navLinks = [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "About us", to: "/about-us" },
  ];
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logo} alt="atom webpage logo" />
        </Link>
        <ul>
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
