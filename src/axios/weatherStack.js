import axios from 'axios';

const weatherStackInstance = axios.create({
  baseURL: 'http://api.weatherstack.com',
});

weatherStackInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    access_key: '45ed8465d72e24141cad100cdf432404',
    ...config.params,
  },
}));

export default weatherStackInstance;
