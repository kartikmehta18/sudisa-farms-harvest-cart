
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const Blog = () => {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['all-blog-posts'],
    queryFn: api.getAllBlogPosts,
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

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Unable to load blog posts</h2>
          <p className="text-muted-foreground mb-6">There was an error fetching the blog posts. Please try again later.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Farming Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          Discover tips, insights, and stories from the world of organic farming. 
          Learn from experts and grow your knowledge along with your crops.
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            📚 {posts.length} Articles Available
          </Badge>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No blog posts found</h2>
          <p className="text-muted-foreground">Check back later for new farming tips and insights!</p>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Article</h2>
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden order-2 lg:order-1">
                    <img
                      src={posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                      alt={posts[0]._embedded?.['wp:featuredmedia']?.[0]?.alt_text || stripHtml(posts[0].title.rendered)}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">
                        ⭐ Featured
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(posts[0].date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {getReadingTime(posts[0].content.rendered)} min read
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-2xl lg:text-3xl mb-4 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                      {stripHtml(posts[0].title.rendered)}
                    </h3>
                    
                    <div className="text-muted-foreground mb-8 line-clamp-3 text-lg leading-relaxed">
                      {stripHtml(posts[0].excerpt.rendered)}
                    </div>
                    
                    <Link to={`/blog/${posts[0].id}`}>
                      <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all group w-fit">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          {posts.length > 1 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">All Articles</h2>
                <Badge variant="outline" className="text-sm">
                  {posts.length - 1} More Articles
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'}
                          alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || stripHtml(post.title.rendered)}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {getReadingTime(post.content.rendered)} min
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                          {stripHtml(post.title.rendered)}
                        </h3>
                        
                        <div className="text-sm text-muted-foreground line-clamp-3 mb-5 leading-relaxed">
                          {stripHtml(post.excerpt.rendered)}
                        </div>
                        
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="outline" size="sm" className="w-full group-hover:bg-green-50 group-hover:border-green-500 group-hover:text-green-700 transition-all">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
