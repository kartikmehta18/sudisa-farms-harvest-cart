
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={category.image?.src || '/placeholder.svg'}
              alt={category.image?.alt || category.name}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-white/90 text-black hover:bg-white">
                {category.count} Products
              </Badge>
            </div>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
