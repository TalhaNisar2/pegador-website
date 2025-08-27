"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const column1 = ["FAQs", "Shipping costs and delivery time", "Return", "Contact us","Payment methods"];
  const column2 = ["Loyalty", "New PEGADOR® app", "About Us", "career","Reviews"];
  const column3 = ["imprint", "Privacy Policy", "Cancellation policy", "Terms and Conditions","Cookie settings"];
  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook" },
    { icon: <FaInstagram />, name: "Instagram" },
    { icon: <FaTwitter />, name: "Twitter" },
    { icon: <FaYoutube />, name: "YouTube" },
    { icon: <FaWhatsapp />, name: "WhatsApp" },
  ];

  const paymentIcons = [
    { src: "/footer/americanexpress.png", alt: "American Express" },
    { src: "/footer/applepay.png", alt: "applePay" },
    { src: "/footer/epspay.png", alt: "Epspay" },
    { src: "/footer/googlepay.png", alt: "Google Pay" },
    { src: "/footer/mastercard.png", alt: "MasterCard" },
    { src: "/footer/paypal.jpeg", alt: "PayPal" },
    { src: "/footer/shoppay.png", alt: "Shop Pay" },
    { src: "/footer/twint.png", alt: "Twint" },
    { src: "/footer/unionpay.png", alt: "Union Pay" },
    { src: "/footer/visa.png", alt: "Visa" },
  ];

  return (
    <footer className="bg-[#F0F0F0] text-black py-24 px-4 md:px-6">
      {/* Columns */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="font-normal mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-3">
            {column1.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-black hover:underline transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-normal mb-4">ABOUT PEGADOR®</h3>
          <ul className="space-y-3">
            {column2.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-black hover:underline transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-normal mb-4">LEGAL</h3>
          <ul className="space-y-3">
            {column3.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-black hover:underline transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Social Links */}
        <div className="w-full md:w-auto">
          <h3 className="font-normal mb-4 text-left">SOCIAL</h3>
          <div className="flex space-x-4 text-2xl">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                className="text-black hover:text-orange-500 transition"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <div className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} PEGADOR®
        </div>

        {/* Right: Payment Icons */}
        <div className="flex space-x-2">
          {paymentIcons.map((icon) => (
            <div
              key={icon.alt}
              className="w-10 h-[22px] flex items-center justify-center border border-gray-200 bg-white"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-full h-full object-fill"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
