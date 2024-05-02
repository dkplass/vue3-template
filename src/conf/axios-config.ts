import { handleRequest, handleRequestError } from '@/interceptors/axios-request-interceptor';
import { handleResponse, handleResponseError } from '@/interceptors/axios-response-interceptor';
import axios from 'axios';
import type { App } from 'vue';

const { VITE_APP_BASE_URL, VITE_SESSION_EXPIRATION } = import.meta.env;

export default (app: App) => {
  axios.defaults.timeout = VITE_SESSION_EXPIRATION;
  axios.defaults.baseURL = VITE_APP_BASE_URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => handleRequest(config, app), handleRequestError);
  axios.interceptors.response.use(handleResponse, handleResponseError);
};
