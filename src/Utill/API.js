import axios from 'axios';
export const wrapPromise = (promise) => {
  let status = 'pending';
  let response;

  const suspender = promise.then(
    res => {
      status = 'success';
      response = res;
    },
    err => {
      status = 'error';
      response = err;
    },
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
};
export const promiseWrapper = (promise) => {
  let status = 'pending';
  let result;

  const s = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return () => {
    switch (status) {
    case 'pending':
      throw s;
    case 'success':
      return result;
    case 'error':
      throw result;
    default:
      throw new Error('Unknown status');
    }
  };
};
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 0,
  data: {},
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

API.interceptors.request.use(
  config => {
    console.log('API call url ::', config.baseURL + config.url);
    console.log('data', JSON.stringify(config.data));
    console.log('params', JSON.stringify(config.params));

    // console.log('config', config);
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  async error => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
export const multipartHeader = {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}};
export default API;