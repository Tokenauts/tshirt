import React from "react";
import Navbar from "./Home/Navbar";
import Hero from "./Home/Hero";
import Categories from "./Home/Categories";
import Feature from "./Home/Feature";
import Faq from "./Home/Faq";
import Footer from "./Home/Footer";
import Product from "./Product/Product";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <Feature />
      <Faq />
      <Product />
      <Footer />
    </div>
  );
};

export default App;
