'use client';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './BannerSlider.module.css';
import StyledBTN from '../StyledBTN/StyledBTN';

function BannerSlider({ image_url, title, span_btn, link }) {
  const [slide_index, setSlideIndex] = useState(0);

  const nextBTN = () => {
    setSlideIndex((prev) => (prev === image_url.length - 1 ? 0 : prev + 1));
  };

  const prevBTN = () => {
    setSlideIndex((prev) => (prev === 0 ? image_url.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextBTN();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="flex h-full w-full overflow-hidden">
        {image_url.map((url, index) => (
          <a
            href={span_btn && span_btn[index] === '' ? "#" : link && link[index]}
            key={index}
            className="relative w-full h-full flex-shrink-0 flex-grow-0 transition-transform duration-5500 ease-in-out"
            style={{
              transform: `translateX(${slide_index * -100}%)`,
            }}
          >
            <img
              src={url}
              alt="banner"
              className="absolute w-full h-full object-cover"
            />

            {title && title[index] !== "" && (
              <div className="overlay absolute w-full h-full bg-black opacity-50"></div>
            )}

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
              <h1 className="text-5xl font-bold text-white mb-8">{title && title[index]}</h1>
              {span_btn && span_btn[index] !== "" && (
                <StyledBTN link={link[index]} span_btn={span_btn[index]}/>
              )}
            </div>
          </a>
        ))}
      </div>

      <button
        onClick={prevBTN}
        className="absolute top-0 left-0 h-full text-white bg-gray-800 bg-opacity-50 p-2 hover:bg-opacity-60 transition duration-300 flex items-center justify-center px-3"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextBTN}
        className="absolute top-0 right-0 h-full text-white bg-black bg-opacity-50 p-2 hover:bg-opacity-60 transition duration-300 flex items-center justify-center px-3"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default BannerSlider;
