'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

export default function CheckoutSummary() {
  const { cartItems, cartTotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  
  const toggleSummary = () => setIsOpen(!isOpen);
  
  const shipping = cartTotal >= 75 ? 0 : 4.99;
  const tax = (cartTotal - discount) * 0.08; // Assuming 8% tax rate
  const orderTotal = cartTotal - discount + shipping + tax;
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(cartTotal * 0.1); // 10% off
      setPromoApplied(true);
    }
  };
  
  return (
    <Card className="sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg">Order Summary</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden"
          onClick={toggleSummary}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </CardHeader>
      
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-[1000px]' : 'max-h-0 lg:max-h-[1000px]'}`}>
        <CardContent className="pb-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.itemIdentifier} className="flex py-2">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-secondary/20 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-foreground text-background w-5 h-5 flex items-center justify-center text-xs rounded-bl">
                    {item.quantity}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.selectedColor}, {item.selectedSize}
                  </p>
                  <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          {!promoApplied && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Promo Code</p>
              <div className="flex">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="rounded-r-none"
                />
                <Button
                  onClick={handleApplyPromo}
                  className="rounded-l-none"
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            {promoApplied && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Discount (WELCOME10)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="w-full">
            <Separator className="mb-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 lg:hidden">
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  Edit Cart
                </Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}