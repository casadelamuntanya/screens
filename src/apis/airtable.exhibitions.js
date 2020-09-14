import axios from 'axios';
import query from '@/config/exhibitions';
import { requestInterceptor, responseInterceptor } from './interceptors.airtable';

const api = axios.create({
	baseURL: `https://api.airtable.com/v0/${query.base}`,
	timeout: 5000,
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor);

export default api;
