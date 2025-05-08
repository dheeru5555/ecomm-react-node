'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

// Mock wishlist data
const wishlistItems = [
  {
    id: '6',
    name: 'Slim-Fit Lab Coat',
    price: 64.99,
    image: 'https://images.pexels.com/photos/5407023/pexels-photo-5407023.jpeg',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Lab Coats',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Fitted Scrub Top',
    price: 34.99,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg',
    colors: ['Teal', 'Pink', 'Purple'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Scrub Tops',
    rating: 4.6,
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

export default function AccountWishlist() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState(wishlistItems);
  
  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    toast({
      title: "Removed from wishlist",
    });
  };
  
  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
      selectedColor: item.colors[0],
      selectedSize: item.sizes[0],
    });
    
    toast({
      title: "Added to cart",
      description: item.name,
    });
  };
  
  if (wishlist.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
        <Button asChild>
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {wishlist.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex h-full">
            <div className="w-1/3 bg-muted">
              <img 
                src={item.image} 
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="flex-1 p-4 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="font-medium line-clamp-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.colors.slice(0, 3).map(color => (
                    <div
                      key={color}
                      className="w-3 h-3 rounded-full border border-border"
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
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  size="sm" 
                  className="flex-1 h-8"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingBag size={14} className="mr-1" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}