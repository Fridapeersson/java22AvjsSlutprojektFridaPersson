import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../css/App.css";
import Nav from "./Nav";
import Cart from "./Cart";
import Shop from "./Shop";
import { ShopContextProvider } from "../context/ShopContext";

export default function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/java22AvjsSlutprojektFridaPersson/" element={<Shop />} />
            <Route path="/java22AvjsSlutprojektFridaPersson/cart" element={<Cart />} />
          </Routes>
        </Router>
      </ShopContextProvider>
      <footer className="footer">
        <div>
          <p>987 Main Street</p>
          <p>Texas, USA 548</p>
        </div>
      </footer>
    </div>
  );
}
