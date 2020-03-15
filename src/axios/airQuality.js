import axios from 'axios';

const airQualityInstance = axios.create({
  baseURL: 'http://localhost:8080/https://api.waqi.info/feed',
});

airQualityInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    token: '81f3b94d7c15ab512008c015af1b18d6db7fc60c',
    ...config.params,
  },
}));

export default airQualityInstance;
