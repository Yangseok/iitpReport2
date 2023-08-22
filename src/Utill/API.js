import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
  data: {},
  headers: {
    'Content-Type': 'application/json; charset=UTF-8; multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
});

API.interceptors.request.use(
  config => {
    console.log('API call url ::', config.baseURL + config.url);
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  async error => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

export default API;