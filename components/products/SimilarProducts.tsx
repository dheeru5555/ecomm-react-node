'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

// Mock products data
const allProducts = [
  {
    id: '1',
    name: 'Classic V-Neck Scrub Top',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg',
    colors: ['Navy', 'Light Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Tops',
    isNew: true,
  },
  {
    id: '2',
    name: 'Jogger-Style Scrub Pants',
    price: 42.99,
    image: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg',
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Bottoms',
  },
  {
    id: '3',
    name: 'Premium Lab Coat',
    price: 59.99,
    image: 'https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Lab Coats',
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
  },
  {
    id: '5',
    name: 'Cargo Scrub Pants',
    price: 48.99,
    image: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg',
    colors: ['Navy', 'Black', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Bottoms',
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
  },
  {
    id: '7',
    name: 'Core Stretch Scrub Top',
    price: 36.99,
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg',
    colors: ['Light Blue', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Scrub Tops',
  },
  {
    id: '8',
    name: 'Medical Stethoscope',
    price: 89.99,
    image: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg',
    colors: ['Black', 'Blue', 'Red'],
    sizes: ['Standard'],
    category: 'Accessories',
  }
];

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export default function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter products by category and exclude current product
  const similarProducts = allProducts
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4); // Limit to 4 products

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

  const handleAddToCart = (product: any) => {
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

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
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