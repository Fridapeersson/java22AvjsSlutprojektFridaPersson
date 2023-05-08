import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../css/product.css";

export default function Product(props) {
    const {id, name, price, img, quantity} = props.data;

    const {addToCart, cartItems} = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
    // renderar och disablear knappen om quantity är 0 och ändrar isåfall texten till out of stock
    return(
        <div className="productContainer">
            <article className="products">
                <h2>{name}</h2>
                <img src={img} alt={name} className="img" />
            
            <div>
                <p className="price">${price}</p>
                <p>Quantity: {quantity}</p>
            </div>
            <button className="addToCartButton" onClick={() => addToCart(id)} disabled={quantity === 0}>
                {quantity === 0 ? "Out of stock" : `Add To Cart${cartItemAmount > 0 ? ` (${cartItemAmount})` : ""}`}
            </button>
            </article>
        </div>
        
    );
};