'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Minus, Plus, Heart, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import SimilarProducts from '@/components/products/SimilarProducts';

// Mock product data - in a real app this would come from an API
const products = [
  {
    id: '1',
    name: 'Classic V-Neck Scrub Top',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg',
    images: [
      'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg',
      'https://images.pexels.com/photos/6129499/pexels-photo-6129499.jpeg',
      'https://images.pexels.com/photos/6129619/pexels-photo-6129619.jpeg',
    ],
    colors: ['Navy', 'Light Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Tops',
    isNew: true,
    rating: 4.8,
    reviews: 124,
    description: `
      <p>Our best-selling Classic V-Neck Scrub Top offers the perfect blend of comfort, durability, and style for healthcare professionals. Made from premium fabric that's soft against your skin, while maintaining its shape and color through countless washes.</p>
      
      <h4>Features:</h4>
      <ul>
        <li>Moisture-wicking fabric keeps you cool throughout your shift</li>
        <li>Four-way stretch provides excellent range of motion</li>
        <li>Two roomy front pockets for storing essentials</li>
        <li>Side vents for added comfort and mobility</li>
        <li>Wrinkle-resistant material stays neat all day</li>
      </ul>
      
      <h4>Material & Care:</h4>
      <p>76% Polyester, 20% Rayon, 4% Spandex</p>
      <p>Machine wash cold with like colors. Tumble dry low.</p>
    `,
    features: [
      'Anti-microbial treatment',
      'Moisture-wicking fabric',
      'Four-way stretch',
      'Wrinkle-resistant',
      'Fade-resistant colors'
    ],
    stock: 25
  },
  {
    id: '2',
    name: 'Jogger-Style Scrub Pants',
    price: 42.99,
    image: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg',
    images: [
      'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg',
      'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg',
      'https://images.pexels.com/photos/6749779/pexels-photo-6749779.jpeg',
    ],
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Scrub Bottoms',
    rating: 4.9,
    reviews: 98,
    description: `
      <p>Our Jogger-Style Scrub Pants combine athletic design with professional functionality. These modern scrub pants feature a tapered leg with a jogger-style ankle cuff, providing a contemporary look while meeting all workplace requirements.</p>
      
      <h4>Features:</h4>
      <ul>
        <li>Elastic waistband with drawstring for a secure fit</li>
        <li>Multiple pockets, including zippered security pocket</li>
        <li>Tapered leg with ribbed ankle cuff</li>
        <li>Four-way stretch fabric moves with you</li>
        <li>Moisture-wicking technology keeps you dry</li>
      </ul>
      
      <h4>Material & Care:</h4>
      <p>78% Polyester, 18% Rayon, 4% Spandex</p>
      <p>Machine wash cold with like colors. Tumble dry low.</p>
    `,
    features: [
      'Elastic waistband with drawstring',
      'Seven pocket design',
      'Four-way stretch fabric',
      'Tapered leg design',
      'Ribbed ankle cuff'
    ],
    stock: 18
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get product by ID from the mock data
  const product = products.find(p => p.id === params.id) || products[0];
  
  // Initialize selected color and size if not set
  if (!selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }
  
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const incrementQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      duration: 2000,
    });
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Please select options",
        description: "Color and size must be selected",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} - ${selectedColor}, Size ${selectedSize}`,
      duration: 2000,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 flex items-center gap-1"
        onClick={() => router.back()}
      >
        <ChevronLeft size={16} />
        Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-md bg-secondary/20">
            <img 
              src={product.images?.[selectedImage] || product.image} 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'ring-1 ring-border'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating || 0) ? 'fill-primary text-primary' : 'text-muted'} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="space-y-4">
            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`group relative h-10 w-10 overflow-hidden rounded-full border-2 ${
                      selectedColor === color ? 'border-primary' : 'border-border'
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                    <span 
                      className="absolute inset-0.5 rounded-full"
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
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Selected: {selectedColor}</p>
            </div>
            
            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={incrementQuantity}
                  disabled={quantity >= (product.stock || 10)}
                >
                  <Plus size={16} />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.stock ? `${product.stock} available` : 'In stock'}
                </span>
              </div>
            </div>
            
            {/* Add to Cart and Wishlist */}
            <div className="flex space-x-2 pt-2">
              <Button 
                size="lg" 
                className="flex-1 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="aspect-square p-0"
                onClick={toggleFavorite}
              >
                <Heart 
                  size={18} 
                  className={isFavorite ? "fill-primary text-primary" : ""}
                />
              </Button>
            </div>
          </div>
          
          {/* Product Info Tabs */}
          <div className="pt-4">
            <Tabs defaultValue="description">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4">
                <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              </TabsContent>
              <TabsContent value="features" className="py-4">
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Standard Shipping</h4>
                    <p className="text-muted-foreground">5-7 business days - $4.99</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Express Shipping</h4>
                    <p className="text-muted-foreground">2-3 business days - $9.99</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-muted-foreground">On orders over $75</p>
                  </div>
                  <p>For more information, please see our <a href="/shipping" className="text-primary underline">shipping policy</a>.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Similar Products */}
      <div className="mt-16">
        <SimilarProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
}