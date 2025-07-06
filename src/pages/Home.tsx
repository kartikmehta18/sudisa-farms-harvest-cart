import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { api } from '@/services/api';
const Home = () => {
  const {
    data: products = []
  } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts
  });
  const {
    data: categories = []
  } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });
  const featuredProducts = products.slice(0, 8);
  const featuredCategories = categories.slice(0, 6);
  return <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 organic-gradient opacity-90" />
        <div className="absolute inset-0 leaf-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Premium Organic Seeds
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Cultivate your future with our carefully selected organic seeds and farming products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Shop Now
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-md">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-muted-foreground">
                All our seeds are certified organic and naturally grown
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and secure delivery to your doorstep
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-green-500">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">
                Professional guidance for your farming needs
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of organic farming products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCategories.map(category => <CategoryCard key={category.id} category={category} />)}
        </div>

        <div className="text-center">
          <Link to="/categories">
            <Button variant="outline" size="lg">
              View All Categories
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and high-quality seeds
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="organic-gradient">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="organic-gradient text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Organic Journey Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who trust Sudisha Farms for their organic farming needs
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;