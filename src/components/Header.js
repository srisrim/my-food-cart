import { Link } from "react-router";
import { useState, useContext } from "react";
import { LOGO_URL } from "../constants/common";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login")
  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items)
  const {isLoggedIn} = useContext(UserContext);
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <span> {isLoggedIn}</span>
          </li>
          <li className="p-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
            <Link to="/cart">Cart({cartItems.length} items)</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;