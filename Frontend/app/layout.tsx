import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./providers/provider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FasionFy | Redefine Your Style",
  description:
    "Discover the latest trends in men's and women's fashion at FasionFy. Shop essentials, lookbooks, and exclusive collections designed to elevate your everyday style.",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ReduxProvider>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
       <Navbar/>
        {children}
<Footer/>
      </body>
        </ReduxProvider>
    </html>
  );
}
