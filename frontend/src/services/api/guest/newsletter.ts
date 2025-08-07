import api from '../index';
import type { ApiResponse } from '../types';

export interface NewsletterSubscription {
  email: string;
  interests?: string[];
}

export const newsletterApi = {
  subscribe: async (data: NewsletterSubscription): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<null>>('/newsletter/subscribe', data);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'Successfully subscribed to newsletter'
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }
};
