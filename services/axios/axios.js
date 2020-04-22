import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { Service } from 'axios-middleware';

const service = new Service(axios);

service.register({
  onRequest(config) {
    const token = AsyncStorage.getItem('token');
    if (token) {
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  onSync(promise) {
    return promise;
  },
  onResponse(response) {
    return response;
  }
});

export default axios