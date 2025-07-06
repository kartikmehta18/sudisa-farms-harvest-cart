
import axios from 'axios';
import { Product, Category, BlogPost } from '@/types';

const wcBaseURL = 'https://sudishafarms.com/wp-json/wc/v3';
const wpBaseURL = 'https://sudishafarms.com/wp-json/wp/v2';

const wcAuth = {
  username: 'ck_fc573dbf4822ccb7e22f0acba06b018295b86dfb',
  password: 'cs_58d91c79d4d471c09f6b4826c7aea439bb558e18',
};

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${wcBaseURL}/products`, {
        auth: wcAuth,
        params: {
          per_page: 50,
          status: 'publish',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProduct: async (id: number): Promise<Product | null> => {
    try {
      const response = await axios.get(`${wcBaseURL}/products/${id}`, {
        auth: wcAuth,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await axios.get(`${wcBaseURL}/products/categories`, {
        auth: wcAuth,
        params: {
          per_page: 50,
          hide_empty: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    try {
      const response = await axios.get(`${wcBaseURL}/products`, {
        auth: wcAuth,
        params: {
          category: categoryId,
          per_page: 50,
          status: 'publish',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Blog Posts - fetch all posts properly
  getBlogPosts: async (page: number = 1, perPage: number = 24): Promise<BlogPost[]> => {
    try {
      const response = await axios.get(`${wpBaseURL}/posts`, {
        params: {
          _embed: true,
          per_page: perPage,
          page: page,
          status: 'publish'
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  getBlogPost: async (id: number): Promise<BlogPost | null> => {
    try {
      const response = await axios.get(`${wpBaseURL}/posts/${id}`, {
        params: {
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  // Get all blog posts (fetch all pages properly)
  getAllBlogPosts: async (): Promise<BlogPost[]> => {
    try {
      let allPosts: BlogPost[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        try {
          const response = await axios.get(`${wpBaseURL}/posts`, {
            params: {
              _embed: true,
              per_page: 24,
              page: page,
              status: 'publish'
            },
          });

          if (response.data && response.data.length > 0) {
            allPosts = [...allPosts, ...response.data];
            page++;
            
            // Check if we got less than requested, meaning we're at the end
            if (response.data.length < 24) {
              hasMore = false;
            }
          } else {
            hasMore = false;
          }
        } catch (pageError: any) {
          console.log(`No more pages available at page ${page}`);
          hasMore = false;
        }
      }

      console.log(`Fetched ${allPosts.length} total blog posts`);
      return allPosts;
    } catch (error) {
      console.error('Error fetching all blog posts:', error);
      return [];
    }
  },

  // Cart API
  addToCart: async (productId: number, quantity: number = 1): Promise<any> => {
    try {
      const response = await axios.post(`${wcBaseURL}/cart/add-item`, {
        id: productId,
        quantity: quantity,
      }, {
        auth: wcAuth,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Coupon API - fetch available coupons (not applied ones)
  getCoupons: async (): Promise<any[]> => {
    try {
      const response = await axios.get(`${wcBaseURL}/coupons`, {
        auth: wcAuth,
        params: {
          per_page: 50,
          status: 'publish',
        },
      });
      
      // Filter only active/available coupons
      const availableCoupons = response.data.filter((coupon: any) => {
        const now = new Date();
        const expiryDate = coupon.date_expires ? new Date(coupon.date_expires) : null;
        
        return coupon.status === 'publish' && 
               (!expiryDate || expiryDate > now) &&
               coupon.usage_count < coupon.usage_limit;
      });
      
      console.log(`Found ${availableCoupons.length} available coupons`);
      return availableCoupons;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return [];
    }
  },

  // Apply coupon
  applyCoupon: async (couponCode: string): Promise<any> => {
    try {
      const response = await axios.post('https://sudishafarms.com/', {
        'wc-ajax': 'apply_coupon_on_click',
        coupon_code: couponCode,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  },

  // Order Management
  createOrder: async (orderData: any): Promise<any> => {
    try {
      const response = await axios.post(`${wcBaseURL}/orders`, orderData, {
        auth: wcAuth,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getOrders: async (customerId?: number): Promise<any[]> => {
    try {
      const params: any = {
        per_page: 50,
      };
      
      if (customerId) {
        params.customer = customerId;
      }

      const response = await axios.get(`${wcBaseURL}/orders`, {
        auth: wcAuth,
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  // Payment processing
  processPayment: async (orderId: number, paymentData: any): Promise<any> => {
    try {
      const response = await axios.post(`https://sudishafarms.com/checkout-2/order-pay/${orderId}/`, {
        ...paymentData,
        pay_for_order: true,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },
};
