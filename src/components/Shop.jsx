import React, { useState, useEffect } from "react";
import getFirebase from "./Firebase";
import Product from "./Product";
import "../css/shop.css"

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("Alphabetical Order"); //alfabetisk sortering by default
    const [searchValue, setSearchValue] = useState("");

    // hämtar produkter från firebase när komponenten mountas
    useEffect(() => {
        async function fetchItems() {
          const data = await getFirebase();
          setProducts(data);
        }
        fetchItems();
      }, []);

      // funktion som kallas när användaren ändrar sortering
      function handleSortOrderChange(event) {
        setSortOrder(event.target.value);
    }
    // sorterar produkterna baserat på vald sorteringsmetod
    function sortProducts(products, sortOrder) {
        if (sortOrder === "Alphabetical Order") {
            return products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "Highest price first") {
            return products.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "Lowest price first") {
            return products.sort((a, b) => a.price - b.price);
        } else if(sortOrder === "Quantity high to low") {
            return products.sort((a, b) => b.quantity - a.quantity);
        } else if(sortOrder === "Quantity low to high") {
            return products.sort((a, b) => a.quantity - b.quantity);
        } else {
            return products;
        }
    }
    // sorterar produkterna och filtrearar baserat på sökning
    const sortedProducts = sortProducts(products, sortOrder);
    const filteredProducts = sortedProducts.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));

    return(
        <article className="shop">
            <div className="shopTitle">
                <h2 className="header">Products</h2>
                <div className="sortOrder">
                    <label>Sort by:</label>
                    <select className="sortAlternative" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="Alphabetical Order">Alphabetical Order</option>
                        <option value="Highest price first">Price (High to low)</option>
                        <option value="Lowest price first">Price (Low to high)</option>
                        <option value="Quantity high to low">Quantity (high to low)</option>
                        <option value="Quantity low to high">Quantity (low to high)</option>
                    </select>
                    <div className="searchBar">
                        <input type="text" placeholder="Search product" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="products">
                {/* hittas inget som matchar sökningen */}
                {filteredProducts.length === 0 ? (
                    <p>No product found..</p>
                    ) : (
                    <div className="productItems">
                        {filteredProducts.map((product) => (
                            <Product data={product} key={product.id} />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}