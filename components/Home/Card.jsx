import React from "react";

const Card = ({ imgSrc, imgAlt, title, description }) => {
  return (
    <figure>
      <img
        className="w-full bg-gray-200"
        src={imgSrc}
        alt={imgAlt}
        width="1310"
        height="873"
      />
      <p className="mt-5 text-lg font-medium leading-6 text-black">{title}</p>
      <p className="mt-3 text-base text-gray-500">{description}</p>
      <div className="flex gap-3 mt-10 justify-left">
        <a
          className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
          href="#"
        >
          <span> Read more &nbsp; → </span>
        </a>
      </div>
    </figure>
  );
};

export default Card;
