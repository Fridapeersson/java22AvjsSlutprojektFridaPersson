import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import "../css/cartItem.css";

export const CartItem = (props) => {
    const {id, name, price, img, quantity} = props.data;
    //"importerar" från shopcontext
    const { cartItems, addToCart, removeFromCart  } = useContext(ShopContext);
    return (
    <div className="cartItem">
        <img src={img} alt={name} />
        <h2>{name}</h2>
        <p>$ {price}</p>
        <p>Quantity: {quantity}</p>
        <div className="countHandler">
            <button onClick={() => removeFromCart(id)}> - </button>
            <input className="numberOfItems" value={cartItems[id]} />
            <button onClick={() => addToCart(id)}> + </button>
        </div>
    </div>
  );
}
