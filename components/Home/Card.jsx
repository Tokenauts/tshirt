"use client";
import { useRef } from "react";
import Link from "next/link";

const Card = ({ imgSrc, imgAlt, title, description, price, productId }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <Link href={`/product/${productId}`}>
      <figure
        className="px-4 py-4 bg-gray-100 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 "
        onMouseEnter={handleMouseEnter}
      >
        <video
          ref={videoRef}
          muted
          className="w-full rounded-t-lg"
          src={imgSrc}
          alt={imgAlt}
        />
        <figcaption className="pt-4">
          <p className="text-xl font-semibold text-black mb-2">{title}</p>
          <p className="text-base text-gray-600 mb-3">{description}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-medium text-black">{price} ETH</p>
            <button className="bg-black text-white py-1 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Buy Now
            </button>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;
