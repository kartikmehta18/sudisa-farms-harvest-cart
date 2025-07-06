
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: api.getBlogPosts,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  if (isLoading) {
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
        <h1 className="text-4xl font-bold mb-4">Farming Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover tips, insights, and stories from the world of organic farming
        </p>
      </div>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img
                    src={posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                    alt={posts[0]._embedded?.['wp:featuredmedia']?.[0]?.alt_text || posts[0].title.rendered}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      Featured
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(posts[0].date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {getReadingTime(posts[0].content.rendered)} min read
                    </div>
                  </div>
                  
                  <h3 
                    className="font-bold text-2xl mb-4 line-clamp-2 group-hover:text-primary transition-colors"
                    dangerouslySetInnerHTML={{ __html: posts[0].title.rendered }}
                  />
                  
                  <div 
                    className="text-muted-foreground mb-6 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: posts[0].excerpt.rendered }}
                  />
                  
                  <Link to={`/blog/${posts[0].id}`}>
                    <Button className="organic-gradient w-fit">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Blog Posts Grid */}
      {posts.length > 1 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                      alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {getReadingTime(post.content.rendered)} min
                      </div>
                    </div>
                    
                    <h3 
                      className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    
                    <div 
                      className="text-sm text-muted-foreground line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No blog posts found</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
