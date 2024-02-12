import axios from 'axios';
import UserService from './UserService'

  const instance = axios.create();
  
  instance.interceptors.request.use(
    config => {
      const token = UserService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  
  export default instance;