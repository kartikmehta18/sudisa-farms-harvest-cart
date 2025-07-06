
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: string) => {
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.images[0]?.src || '/placeholder.svg'}
              alt={product.images[0]?.alt || product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.sale_price && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            )}
            {product.stock_status === 'outofstock' && (
              <Badge className="absolute top-2 right-2 bg-gray-500">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <div 
              className="text-sm text-muted-foreground mb-3 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {product.sale_price ? (
                  <>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.sale_price)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.regular_price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            disabled={product.stock_status === 'outofstock'}
            className="w-full organic-gradient hover:opacity-90 transition-opacity"
          >
            {product.stock_status === 'outofstock' ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
