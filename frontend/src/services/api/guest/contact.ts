import api from '../index';
import type { ApiResponse } from '../types';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactApi = {
  submitContactForm: async (formData: ContactFormData): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post('/guest/contact/', formData);
      return {
        data: response.data,
        status: response.status,
        message: 'Contact form submitted successfully'
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
};
