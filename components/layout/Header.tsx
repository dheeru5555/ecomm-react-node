'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-white shadow-md dark:bg-gray-900' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleMenu}>
              <Menu size={24} />
            </Button>
            <Link href="/" className="text-xl font-bold text-primary">
              dheemit
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {['Scrub Tops', 'Scrub Bottoms', 'Lab Coats', 'Accessories'].map((category) => (
                      <li key={category}>
                        <Link
                          href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search size={20} />
            </Button>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart size={20} />
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out", 
            searchOpen ? "max-h-16 opacity-100 py-2" : "max-h-0 opacity-0 py-0"
          )}
        >
          <div className="relative">
            <Input 
              placeholder="Search for products..." 
              className="pr-10"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              onClick={toggleSearch}
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className="text-xl font-bold text-primary">
              dheemit
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X size={24} />
            </Button>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-6">
              <li>
                <Link 
                  href="/products" 
                  className="text-lg font-medium hover:text-primary"
                  onClick={toggleMenu}
                >
                  All Products
                </Link>
              </li>
              <li>
                <div className="text-lg font-medium">Categories</div>
                <ul className="mt-2 ml-4 space-y-2">
                  {['Scrub Tops', 'Scrub Bottoms', 'Lab Coats', 'Accessories'].map((category) => (
                    <li key={category}>
                      <Link 
                        href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-primary"
                        onClick={toggleMenu}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-lg font-medium hover:text-primary"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-lg font-medium hover:text-primary"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/account" 
                  className="text-lg font-medium hover:text-primary"
                  onClick={toggleMenu}
                >
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}