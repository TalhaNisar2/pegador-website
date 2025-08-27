"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCartSidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const links = ["Men", "Women", "Essentials", "LookBooks"];

// Columns content for Men/Women (existing mega menu)
const megaMenuColumns = [
  {
    title: "Highlights",
    items: ["Everyday Ambition | New", "All products", "Vouchers"],
  },
  {
    title: "Tops",
    items: [
      "Teas",
      "Hoodies",
      "Sweat Jackets",
      "Shirts",
      "Sweaters",
      "Long-sleeved shirts",
      "Track Jackets",
      "Knitwear",
    ],
  },
  {
    title: "Bottoms",
    items: [
      "Shorts",
      "Swim Shorts",
      "Pants & Joggers",
      "Jeans",
      "Cargos",
      "Basic Bottoms",
    ],
  },
  {
    title: "Outerwear",
    items: ["Vests", "Jackets"],
  },
  {
    title: "Footwear",
    items: ["Slides", "Footwear"],
  },
  {
    title: "Accessories",
    items: [
      "Socks",
      "Underwear",
      "Sunglasses",
      "Parfums",
      "Caps & Hats",
      "Bags",
      "Beanies",
      "Utilities",
    ],
  },
];

// Categories for Essentials
const menCategories = [
  "Alle Essentials",
  "Tees",
  "Hoodies",
  "Sweat Jackets",
  "Longsleeves",
  "Sweaters",
  "Track Jackets",
  "Pants & Joggers",
  "Shorts",
  "Swim Shorts",
];

const womenCategories = [
  "Alle Essentials",
  "Tees & Tops",
  "Hoodies",
  "Sweat Jackets",
  "Sweaters",
  "Track Jackets",
  "Pants",
  "Shorts",
  "Leggings",
];

// LookBooks content
const lookbooksData = {
  2025: ["Everyday Ambition | FW '25", "Scent of Summer | S '25", "All We Got | SP '25"],
  2024: [
    "Values & Visions | W '24",
    "Fashion Show | W '24",
    "Outerwear | '24",
    "Most Alive | FW '24",
    "High Summer | HS '24",
    "Next Wave | S '24",
    "Never too Late | SP '24",
  ],
  2023: [
    "Do not Disturb | W '23",
    "Fashion Show | W '23",
    "Outerwear | '23",
    "Built to Last | FW '23",
    "Last Minute | HS '23",
    "Finer Things | S '23",
    "Trust the Process | SP '23",
  ],
  2022: ["Cold Hearted | W '22", "Ahead of Time | FW '22", "No Role Model | HS '22", "Modern Reality | S '22", "Life we Chose | SP '22"],
};

export default function Navbar() {
  const {items}=useSelector((state:RootState)=>state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [activeLink, setActiveLink] = useState("Men");
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const linkRefs = useRef<HTMLDivElement[]>([]);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

  const megaOpen = isHoveringLink || isHoveringCard;

  // Update moving bar position
  useEffect(() => {
    const target = hoverLink || activeLink;
    const index = links.indexOf(target);
    const el = linkRefs.current[index];
    if (el) {
      setBarStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeLink, hoverLink]);

  return (
    <nav className="w-full bg-white relative z-50">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 relative">
        {/* Left Links */}
        <div className="flex space-x-6 relative">
          {links.map((link, idx) => (
            <div
              key={link}
              ref={(el) => {
                if (el) linkRefs.current[idx] = el;
              }}
              onClick={() => setActiveLink(link)}
              onMouseEnter={() => {
                setHoverLink(link);
                setIsHoveringLink(true);
              }}
              onMouseLeave={() => setIsHoveringLink(false)}
              className="relative inline-block text-black text-sm py-2 cursor-pointer"
            >
              {link}
            </div>
          ))}

          {/* Moving border */}
          <span
            className="absolute bottom-0 h-0.5 bg-black rounded-full transition-all duration-300"
            style={{ left: barStyle.left, width: barStyle.width }}
          />
        </div>

        {/* Brand Name */}
        <div className="font-extrabold italic text-2xl text-center text-black">PEGADOR</div>

     {/* Right Icons */}
<div className="flex items-center space-x-4 text-black cursor-pointer">
  {/* Search Icon */}
  <div className="p-1 rounded-full">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(3 3)" stroke="currentColor" strokeWidth="1.5" fill="none" fillRule="evenodd">
        <path strokeLinecap="square" d="m13.971 13.971 4.47 4.47"></path>
        <circle cx="7.824" cy="7.824" r="7.824"></circle>
      </g>
    </svg>
  </div>

  {/* Pakistan Flag */}
  <div className="w-7 h-7 relative rounded-full overflow-hidden cursor-pointer">
    <Image src="/Pakistan.webp" alt="Pakistan" fill className="object-cover" />
  </div>

  {/* User Icon */}
  <div className="p-1 rounded-full cursor-pointer">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.429a3.571 3.571 0 1 0 0 7.142 3.571 3.571 0 0 0 0-7.142Z"
          fill="currentColor"
        ></path>
        <path
          d="M3 18.25c0-2.486 4.542-4 9.028-4 4.486 0 8.972 1.514 8.972 4v3H3v-3Z"
          stroke="currentColor"
          strokeWidth="1.5"
        ></path>
        <circle stroke="currentColor" strokeWidth="1.5" cx="12" cy="7" r="4.25"></circle>
      </g>
    </svg>
  </div>

{/* Star Icon */}
<Link href="/wishlist">
  <div className="p-1 rounded-full cursor-pointer hover:bg-gray-100 transition">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </div>
</Link>

  <div className="p-1 rounded-full cursor-pointer relative" onClick={() => setIsCartOpen(true)}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path d="M15.321 9.5V5.321a3.321 3.321 0 0 0-6.642 0V9.5" stroke="currentColor" strokeWidth="1.5"></path>
              <path stroke="currentColor" strokeWidth="1.5" d="M5.357 7.705h13.286l1.107 13.563H4.25z"></path>
            </g>
          </svg>
          <div className="bg-black text-xs text-white rounded-full h-4 w-4 flex items-center justify-center absolute -top-1 -right-1">
            {items.length}
          </div>
        </div>
</div>


{/* Cart Drawer */}
<ShoppingCartSidebar isCartOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>


      {/* Optional Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}



      
      
      
       </div>

      {/* Mega Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          megaOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
        onMouseEnter={() => setIsHoveringCard(true)}
        onMouseLeave={() => setIsHoveringCard(false)}
      >
        {/* Essentials */}
        {hoverLink === "Essentials" && (
          <div className="grid grid-cols-6 gap-12 px-8 py-8">
            <div className="col-span-3 flex gap-40">
              <div>
                <p className="font-bold mb-4 text-gray-400">MEN</p>
                <ul className="space-y-3">
                  {menCategories.map((item) => (
                    <li key={item} className="text-gray-700 hover:text-black text-sm cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold mb-4 text-gray-400">WOMEN</p>
                <ul className="space-y-3">
                  {womenCategories.map((item) => (
                    <li key={item} className="text-gray-700 hover:text-black text-sm cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-2 gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="relative w-full h-[300px] md:h-[350px]">
                  <Image src="/navbar/men_essentials.webp" alt="MEN" fill className="object-cover" />
                </div>
                <p className="mt-2 text-center font-normal text-gray-800">MEN</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-full h-[300px] md:h-[350px]">
                  <Image src="/navbar/women_essentials.webp" alt="WOMEN" fill className="object-cover" />
                </div>
                <p className="mt-2 text-center font-normal text-gray-800">WOMEN</p>
              </div>
            </div>
          </div>
        )}


{/* LookBooks */}
{hoverLink === "LookBooks" && (
  <div className="grid grid-cols-6 px-8 py-10 gap-x-28">
    {/* Columns: take more width */}
    <div className="col-span-3 flex gap-14 flex-nowrap">
      {Object.entries(lookbooksData).map(([year, items]) => (
        <div key={year} className="pr-6">
          <p className="font-bold mb-2 text-gray-400 text-sm">{year}</p>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-700 hover:text-black text-[11px] font-medium w-max block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Image Card: stick to the right */}
    <div className="col-span-3 flex justify-end items-start relative">
      <div className="flex flex-col items-center">
        <div className="relative w-56 h-64 mr-1"> {/* sticks to right with tiny spacing */}
          <Image
            src="/navbar/lookbooks1.webp"
            alt="LookBooks"
            fill
            className="object-cover rounded"
          />
        </div>
        <a
          href="#"
          className="mt-3 font-medium text-gray-800 text-sm text-center"
        >
          Everyday Ambition | FW '25
        </a>
      </div>
    </div>
  </div>
)}




        {/* Default Men/Women */}
        {hoverLink !== "Essentials" && hoverLink !== "LookBooks" && (
          <div className="grid grid-cols-6 gap-12 px-8 py-8">
            {megaMenuColumns.map((col) => (
              <div key={col.title}>
                <p className="font-normal text-sm mb-3 text-gray-400">{col.title}</p>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-700 hover:text-black text-sm">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
