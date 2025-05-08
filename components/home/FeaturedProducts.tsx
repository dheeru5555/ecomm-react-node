'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

// Mock featured products data
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Classic V-Neck Scrub Top',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg',
    colors: ['Navy', 'Light Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Tops',
    isNew: true,
    isFeatured: true,
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
    isNew: false,
    isFeatured: true,
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
    isNew: false,
    isFeatured: true,
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
    isFeatured: true,
    rating: 4.6,
  }
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

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

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular medical apparel, designed for comfort and durability
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
        
        <div className="mt-10 text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}