import baseAxios from 'axios';

// https://j5a403.p.ssafy.io

// 기본 axios 설정
const axios = baseAxios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// access_token 정보를 axios 헤더에 넣어주는 작업
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

export default axios;
