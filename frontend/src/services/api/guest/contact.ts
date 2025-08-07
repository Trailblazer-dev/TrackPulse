import api from '../index';
import type { ApiResponse } from '../types';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactApi = {
  submitContactForm: async (formData: ContactFormData): Promise<ApiResponse<null>> => {
    try {
      // When API is ready:
      // const response = await api.post<ApiResponse<null>>('/contact', formData);
      // return response.data;
      
      // Mock response
      return Promise.resolve({
        data: null,
        status: 200,
        message: 'Thank you for your message. We will get back to you soon!'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};
