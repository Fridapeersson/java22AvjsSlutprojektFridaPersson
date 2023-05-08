import { ShoppingCart } from "phosphor-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "../css/nav.css";

export default function Nav() {
  const { cartItems } = useContext(ShopContext);
  const cartItemCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <nav className="nav">
      <div className="webshopLink">
        <Link to="/java22AvjsSlutprojektFridaPersson/" className="links">
          Webshop
        </Link>
      </div>
      <div className="cartLink">
        <Link to="/java22AvjsSlutprojektFridaPersson/cart" className="links">
          <ShoppingCart size={30} />
          {cartItemCount > 0 && (
            <span className="cartItemCount">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
