
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Load user data from localStorage
    const savedUserData = localStorage.getItem('sudisha-user');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://i0.wp.com/sudishafarms.com/wp-content/uploads/2024/02/WhatsApp-Image-2025-03-27-at-11.33.17.jpeg?resize=1024%2C384&ssl=1"
              alt="Sudisha Farms"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Search & User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64"
              />
              <Button size="sm" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {/* User Profile */}
            <Link to="/profile">
              {userData ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-xs">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              )}
            </Link>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
