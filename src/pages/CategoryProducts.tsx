
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import ProductCard from '@/components/ProductCard';

const CategoryProducts = () => {
  const { id } = useParams<{ id: string }>();

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['category-products', id],
    queryFn: () => api.getProductsByCategory(Number(id)),
    enabled: !!id,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });

  const category = categories.find(cat => cat.id.toString() === id);

  if (productsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {category?.name || 'Category Products'}
        </h1>
        {category?.description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        )}
        <p className="text-muted-foreground mt-2">
          {products.length} products found
        </p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No products found in this category</p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
