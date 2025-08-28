"use client";
import Context from "./context/index";
import { useState } from "react";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cartProductCount, setCartProductCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchUserAddToCart = async () => { /* ... */ };
  const fetchUserWishlistCount = async () => { /* ... */ };
  const fetchUserDetails = async () => { /* ... */ };

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
        wishlistCount,
        fetchUserWishlistCount,
      }}
    >
      <Hero />
      <main>{children}</main>
      <Footer />
    </Context.Provider>
  );
}
