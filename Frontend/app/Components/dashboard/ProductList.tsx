import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Badge } from "@/app/Components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/Components/ui/dropdown-menu";
import { Edit, Trash2, MoreHorizontal, Package, Eye } from "lucide-react";
import { Product } from "@/app/Components/dashboard/ProductsSection";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-gray-900">Product Inventory</CardTitle>
          <CardDescription className="text-gray-500">Your products will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first product to the inventory.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-gray-900">Product Inventory</CardTitle>
        <CardDescription className="text-gray-500">Manage your product catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Product</TableHead>
                <TableHead className="text-gray-700">Category</TableHead>
                <TableHead className="text-gray-700">Price</TableHead>
                <TableHead className="text-gray-700">Variants</TableHead>
                <TableHead className="text-gray-700">Stock Info</TableHead>
                <TableHead className="text-gray-700">Added</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-100">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {product.images.length > 0 ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <Package className={`h-6 w-6 text-gray-400 ${product.images.length > 0 ? 'hidden' : ''}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.companyName || 'No brand'}
                        </p>
                        {product.itemNumber && (
                          <p className="text-xs text-gray-400">
                            #{product.itemNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-gray-700">{product.category}</Badge>
                      {product.subcategory && (
                        <p className="text-xs text-gray-500">{product.subcategory}</p>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-medium text-green-600">${product.price.toFixed(2)}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-2">
                      {product.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.slice(0, 3).map((size) => (
                            <Badge key={size} variant="secondary" className="text-xs text-gray-700">
                              {size}
                            </Badge>
                          ))}
                          {product.sizes.length > 3 && (
                            <Badge variant="secondary" className="text-xs text-gray-700">
                              +{product.sizes.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      {product.colors.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.colors.slice(0, 2).map((color) => (
                            <Badge key={color} variant="outline" className="text-xs text-gray-700">
                              {color}
                            </Badge>
                          ))}
                          {product.colors.length > 2 && (
                            <Badge variant="outline" className="text-xs text-gray-700">
                              +{product.colors.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm text-gray-700">
                      <p>{product.images.length} image{product.images.length !== 1 ? 's' : ''}</p>
                      {product.material && (
                        <p className="text-xs text-gray-500">
                          {product.material.length > 20 
                            ? `${product.material.substring(0, 20)}...` 
                            : product.material
                          }
                        </p>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {product.createdAt.toLocaleDateString()}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 text-blue-600">
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onEdit(product)}
                          className="gap-2 text-yellow-600"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete(product.id)}
                          className="gap-2 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
