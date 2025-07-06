
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

  // Blog Posts
  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
      const response = await axios.get(`${wpBaseURL}/posts`, {
        params: {
          _embed: true,
          per_page: 12,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },
};
