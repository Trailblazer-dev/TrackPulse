import api from '../index';
import type { ApiResponse } from '../types';

export interface NewsletterSubscriptionData {
  email: string;
}

export const newsletterApi = {
  subscribe: async (subscriptionData: NewsletterSubscriptionData): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post('/guest/newsletter/subscribe/', subscriptionData);
      return {
        data: response.data,
        status: response.status,
        message: 'Subscribed to newsletter successfully'
      };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },
};
