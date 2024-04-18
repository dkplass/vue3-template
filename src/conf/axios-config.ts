import { handleRequest, handleRequestError } from '@/interceptors/axios-request-interceptor';
import { handleResponse, handleResponseError } from '@/interceptors/axios-response-interceptor';
import axios from 'axios';
import type { App } from 'vue';

const { VITE_APP_BASE_URL } = import.meta.env;

export default (app: App) => {
  axios.defaults.timeout = 5000;
  axios.defaults.baseURL = VITE_APP_BASE_URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => handleRequest(config, app), handleRequestError);
  axios.interceptors.response.use(handleResponse, handleResponseError);
};
