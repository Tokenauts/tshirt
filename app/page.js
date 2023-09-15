"use client";

import Admin from "../components/Admin";
import App from "../components/App";
import GetProduct from "../components/Product/getProduct";
import Navbar from "../components/Home/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      {/* <Admin /> */}
      <GetProduct />
    </>
  );
}
