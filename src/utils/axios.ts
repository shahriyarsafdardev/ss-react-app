import axios from 'axios';
import { ROOT_URL } from '../routes/paths';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: ROOT_URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
