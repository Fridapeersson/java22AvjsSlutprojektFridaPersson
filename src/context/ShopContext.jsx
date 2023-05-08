import React, { createContext, useState, useEffect } from "react";
import getFirebase from "../components/Firebase";

// Skapar en context för att dela data mellan komponenterna
export const ShopContext = createContext(null);

// hämtar id värdena från produkterna i firebase och sätter de till 0
const getDefaultCart = async () => {
  const productsArray = await getFirebase();
  let cart = {};
  for (let i = 0; i < productsArray.length; i++) {
    cart[productsArray[i].id] = 0;
  }
  return cart;
};
// skapar en provider-komponent som ger tillgång till globala funktioner och variabler
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [products, setProducts] = useState([]);

  function addToCart(itemId) {
    const itemInfo = products.find((product) => product.id === itemId);
    if (itemInfo.quantity > cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }

  function removeAllFromCart() {
    setCartItems([]);
    window.location.href = "/java22AvjsSlutprojektFridaPersson/";
  }

  function updateQuantity(id, newQuantity) {
    setCartItems((prev) => ({ ...prev, [id]: newQuantity }));
  }

  // uppdatera antal produkter i varukorgen
  function updateCartItemCount(newAmount, itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  }

  function getTotalPrice() {
    let totalPrice = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === item);
        if (itemInfo) {
          totalPrice = totalPrice + cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalPrice;
  }

  // hämtar produkter och defaultvärden för varukorgen från Firebase
  useEffect(() => {
    async function fetchProducts() {
      const productsArray = await getFirebase();
      setProducts(productsArray);

      const defaultCart = await getDefaultCart();
      setCartItems(defaultCart);
    }
    fetchProducts();
  }, []);

  // sparar ner alla funktioner som ska exporteras
  const contextValue = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    updateQuantity,
    getTotalPrice,
    removeAllFromCart,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
