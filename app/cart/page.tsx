'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Label } from '@/components/ui/label';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal >= 75 ? 0 : 4.99;
  const tax = (cartTotal - discount) * 0.08; // Assuming 8% tax rate
  const orderTotal = cartTotal - discount + shipping + tax;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(cartTotal * 0.1); // 10% off
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              Start Shopping
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted p-4 hidden md:grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <h3 className="font-medium">Product</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-medium">Price</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-medium">Quantity</h3>
              </div>
              <div className="col-span-2 text-right">
                <h3 className="font-medium">Total</h3>
              </div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.itemIdentifier} className="p-4 border-t first:border-t-0">
                <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                  {/* Product Info (Mobile & Desktop) */}
                  <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 overflow-hidden rounded-md bg-secondary/20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>Color: {item.selectedColor}</span>
                        <span>•</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                      <div className="md:hidden text-sm font-medium mt-2">
                        ${item.price.toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.itemIdentifier!)}
                        className="text-sm text-destructive hover:underline flex items-center gap-1 mt-2 md:hidden"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price (Desktop) */}
                  <div className="md:col-span-2 text-center hidden md:block">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="md:col-span-2 md:text-center flex items-center mb-4 md:mb-0 md:justify-center">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.itemIdentifier!, item.quantity - 1);
                          }
                        }}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.itemIdentifier!, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Total & Remove (Desktop) */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.itemIdentifier!)}
                      className="text-destructive hover:text-destructive/80 ml-4 hidden md:flex items-center"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-muted flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => clearCart()}
                className="gap-2"
              >
                <Trash2 size={14} />
                Clear Cart
              </Button>
              
              <Link href="/products">
                <Button variant="outline" size="sm">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="rounded-lg border overflow-hidden sticky top-20">
            <div className="bg-muted p-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
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
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              
              {!promoApplied && (
                <div className="pt-2">
                  <Label htmlFor="promo" className="text-sm">Promo Code</Label>
                  <div className="flex mt-1">
                    <Input
                      id="promo"
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Try "WELCOME10" for 10% off
                  </p>
                </div>
              )}
              
              <Button 
                size="lg" 
                className="w-full mt-4"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-center text-muted-foreground pt-2">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}