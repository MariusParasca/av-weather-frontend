import axios from 'axios';

const hereWeatherInstance = axios.create({
  baseURL: 'http://localhost:8080/https://weather.ls.hereapi.com/weather/1.0/report.json',
});

hereWeatherInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    apiKey: 'C3AGWS58aqgaPYfRv_1Wk58NziTS9LAelBHC696ATWk',
    ...config.params,
  },
}));

export default hereWeatherInstance;
