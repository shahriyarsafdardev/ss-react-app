import axios from 'axios';
import { ROOT_URL } from '../routes/paths';

// ----------------------------------------------------------------------
const getToken = () => window.localStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL: ROOT_URL
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
