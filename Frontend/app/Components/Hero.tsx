"use client";

import Image from "next/image";
import Link from "next/link";
import FeaturedSlider from "./FeaturedSlider";

export default function Hero() {
  return (
    <section>
      {/* Hero Banner */}
      <div className="relative w-full min-h-[90vh] md:min-h-[110vh]">
        <Image
          src="/hero/hero1.webp"
          alt="FW 25 Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center px-4">
          <p className="text-white text-sm mb-2 tracking-wide">
            NEW FW ’25 COLLECTION | FIRST ARRIVALS ONLINE NOW
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap">
            Everyday Ambition.
          </h1>
           <Link
            href="/products"
            className="bg-white text-black px-6 py-3 text-sm font-normal cursor-pointer hover:bg-black hover:text-white transition"
          >
            SHOP MEN
          </Link>
        </div>
      </div>

      {/* Two-Image Section */}
      <div className="px-2 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="relative min-h-[70vh] md:min-h-[110vh]">
          <Image
            src="/hero/hero2.webp"
            alt="Tees"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 text-left text-white">
            <p className="text-sm">SHOP NOW</p>
            <h2 className="text-2xl font-bold">TEES</h2>
          </div>
        </div>

        <div className="relative min-h-[70vh] md:min-h-[110vh]">
          <Image
            src="/hero/hero3.webp"
            alt="Long Sleeves"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm">SHOP NOW</p>
            <h2 className="text-2xl font-bold">LONGSLEEVES</h2>
          </div>
        </div>
      </div>

      {/* Full Width Banner */}
      <div className="relative w-full min-h-[90vh] md:min-h-[110vh] mt-10">
        <Image
          src="/hero/hero5.webp"
          alt="FW 25 Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center px-4">
          <p className="text-white text-sm mb-2 tracking-wide">
            NEW FW ’25 COLLECTION | FIRST ARRIVALS ONLINE NOW
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap">
            Everyday Ambition.
          </h1>
          <Link
            href="/products"
            className="bg-white text-black px-6 py-3 text-sm font-normal cursor-pointer hover:bg-black hover:text-white transition"
          >
            SHOP WOMEN
          </Link>
        </div>
      </div>

      {/* Summer Banner */}
      <div className="relative w-full min-h-[80vh] md:min-h-[90vh]">
        <Image
          src="/hero/hero6.webp"
          alt="FW 25 Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center px-4">
          <p className="text-white text-sm mb-2 tracking-wide">
            SUMMER ’25 COLLECTION AVAILABLE ONLINE
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap">
            SCENT OF SUMMER
          </h1>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-black px-6 py-3 text-sm font-normal cursor-pointer hover:bg-black hover:text-white transition"
            >
              SHOP MEN
            </Link>
            <Link
              href="/products"
              className="bg-white text-black px-6 py-3 text-sm font-normal cursor-pointer hover:bg-black hover:text-white transition"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </div>

      {/* Two-Image Section */}
      <div className="px-2 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="relative min-h-[70vh] md:min-h-[110vh]">
          <Image
            src="/hero/hero9.webp"
            alt="Shirts"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 text-left text-white">
            <p className="text-sm">SHOP NOW</p>
            <h2 className="text-2xl font-bold">SHIRTS</h2>
          </div>
        </div>

        <div className="relative min-h-[70vh] md:min-h-[110vh]">
          <Image
            src="/hero/hero8.webp"
            alt="Shorts"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm">SHOP NOW</p>
            <h2 className="text-2xl font-bold">SHORTS</h2>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <FeaturedSlider />
    </section>
  );
}
