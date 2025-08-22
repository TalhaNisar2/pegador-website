"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const links = ["Men", "Women", "Essentials", "LookBooks"];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Men");
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

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
    <nav className="w-full bg-white relative">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 relative">

        {/* Left Links */}
      {/* Left Links */}
<div className="flex space-x-4 md:space-x-6 relative">
  {links.map((link, idx) => (
    <a
      key={link}
      href="#"
      ref={(el) => {
        if (el) linkRefs.current[idx] = el;
      }}
      onClick={() => setActiveLink(link)}
      onMouseEnter={() => setHoverLink(link)}
      onMouseLeave={() => setHoverLink(null)}
      className="relative inline-block text-black text-sm py-2 cursor-pointer" // removed hover:underline
    >
      {link}
    </a>
  ))}

  {/* Moving border */}
  <span
    className="absolute bottom-0 h-0.5 bg-black rounded-full transition-all duration-300"
    style={{ left: barStyle.left, width: barStyle.width }}
  />
</div>


        {/* Brand Name */}
        <div className="font-extrabold italic text-2xl text-center text-black">
          PEGADOR
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2 md:space-x-4 text-black">
          {/* Search Icon */}
          <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition">
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
          <div className="w-7 h-7 relative rounded-full overflow-hidden">
            <Image
              src="/Pakistan.webp"
              alt="Pakistan"
              fill
              className="object-cover"
            />
          </div>

          {/* User Icon */}
          <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h24v24H0z"></path>
                <path d="M15.321 9.5V5.321a3.321 3.321 0 0 0-6.642 0V9.5" stroke="currentColor" strokeWidth="1.5"></path>
                <path stroke="currentColor" strokeWidth="1.5" d="M5.357 7.705h13.286l1.107 13.563H4.25z"></path>
              </g>
            </svg>
          </div>

          {/* Star Icon */}
          <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>

          {/* Shopping Cart Icon */}
          <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h24v24H0z"></path>
                <path d="M15.321 9.5V5.321a3.321 3.321 0 0 0-6.642 0V9.5" stroke="currentColor" strokeWidth="1.5"></path>
                <path stroke="currentColor" strokeWidth="1.5" d="M5.357 7.705h13.286l1.107 13.563H4.25z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
