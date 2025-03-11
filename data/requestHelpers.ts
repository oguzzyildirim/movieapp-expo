//1 ana dizine .env oluşturulacak
//export const backendURL = process.env.API_URL; // 2 .env'den çekilecek

// axios ile generic bir handler yapmak

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const TIMEOUT = 30000;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.EXPO_PUBLIC_API_KEY;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          handleUnauthorized();
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          break;
      }
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

const getTokenFromStorage = (): string | null => {
  return null;
};

const handleUnauthorized = () => {
  console.log('User is unauthorized, redirecting to login...');
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

export default axiosInstance;