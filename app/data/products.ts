// products.ts
import { StaticImageData } from "next/image";
import teeBeige from "@/app/assets/tee-beige.jpg";
import poloGrey from "@/app/assets/polo-grey.jpg";
import overshirtBlack from "@/app/assets/overshirt-black.jpg";
import poloNavy from "@/app/assets/polo-navy.jpg";

// Product interface
export interface Product {
  id: string;
  name: string;
  price: string;
  images: StaticImageData[]; // Only StaticImageData, compatible with next/image
  isNew: boolean;
  category: string;
  size: string[];
  color: string;
  material: string;
}

// Products array
export const products: Product[] = [
  {
    id: "1",
    name: "Emem Oversized Tee Washed Stone",
    price: "$47.77",
    images: [teeBeige, poloGrey, overshirtBlack],
    isNew: true,
    category: "tees",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Stone",
    material: "Cotton",
  },
  {
    id: "2",
    name: "Signar Rib Polo Longsleeve Vintage Grey Black",
    price: "$71.68",
    images: [poloGrey, poloNavy, teeBeige],
    isNew: true,
    category: "polos",
    size: ["S", "M", "L", "XL"],
    color: "Grey",
    material: "Cotton Blend",
  },
  {
    id: "3",
    name: "Tate Structured Overshirt Washed Black",
    price: "$89.50",
    images: [overshirtBlack, teeBeige, poloGrey],
    isNew: false,
    category: "shirts",
    size: ["M", "L", "XL", "XXL"],
    color: "Black",
    material: "Cotton",
  },
  {
    id: "4",
    name: "Signar Rib Polo Longsleeve Washed Indigo Navy White",
    price: "$71.68",
    images: [poloNavy, overshirtBlack, teeBeige],
    isNew: true,
    category: "polos",
    size: ["S", "M", "L", "XL"],
    color: "Navy",
    material: "Cotton Blend",
  },
  {
    id: "5",
    name: "Patron Oversized Tee Washed Black",
    price: "$45.20",
    images: [teeBeige, poloNavy, poloGrey],
    isNew: false,
    category: "tees",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Black",
    material: "Cotton",
  },
  {
    id: "6",
    name: "Urban Polo Longsleeve Vintage Beige",
    price: "$68.90",
    images: [poloGrey, overshirtBlack, poloNavy],
    isNew: true,
    category: "polos",
    size: ["M", "L", "XL"],
    color: "Beige",
    material: "Cotton Blend",
  },
  {
    id: "7",
    name: "Kolar Structured Overshirt Washed Stone",
    price: "$92.00",
    images: [overshirtBlack, teeBeige, poloNavy],
    isNew: false,
    category: "shirts",
    size: ["S", "M", "L", "XL"],
    color: "Stone",
    material: "Cotton",
  },
  {
    id: "8",
    name: "Elite Polo Longsleeve Charcoal Grey",
    price: "$74.30",
    images: [poloNavy, poloGrey, teeBeige],
    isNew: true,
    category: "polos",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Charcoal",
    material: "Cotton Blend",
  },
  {
    id: "9",
    name: "Vintage Oversized Tee Cream White",
    price: "$49.95",
    images: [teeBeige, overshirtBlack, poloGrey],
    isNew: false,
    category: "tees",
    size: ["M", "L", "XL", "XXL"],
    color: "White",
    material: "Cotton",
  },
  {
    id: "10",
    name: "Classic Polo Longsleeve Forest Green",
    price: "$69.80",
    images: [poloGrey, teeBeige, poloNavy],
    isNew: true,
    category: "polos",
    size: ["S", "M", "L", "XL"],
    color: "Green",
    material: "Cotton Blend",
  },
  {
    id: "11",
    name: "Structured Overshirt Midnight Black",
    price: "$87.60",
    images: [overshirtBlack, poloNavy, teeBeige],
    isNew: false,
    category: "shirts",
    size: ["M", "L", "XL"],
    color: "Black",
    material: "Cotton",
  },
  {
    id: "12",
    name: "Premium Polo Longsleeve Royal Blue",
    price: "$76.50",
    images: [poloNavy, teeBeige, overshirtBlack],
    isNew: true,
    category: "polos",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Blue",
    material: "Cotton Blend",
  },
];

// Filter groups
export const filterGroups = [
  {
    id: "category",
    title: "Category",
    isOpen: true,
    options: [
      { id: "tees", label: "T-Shirts", count: 3 },
      { id: "polos", label: "Polo Shirts", count: 6 },
      { id: "shirts", label: "Overshirts", count: 3 },
    ],
  },
  {
    id: "size",
    title: "Size",
    isOpen: true,
    options: [
      { id: "S", label: "Small", count: 7 },
      { id: "M", label: "Medium", count: 12 },
      { id: "L", label: "Large", count: 12 },
      { id: "XL", label: "Extra Large", count: 11 },
      { id: "XXL", label: "2X Large", count: 6 },
    ],
  },
  {
    id: "color",
    title: "Color",
    isOpen: true,
    options: [
      { id: "black", label: "Black", count: 3 },
      { id: "white", label: "White", count: 2 },
      { id: "grey", label: "Grey", count: 2 },
      { id: "navy", label: "Navy", count: 2 },
      { id: "stone", label: "Stone", count: 2 },
      { id: "beige", label: "Beige", count: 1 },
    ],
  },
  {
    id: "material",
    title: "Material",
    isOpen: false,
    options: [
      { id: "cotton", label: "Cotton", count: 6 },
      { id: "cotton-blend", label: "Cotton Blend", count: 6 },
    ],
  },
];

// Sort options
export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" },
];
