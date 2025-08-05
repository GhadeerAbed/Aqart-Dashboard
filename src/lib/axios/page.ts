// import axios, {
//   AxiosRequestConfig,
//   AxiosError,
//   AxiosResponse,
//   HeadersDefaults,
// } from "axios";
// import { API_ENDPOINT, URL_PATHS } from "../../data/page";

// const axiosInstance = axios.create({
//   baseURL: API_ENDPOINT,
// });
// const requestArray: Array<AxiosResponse> = [];

// export type { AxiosRequestConfig, AxiosError, AxiosResponse };

// const isAxiosError = axios.isAxiosError;

// export { isAxiosError };

// export default axiosInstance;
import axios from 'axios';
import { API_ENDPOINT } from '../../data/page';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response if successful
    return response;
  },
  (error) => {
    // Check if the error response indicates an expired token
    if (error.response && error.response.data && error.response.data.message === "Expired token, please login again..") {
      // Redirect to the login page
      localStorage.removeItem('authData')
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

