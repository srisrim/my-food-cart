import { Link } from "react-router";
import { useState } from "react";
import { LOGO_URL } from "../constants/common";
// import { useSelector } from "react-redux";
const Header = () => {
  
  const [btnName, setBtnName] = useState("Login")
  //subscribing to the store using selector
  // const cartItems = useSelector((store) => store.cart.items)
  // console.log(cartItems);
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
          {/* <li className="p-2 bg-green-500 rounded-lg">
            <Link to="/cart">Cart({cartItems.length} items)</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;