import React, { useRef } from "react";

const VideoItem = ({ src }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to initial frame
    }
  };

  return (
    <figure>
      <a
        className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
        href="#"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className="w-full rounded-md bg-gray-200"
          src={src}
          muted
        />
      </a>
    </figure>
  );
};

const Categories = () => {
  return (
    <div>
      <section className="flex items-center w-full bg-gray-50">
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-6xl">
          <h1 className="text-center text-3xl ">Browse Categories </h1>
          <div className="grid grid-row-1 gap-5 py-12 md:grid-cols-row-1 lg:grid-row-1">
            <VideoItem src="./12.mp4" />
            <VideoItem src="./12.mp4" />
            <VideoItem src="./12.mp4" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
