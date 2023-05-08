export default async function getFirebase() {
    const response = await fetch(
      "https://slutprojektavjs-b601b-default-rtdb.europe-west1.firebasedatabase.app/Products.json"
    );
    const data = await response.json();
    // gör om objektet till array och returnerar arrayen
    const productsArray = Object.keys(data).map((key) => ({
      id: key,
      img: data[key].img,
      name: data[key].name,
      price: data[key].price,
      quantity: data[key].quantity, 
      ...data[key],
    }));
    return productsArray;
  }

  // uppdaterar en produkt från firebase och returnerar den uppdaterade datan
  export async function updateFirebase(id, img, name, price, quantity) {
    const url = `https://slutprojektavjs-b601b-default-rtdb.europe-west1.firebasedatabase.app/Products/${id}.json`;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ id, img, name, price, quantity }),
    });
    const data = await response.json();
    if (data === null) {
      throw new Error("No data found");
    }
    const updatedData = {
      id,
      img,
      name,
      price,
      quantity,
      ...data,
    };
    return updatedData;
  }