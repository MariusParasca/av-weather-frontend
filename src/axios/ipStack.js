import axios from 'axios';

const ipStackInstance = axios.create({
  baseURL: 'http://api.ipstack.com/',
});

ipStackInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    access_key: '7c48ea439ebc8085863649684b81cfe0',
    ...config.params,
  },
}));

export default ipStackInstance;
