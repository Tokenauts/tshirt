import "../../app/globals.css";
import React, { useState } from "react";
import Navbar from "../../components/Home/Navbar";

const Product = ({ productData }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="flex w-full h-screen p-12 bg-gray-100">
      {/* Video Section */}
      <div className="flex-1 p-6 bg-white rounded-lg">
        <video
          className="w-full h-full"
          src={productData.ipfsHash}
          muted
          autoPlay
          loop
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Product Information Section */}
      <div className="flex-1 p-6 ml-12 bg-white rounded-lg">
        <h2 className="text-2xl font-bold">{productData.name}</h2>
        <p className="mt-4 mb-8 text-gray-700">{productData.description}</p>
        <h3 className="text-xl font-bold">Price: {productData.price} ETH</h3>

        {/* Sizes */}
        <div className="mt-6">
          <label className="block mb-2 text-lg font-medium">Size:</label>
          <div className="flex space-x-4">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 rounded-full border-2 ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-10">
          <button className="w-40 p-4 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  let productData;

  try {
    productData = await fetchProductById(id);
  } catch (error) {
    console.error(error.message);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productData,
    },
  };
}

// Replace with your data fetching logic
async function fetchProductById(id) {
  const response = await fetch(`http://localhost:3000/api/getProducts`);
  const allProducts = await response.json();

  // Find the product with the matching ID
  const product = allProducts.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }

  return product;
}

export default Product;
