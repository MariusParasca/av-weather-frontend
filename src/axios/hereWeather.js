import axios from 'axios';
import corsUrl from './cors-anywhere';

const hereWeatherInstance = axios.create({
  baseURL: `${corsUrl}https://api.waqi.info/feed`,
});

hereWeatherInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    apiKey: 'C3AGWS58aqgaPYfRv_1Wk58NziTS9LAelBHC696ATWk',
    ...config.params,
  },
}));

export default hereWeatherInstance;
