import React, { useState, useEffect } from "react";
import Card from "../Home/Card";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/getProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="  items-center w-full px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl ">
      <h1 className="text-3xl mb-6 text-center">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
        {products.map((product, index) => (
          <li key={index} className=" rounded">
            <Card
              imgSrc={product.ipfsHash}
              imgAlt={product.name}
              title={product.name}
              description={product.description}
              price={product.price}
              productId={product.id} // <-- Make sure you have this
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetProduct;
