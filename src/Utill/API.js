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
    'Access-Control-Allow-Origin': 'https://222.122.110.106:19600/',
  },
});

API.interceptors.request.use(
  config => {
    console.log('API call url ::', config.baseURL + config.url);
    console.log('data', JSON.stringify(config.data));
    console.log('params', JSON.stringify(config.params));

    const account = JSON.parse(localStorage.getItem('account'));
    // console.log('account:', account);

    if ((account?.accessToken ?? '') !== '') {
      config.headers.authorization = account?.accessToken;
    }

    // console.log('config', config);
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  async error => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
API.interceptors.response.use(
  response => {
    // console.log('response:', response);
    return response;
  },
  error => {
    // console.log('response error:', error);
    const status = error?.response?.status ?? '';
    const message = error?.response?.data?.message ?? '';
    // console.log('response error status:', status);
    // console.log('response error message:', message);
    const moveLoginMsgArr = ['토큰 정보가 유효하지 않습니다.', '사용자를 찾을 수 없습니다.', '잘못된 접근입니다. 로그인 후 이동하여 주십시오.'];
    const moveStatusCode = [401,404];
    if (moveStatusCode.indexOf(status) !== -1 && moveLoginMsgArr.indexOf(message) !== -1) {
      localStorage.removeItem('account');
      document.location.replace('/login?redirect=' + encodeURI(window.location.pathname + window.location.search));
    }
    return Promise.reject(error);
  },
);
export const multipartHeader = {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': 'https://222.122.110.106:19600/'}};
export default API;