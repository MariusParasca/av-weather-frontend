import axios from 'axios';

const hereAutosuggestInstance = axios.create({
  baseURL: 'http://localhost:8080/https://places.sit.ls.hereapi.com/places/v1/autosuggest',
});

hereAutosuggestInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    apiKey: 'C3AGWS58aqgaPYfRv_1Wk58NziTS9LAelBHC696ATWk',
    ...config.params,
  },
}));

export default hereAutosuggestInstance;
