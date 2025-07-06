
export interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  stock_quantity: number;
  sku: string;
  slug: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: {
    id: number;
    src: string;
    alt: string;
  } | null;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}
