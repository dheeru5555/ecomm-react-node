'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ProductFilters from './ProductFilters';

// Mock products data (expanded from featured products)
const products: Product[] = [
  {
    id: '1',
    name: 'Classic V-Neck Scrub Top',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg',
    colors: ['Navy', 'Light Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Tops',
    isNew: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Jogger-Style Scrub Pants',
    price: 42.99,
    image: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg',
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Bottoms',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Premium Lab Coat',
    price: 59.99,
    image: 'https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Lab Coats',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Fitted Scrub Top',
    price: 34.99,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg',
    colors: ['Teal', 'Pink', 'Purple'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Scrub Tops',
    isNew: true,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Cargo Scrub Pants',
    price: 48.99,
    image: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg',
    colors: ['Navy', 'Black', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Bottoms',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Slim-Fit Lab Coat',
    price: 64.99,
    image: 'https://images.pexels.com/photos/5407023/pexels-photo-5407023.jpeg',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Lab Coats',
    isNew: true,
    rating: 4.9,
  },
  {
    id: '7',
    name: 'Core Stretch Scrub Top',
    price: 36.99,
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg',
    colors: ['Light Blue', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Scrub Tops',
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Medical Stethoscope',
    price: 89.99,
    image: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg',
    colors: ['Black', 'Blue', 'Red'],
    sizes: ['Standard'],
    category: 'Accessories',
    rating: 4.9,
  }
];

export default function ProductList() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
    
    toast({
      title: favorites.includes(productId) 
        ? "Removed from wishlist" 
        : "Added to wishlist",
      duration: 2000,
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      quantity: 1,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0],
    });
    
    toast({
      title: "Added to cart",
      description: product.name,
      duration: 2000,
    });
  };

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default: // featured is default
        return 0;
    }
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 mr-4 lg:hidden">
                <SlidersHorizontal size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <ProductFilters />
              </div>
            </SheetContent>
          </Sheet>
          <p className="text-sm text-muted-foreground">
            Showing {sortedProducts.length} products
          </p>
        </div>
        
        <div className="flex items-center w-full sm:w-auto">
          <span className="text-sm mr-2">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[3/4] overflow-hidden bg-secondary/20">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart 
                  size={18} 
                  className={favorites.includes(product.id) ? "fill-primary text-primary" : ""}
                />
              </Button>
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary">New</Badge>
              )}
            </div>
            
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {product.colors.slice(0, 3).map(color => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ 
                      backgroundColor: 
                        color.toLowerCase() === 'navy' ? '#001f3f' : 
                        color.toLowerCase() === 'light blue' ? '#add8e6' :
                        color.toLowerCase() === 'black' ? '#000000' :
                        color.toLowerCase() === 'gray' ? '#808080' :
                        color.toLowerCase() === 'white' ? '#ffffff' :
                        color.toLowerCase() === 'teal' ? '#008080' :
                        color.toLowerCase() === 'pink' ? '#ffc0cb' :
                        color.toLowerCase() === 'purple' ? '#800080' :
                        color.toLowerCase() === 'red' ? '#ff0000' :
                        color.toLowerCase() === 'blue' ? '#0000ff' :
                        color
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{product.colors.length - 3} more</span>
                )}
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="font-semibold mt-1">${product.price.toFixed(2)}</p>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button 
                className="w-full gap-2"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag size={16} />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}