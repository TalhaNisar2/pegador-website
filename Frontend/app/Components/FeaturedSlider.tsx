"use client";

import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { useRef } from "react";

const sliderImages = [
  { src: "/hero/hero1.webp", alt: "Slider 1" },
  { src: "/hero/hero2.webp", alt: "Slider 2" },
  { src: "/hero/hero3.webp", alt: "Slider 3" },
  { src: "/hero/hero6.webp", alt: "Slider 4" },
  { src: "/hero/hero5.webp", alt: "Slider 5" },
  { src: "/hero/hero8.webp", alt: "Slider 6" },
  { src: "/hero/hero9.webp", alt: "Slider 7" },
];

export default function FeaturedSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth / 5;
      sliderRef.current.scrollBy({ left: -width, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth / 5;
      sliderRef.current.scrollBy({ left: width, behavior: "smooth" });
    }
  };

  return (
    <section className="relative mt-24 px-2 md:px-6 mb-24">
      {/* Top Banner Text */}
      <div className="text-center mb-6 px-2">
        <h2 className="text-lg md:text-xl font-bold uppercase text-black">
          SHOP THE FEED
        </h2>
        <p className="text-sm md:text-base uppercase text-gray-700">
          TAG YOUR POST WITH @PEGADORSTREETWEAR AND #PEGADORSTREETWEAR TO BE FEATURED
        </p>
      </div>

      <div className="relative">
        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {sliderImages.map((img, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[200px] md:w-[240px] h-40 md:h-[300px] overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-300 group-hover:blur-sm"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <FaInstagram className="text-white text-2xl mb-2 transition" />
                <button className="text-white border border-white px-4 py-1 text-sm transition hover:bg-white hover:text-black cursor-pointer">
                  SHOP IT
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/60 transition z-10 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/60 transition z-10 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
