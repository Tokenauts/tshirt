"use client";
import React, { useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";
import ABI from "../utils/abi.json";
import { useAccount } from "wagmi";

const Admin = () => {
  const pinataApiKey = "108cc1670185cc3651d6";
  const pinataSecretApiKey =
    "10ba300f81944bcec510d3bd8380de5c7ef04a02c29dcfba097a38e495c1aa41";
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const contractaddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { address, isConnecting, isDisconnected } = useAccount();

  // State for adding products
  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      price: "",
      video: null,
      category: "",
      collection: "",
      ipfsLink: null,
    },
  ]);

  const uploadToIPFS = async (file) => {
    let data = new FormData();
    data.append("file", file);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
      body: data,
    });

    if (res.ok) {
      const result = await res.json();
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    } else {
      console.error("Failed to upload to IPFS");
      return null;
    }
  };

  const handleVideoChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newProducts = [...products];
      newProducts[index].video = file;
      newProducts[index].ipfsLink = null; // Reset IPFS link when a new video is selected
      setProducts(newProducts);
    }
  };

  const handleUploadToIPFS = async (index) => {
    if (!products[index].video) {
      console.error("Please select a video first.");
      return;
    }

    const ipfsHashLink = await uploadToIPFS(products[index].video);
    if (ipfsHashLink) {
      const newProducts = [...products];
      newProducts[index].ipfsLink = ipfsHashLink;
      setProducts(newProducts);
    }
  };

  const { write: addProductsWrite } = useContractWrite({
    address: contractaddress,
    abi: ABI,
    functionName: "addProducts",
  });

  const handleAddProducts = async () => {
    // Extract relevant fields from products to submit to the smart contract
    const formattedProducts = products.map((product) => ({
      id: 0, // This might need to be adjusted if the smart contract expects unique IDs
      name: product.name,
      description: product.description,
      price: parseInt(product.price, 10), // Convert price to number
      ipfsHash: product.ipfsLink,
      category: product.category,
      collectionId: 0, // Adjust if you have collection IDs to work with
    }));

    try {
      await addProductsWrite({ args: [formattedProducts] });
      console.log("Products added successfully!");

      // Reset products state after submitting to smart contract
      // setProducts([
      //   {
      //     name: "",
      //     description: "",
      //     price: "",
      //     video: null,
      //     category: "",
      //     collection: "",
      //     ipfsLink: null,
      //   },
      // ]);
    } catch (error) {
      console.error("Error adding products:", error);
    }
  };

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>

      {/* Section for adding products */}
      <section className="mb-10 p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">ss</h2>
        {products.map((product, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-medium mb-4">
              Product {index + 1} Details
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => {
                    const newProducts = [...products];
                    newProducts[index].name = e.target.value;
                    setProducts(newProducts);
                  }}
                  placeholder="Product Name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={product.description}
                  onChange={(e) => {
                    const newProducts = [...products];
                    newProducts[index].description = e.target.value;
                    setProducts(newProducts);
                  }}
                  placeholder="Product Description"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => {
                    const newProducts = [...products];
                    newProducts[index].price = e.target.value;
                    setProducts(newProducts);
                  }}
                  placeholder="Product Price"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => {
                    const newProducts = [...products];
                    newProducts[index].category = e.target.value;
                    setProducts(newProducts);
                  }}
                  placeholder="Product Category"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Collection
                </label>
                <input
                  type="text"
                  value={product.collection}
                  onChange={(e) => {
                    const newProducts = [...products];
                    newProducts[index].collection = e.target.value;
                    setProducts(newProducts);
                  }}
                  placeholder="Product Collection"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="col-span-2 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">
                  Upload Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoChange(e, index)}
                  className="mt-1 p-2 border rounded-md mr-2"
                />
                <button
                  onClick={() => handleUploadToIPFS(index)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                >
                  Upload to IPFS
                </button>
                {product.ipfsLink && (
                  <a
                    href={product.ipfsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 underline"
                  >
                    View on IPFS
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            setProducts([
              ...products,
              {
                name: "",
                description: "",
                price: "",
                video: null,
                category: "",
                collection: "",
                ipfsLink: null,
              },
            ])
          }
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Add Another Product
        </button>
        <button
          onClick={handleAddProducts}
          className="ml-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
        >
          Submit Products
        </button>
      </section>
    </div>
  );
};

export default Admin;
