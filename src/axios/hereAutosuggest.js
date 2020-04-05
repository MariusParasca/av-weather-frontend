import axios from 'axios';
import corsUrl from './cors-anywhere';

console.log('corsUrl', corsUrl);

const hereAutosuggestInstance = axios.create({
  baseURL: `${corsUrl}https://api.waqi.info/feed`,
});

hereAutosuggestInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    apiKey: 'C3AGWS58aqgaPYfRv_1Wk58NziTS9LAelBHC696ATWk',
    ...config.params,
  },
}));

export default hereAutosuggestInstance;
