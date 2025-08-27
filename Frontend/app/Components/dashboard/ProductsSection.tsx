import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Plus, Package } from "lucide-react";
import { AddProductForm } from "@/app/Components/dashboard/AddProductForm";
import { ProductList } from "@/app/Components/dashboard/ProductList";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  material: string;
  careInstructions: string;
  itemNumber: string;
  manufacturer: string;
  companyName: string;
  createdAt: Date;
}

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts([...products, newProduct]);
    setShowAddForm(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleUpdateProduct = (updatedProduct: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...updatedProduct, id: editingProduct.id, createdAt: editingProduct.createdAt }
          : p
      ));
      setEditingProduct(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  if (showAddForm) {
    return (
      <AddProductForm
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        onCancel={handleCloseForm}
        initialData={editingProduct}
        isEditing={!!editingProduct}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white hover:bg-blue-700 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <p className="text-xs text-gray-500">
              {products.length === 0 ? "No products yet" : "Active products"}
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Categories</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(products.map(p => p.category)).size}
            </div>
            <p className="text-xs text-gray-500">Unique categories</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Avg. Price</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-gray-500">Average product price</p>
          </CardContent>
        </Card>
      </div>

      {/* Products List */}
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductsSection;
