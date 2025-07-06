
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sudisha Farms</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your trusted partner in organic farming, providing premium quality seeds and sustainable agricultural solutions for over a decade.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-0 shadow-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To promote sustainable agriculture by providing farmers with the highest quality organic seeds and farming solutions, supporting both environmental health and agricultural productivity.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👁️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To be the leading provider of organic farming solutions, creating a sustainable future where agriculture works in harmony with nature for generations to come.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Sustainability</h4>
              <p className="text-muted-foreground">
                We are committed to environmentally responsible farming practices that protect our planet.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Quality</h4>
              <p className="text-muted-foreground">
                Every product we offer meets the highest standards of quality and purity.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Trust</h4>
              <p className="text-muted-foreground">
                We build lasting relationships with our customers through transparency and reliability.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="prose max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              Founded in 2010, Sudisha Farms began as a small family business with a simple mission: to provide farmers with access to the highest quality organic seeds. What started as a local endeavor has grown into a trusted name in sustainable agriculture across the region.
            </p>
            <p className="text-lg mb-6">
              Our founder, inspired by traditional farming wisdom and modern sustainable practices, recognized the need for reliable sources of organic farming materials. Through years of research, partnerships with certified organic growers, and dedication to quality, we've built a comprehensive catalog of premium seeds and farming solutions.
            </p>
            <p className="text-lg">
              Today, Sudisha Farms serves thousands of farmers, gardeners, and agricultural enthusiasts who share our commitment to sustainable, organic farming practices. We continue to expand our offerings while maintaining our core values of quality, sustainability, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center organic-gradient text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Become part of the Sudisha Farms family and start your journey towards sustainable, organic farming today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Products
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
