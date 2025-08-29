"use client";
import React, { createContext } from "react";

export interface UserType {
  name?: string;
  profilePic?: string;
  [key: string]: any;
}

export interface AppContextType {
  user: UserType | null;              
  fetchUserDetails: () => Promise<void>;
  fetchUserAddToCart: () => Promise<void>;
  fetchUserWishlistCount: () => Promise<void>;
  cartProductCount: number;
  wishlistCount: number;
}

const Context = createContext<AppContextType | null>(null);
export default Context;
