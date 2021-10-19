import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import { Link } from "react-router-dom";

function Header() {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="brand">
        <h1>
          <Link to="/">Tienda Chayito</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login | Register</Link>
        </li>
        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          {" "}
          <img src={Cart} alt="" width="30" />
        </Link>
      </div>
    </header>
  );
}
export default Header;
