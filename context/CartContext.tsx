'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Load cart from localStorage on client-side
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }

    // Calculate totals
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);

    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(count);
  }, [cartItems]);

  // Add item to cart (or update if exists)
  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Generate a unique identifier for items with color/size combinations
      const itemIdentifier = `${newItem.id}-${newItem.selectedColor}-${newItem.selectedSize}`;
      
      // Check if item already exists with same color and size
      const existingItemIndex = prev.findIndex(
        item => 
          item.id === newItem.id && 
          item.selectedColor === newItem.selectedColor && 
          item.selectedSize === newItem.selectedSize
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        // Add new item
        return [...prev, { ...newItem, itemIdentifier }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemIdentifier: string) => {
    setCartItems((prev) => 
      prev.filter((item) => item.itemIdentifier !== itemIdentifier)
    );
  };

  // Update item quantity
  const updateQuantity = (itemIdentifier: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.itemIdentifier === itemIdentifier ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}