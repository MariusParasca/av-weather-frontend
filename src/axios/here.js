import axios from 'axios';

const hereInstance = axios.create({
  baseURL: 'https://reverse.geocoder.ls.hereapi.com/6.2/',
});

hereInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    apiKey: 'C3AGWS58aqgaPYfRv_1Wk58NziTS9LAelBHC696ATWk',
    ...config.params,
  },
}));

export default hereInstance;
