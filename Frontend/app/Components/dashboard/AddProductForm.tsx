"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";
import { Label } from "@/app/Components/ui/label";
import { Textarea } from "@/app/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/Components/ui/select";
import { Badge } from "@/app/Components/ui/badge";
import { useToast } from "@/app/hooks/use-toast";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { Product } from "@/app/Components/dashboard/ProductsSection";

interface AddProductFormProps {
  onSubmit: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialData?: Product | null;
  isEditing?: boolean;
}


const commonSizes = {
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  footwear: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
  accessories: ["One Size"]
};

export function AddProductForm({ onSubmit, onCancel, initialData, isEditing }: AddProductFormProps) {
  const { toast } = useToast();
  

   const [categories, setCategories] = useState<{ [key: string]: string[] }>({
    MEN: ["Shirts", "Pants", "Shoes"],
    WOMEN: ["Dresses", "Bags", "Shoes"],
    UNISEX: ["Accessories"],
  });

  // ✅ single source of truth for formData
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    subcategory: initialData?.subcategory || "",
    price: initialData?.price || 0,
    images: initialData?.images || [],
    sizes: initialData?.sizes || [],
    colors: initialData?.colors || [],
    material: initialData?.material || "",
    careInstructions: initialData?.careInstructions || "",
    itemNumber: initialData?.itemNumber || "",
    manufacturer: initialData?.manufacturer || "",
    companyName: initialData?.companyName || "",
  });

  const addCategory = (newCat: string) => {
    if (!categories[newCat]) {
      setCategories({ ...categories, [newCat]: [] });
    }
    setFormData({ ...formData, category: newCat, subcategory: "" });
  };

  const addSubcategory = (newSub: string) => {
    if (formData.category) {
      setCategories({
        ...categories,
        [formData.category]: [...(categories[formData.category] || []), newSub],
      });
      setFormData({ ...formData, subcategory: newSub });
    }
  };


  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: isEditing ? "Product Updated" : "Product Added",
      description: `${formData.name} has been ${isEditing ? 'updated' : 'added'} successfully.`,
    });
  };

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
      setNewSize("");
    }
  };

  const removeSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
  };

  const addColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
      setNewColor("");
    }
  };

  const removeColor = (color: string) => {
    setFormData({ ...formData, colors: formData.colors.filter(c => c !== color) });
  };

  const addImage = () => {
    if (newImage && !formData.images.includes(newImage)) {
      setFormData({ ...formData, images: [...formData.images, newImage] });
      setNewImage("");
    }
  };

  const removeImage = (image: string) => {
    setFormData({ ...formData, images: formData.images.filter(i => i !== image) });
  };



  return (
    <div className="space-y-6 text-gray-800">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel} className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-blue-700">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <p className="text-gray-500">
            {isEditing ? 'Update product information' : 'Fill in the details to add a new product'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="dashboard-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700">Basic Information</CardTitle>
              <CardDescription className="text-gray-500">Essential product details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-blue-700">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-blue-700">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product description..."
                  className="min-h-[100px] border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

       <div className="grid grid-cols-2 gap-4">
  {/* Category */}
  <div>
    <Label className="text-blue-700">Category *</Label>
    <Select
      value={formData.category}
      onValueChange={(value) =>
        setFormData({ ...formData, category: value, subcategory: "" })
      }
    >
      <SelectTrigger className="border-gray-700 text-gray-800 bg-gray-100 focus:border-blue-600 focus:ring-blue-600">
        <SelectValue placeholder="Select category" className="text-gray-800" />
      </SelectTrigger>
      <SelectContent className="bg-gray-100 text-gray-800">
        {Object.keys(categories).map((cat) => (
          <SelectItem key={cat} value={cat} className="text-gray-800">
            {cat}
          </SelectItem>
        ))}
        <div className="p-2 bg-gray-100">
          <Input
            placeholder="Add category"
            className="bg-gray-200 text-gray-800 focus:border-blue-600 focus:ring-blue-600"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                addCategory(e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </SelectContent>
    </Select>
  </div>

  {/* Subcategory */}
  <div>
    <Label className="text-blue-700">Subcategory</Label>
    <Select
      value={formData.subcategory}
      onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
      disabled={!formData.category}
    >
      <SelectTrigger className="border-gray-700 text-gray-800 bg-gray-100 focus:border-blue-600 focus:ring-blue-600">
        <SelectValue placeholder="Select subcategory" className="text-gray-800" />
      </SelectTrigger>
      <SelectContent className="bg-gray-100 text-gray-800">
        {formData.category &&
          categories[formData.category]?.map((subcat) => (
            <SelectItem key={subcat} value={subcat} className="text-gray-800">
              {subcat}
            </SelectItem>
          ))}
        {formData.category && (
          <div className="p-2 bg-gray-100">
            <Input
              placeholder="Add subcategory"
              className="bg-gray-200 text-gray-800 focus:border-blue-600 focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  addSubcategory(e.currentTarget.value.trim());
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        )}
      </SelectContent>
    </Select>
  </div>
</div>


              <div>
                <Label htmlFor="price" className="text-blue-700">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                  required
                />
              </div>
            </CardContent>
          </Card>

  {/* Images */}
<Card className="dashboard-card border-gray-700">
  <CardHeader>
    <CardTitle className="text-blue-700">Product Images</CardTitle>
    <CardDescription className="text-gray-500">Upload multiple product images</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Upload & URL Input */}
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Upload from device */}
      <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              const filesArray = Array.from(e.target.files);
              const newImages = filesArray.map((file) => URL.createObjectURL(file));
              setFormData({ ...formData, images: [...formData.images, ...newImages] });
            }
          }}
        />
        <Plus className="h-4 w-4 text-blue-600" />
        <span className="text-gray-700 cursor-pointer">Upload Images</span>
      </label>

      {/* Add from URL */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          className="border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600 cursor-pointer"
        />
        <Button
          type="button"
          onClick={() => {
            if (newImage.trim()) {
              setFormData({ ...formData, images: [...formData.images, newImage.trim()] });
              setNewImage("");
            }
          }}
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer px-4 py-2 rounded"
        >
          Add
        </Button>
      </div>
    </div>

    {/* Image Previews */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {formData.images.map((image, index) => (
        <div
          key={index}
          className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-300 shadow hover:shadow-lg transition-shadow"
        >
          <img
            src={image}
            alt={`Preview ${index}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                images: formData.images.filter((_, i) => i !== index),
              })
            }
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-md cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


        </div>

        {/* Variants and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sizes and Colors */}
          <Card className="dashboard-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700">Product Variants</CardTitle>
              <CardDescription className="text-gray-500">Sizes and colors available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sizes */}
              <div>
                <Label className="text-blue-700">Sizes</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add size"
                    className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <Button type="button" onClick={addSize} className="gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizes.map((size) => (
                    <Badge key={size} variant="secondary" className="gap-1 border border-blue-600 text-blue-600 bg-gray-100">
                      {size}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSize(size)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <Label className="text-blue-700">Colors</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Add color"
                    className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <Button type="button" onClick={addColor} className="gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color) => (
                    <Badge key={color} variant="secondary" className="gap-1 border border-blue-600 text-blue-600 bg-gray-100">
                      {color}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeColor(color)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="dashboard-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700">Product Details</CardTitle>
              <CardDescription className="text-gray-500">Additional product information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="material" className="text-blue-700">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="e.g., 80% cotton, 20% polyester"
                  className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="careInstructions" className="text-blue-700">Care Instructions</Label>
                <Textarea
                  id="careInstructions"
                  value={formData.careInstructions}
                  onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                  placeholder="Care instructions..."
                  className="min-h-[80px] border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="itemNumber" className="text-blue-700">Item Number</Label>
                <Input
                  id="itemNumber"
                  value={formData.itemNumber}
                  onChange={(e) => setFormData({ ...formData, itemNumber: e.target.value })}
                  placeholder="e.g., PGDR-6239-002"
                  className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="companyName" className="text-blue-700">Company/Brand Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Brand name"
                  className="form-input border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="manufacturer" className="text-blue-700">Manufacturer</Label>
                <Textarea
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="Manufacturer details..."
                  className="min-h-[60px] border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
