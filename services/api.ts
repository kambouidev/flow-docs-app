import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  await new Promise((resolve) => setTimeout(() => resolve(true), 2500));
  return response.data;
};

export { apiClient, get };
