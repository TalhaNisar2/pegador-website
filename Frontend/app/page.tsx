import Image from "next/image";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
    </main>
  );
}