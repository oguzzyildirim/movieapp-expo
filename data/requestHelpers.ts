//1 ana dizine .env oluşturulacak
//export const backendURL = process.env.API_URL; // 2 .env'den çekilecek

// axios ile generic bir handler yapmak

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API base URL from .env file
const API_BASE_URL = process.env.API_URL;

// Request timeout in milliseconds
const TIMEOUT = 30000;

// Default axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for handling auth tokens, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get auth token from storage if available
    const token = process.env.API_KEY;
    
    // Add authorization header if token exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
axiosInstance.interceptors.response.use(
  (response) => {
    // You can transform successful responses here
    return response;
  },
  (error: AxiosError) => {
    // Handle different error status codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized errors (e.g., redirect to login)
          handleUnauthorized();
          break;
        case 403:
          // Handle forbidden errors
          break;
        case 404:
          // Handle not found errors
          break;
        case 500:
          // Handle server errors
          break;
        default:
          // Handle other error types
          break;
      }
    } else if (error.request) {
      // Handle no response errors (network issues)
      console.error('Network Error:', error.request);
    } else {
      // Handle unexpected errors
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to get token from storage
const getTokenFromStorage = (): string | null => {
  // Implementation depends on your storage method
  // For example, using AsyncStorage:
  // return await AsyncStorage.getItem('auth_token');
  
  // Placeholder implementation
  return null;
};

// Handle unauthorized errors (401)
const handleUnauthorized = () => {
  // Implement logout or redirect to login logic
  console.log('User is unauthorized, redirecting to login...');
  // Examples:
  // navigation.navigate('Login');
  // logout();
};

// Generic GET request
export const get = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url, { 
      ...config,
      params 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic POST request
export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic PUT request
export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic DELETE request
export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic PATCH request
export const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export the axios instance for more complex use cases
export default axiosInstance;