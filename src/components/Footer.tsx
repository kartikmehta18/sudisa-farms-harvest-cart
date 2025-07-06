
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">SF</span>
              </div>
              <span className="font-bold text-xl">Sudisha Farms</span>
            </div>
            <p className="text-primary-foreground/80">
              Premium organic seeds and farming products for sustainable agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/products" className="block hover:text-accent transition-colors">
                Products
              </Link>
              <Link to="/categories" className="block hover:text-accent transition-colors">
                Categories
              </Link>
              <Link to="/blog" className="block hover:text-accent transition-colors">
                Blog
              </Link>
              <Link to="/about" className="block hover:text-accent transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Customer Service</h4>
            <div className="space-y-2">
              <Link to="/contact" className="block hover:text-accent transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="block hover:text-accent transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block hover:text-accent transition-colors">
                Returns
              </Link>
              <Link to="/faq" className="block hover:text-accent transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Connected</h4>
            <p className="text-primary-foreground/80">
              Get updates on new products and farming tips.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-sm"
              />
              <button className="px-4 py-2 bg-accent hover:bg-accent/90 rounded text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Sudisha Farms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
