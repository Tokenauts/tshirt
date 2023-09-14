import { ethers } from "ethers";

const alchemyEndpoint =
  "https://polygon-mumbai.g.alchemy.com/v2/VDHZvXqBlp3XHnxozmLLdWaiVF08ehia";
const provider = new ethers.JsonRpcProvider(alchemyEndpoint);
const contractaddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractABI = require("../../utils/abi.json");
const contract = new ethers.Contract(contractaddress, contractABI, provider);

// In-memory cache for products
let cachedProducts = [];

const serializeProduct = (product) => {
  // Convert all BigInt properties to string
  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    ipfsHash: product.ipfsHash,
    category: product.category,
    collectionId: product.collectionId.toString(),
  };
};

// Function to fetch products and cache them
const fetchAndCacheProducts = async () => {
  console.log("Fetching product count...");
  const productCount = await contract.productCount();
  console.log(`Product count: ${productCount}`);

  const allProducts = [];
  for (let i = 1; i <= productCount; i++) {
    console.log(`Fetching product ${i}`);
    const product = await contract.products(i);
    allProducts.push(serializeProduct(product));
  }

  cachedProducts = allProducts; // Cache the products
};

const initializeProductCache = async () => {
  await fetchAndCacheProducts();
  // Refresh the cache every 5 minutes
  setInterval(fetchAndCacheProducts, 5 * 60 * 1000);
};

// Initialize the cache when this module is loaded
initializeProductCache();

export default async (req, res) => {
  // Return the cached products
  res.status(200).json(cachedProducts);
};
