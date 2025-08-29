"use client";
import Context from "./context/index";
import { useState, useEffect } from "react";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import summaryApi from "./common/index";

interface UserType {
  name?: string;
  profilePic?: string;
  [key: string]: any;
}

interface AppContextType {
  user: UserType | null;
  fetchUserDetails: () => Promise<void>;
  cartProductCount: number;
  fetchUserAddToCart: () => Promise<void>;
  wishlistCount: number;
  fetchUserWishlistCount: () => Promise<void>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cartProductCount, setCartProductCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUserAddToCart = async () => {
    // fetch cart count logic
  };

  const fetchUserWishlistCount = async () => {
    // fetch wishlist count logic
  };

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        setUser(dataApi.data);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  // Fetch user details on mount
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
    fetchUserWishlistCount();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
        wishlistCount,
        fetchUserWishlistCount,
      }}
    >
      <Navbar />
      <Hero />
      <main>{children}</main>
      <Footer />
    </Context.Provider>
  );
}
