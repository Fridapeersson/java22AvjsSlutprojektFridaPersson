import React from "react";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { CartItem } from "./CartItem";
import getFirebase, { updateFirebase } from "./Firebase";
import "../css/cart.css";

export default function Cart() {
  const { cartItems, products, getTotalPrice, removeAllFromCart } =
    useContext(ShopContext);

  const totalPrice = getTotalPrice();

  async function checkout() {
    const cart = { ...cartItems };
    const products = await getFirebase();

    // uppdaterar antal produkter i firebase
    for (const productId in cart) {
      const product = products.find(
        (p) => p.id.toString() === productId.toString()
      );
      if (product) {
        const newQuantity = product.quantity - cart[productId];
        await updateFirebase(
          productId,
          product.img,
          product.name,
          product.price,
          newQuantity
        );
      }
    }
    alert("Thank you for your purchase!");
    removeAllFromCart();
    window.location.href = "/java22AvjsSlutprojektFridaPersson/";
  }

  return (
    <div>
      <h2 className="cartHeader">Cart:</h2>
      <div className="cartProducts">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      <div className="totalContainer">
        <section className="total">
          <p className="totalPrice">Total: ${totalPrice}</p>
          <button className="emptyCart" onClick={removeAllFromCart}>
            Empty Cart
          </button>

          <button className="checkout" onClick={checkout}>
            Checkout
          </button>
        </section>
      </div>
    </div>
  );
}
