import axios from 'axios';

const ipStackInstance = axios.create({
  baseURL: 'https://ipinfo.io/',
});

ipStackInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    token: '65ecef81a3501e',
    ...config.params,
  },
}));

export default ipStackInstance;
