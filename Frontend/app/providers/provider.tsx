"use client";
import { useState } from "react";
import Context, { AppContextType, UserType } from "../context/index";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [cartProductCount, setCartProductCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<UserType | null>(null); // ✅ add user state

  const fetchUserAddToCart = async () => {};
  const fetchUserWishlistCount = async () => {};
  const fetchUserDetails = async () => {};

  const contextValue: AppContextType = {
    user, // ✅ include user in context
    fetchUserDetails,
    fetchUserAddToCart,
    fetchUserWishlistCount,
    cartProductCount,
    wishlistCount,
  };

  return (
    <ReduxProvider store={store}>
      <Context.Provider value={contextValue}>
        {children}
      </Context.Provider>
    </ReduxProvider>
  );
}
