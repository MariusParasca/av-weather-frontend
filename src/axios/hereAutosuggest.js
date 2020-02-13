import axios from 'axios';

const hereAutosuggestInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://places.sit.ls.hereapi.com/places/v1/autosuggest',
});

hereAutosuggestInstance.interceptors.request.use(config => ({
  ...config,
  params: {
    apiKey: 'C3AGWS58aqgaPYfRv_1Wk58NziTS9LAelBHC696ATWk',
    ...config.params,
  },
}));

export default hereAutosuggestInstance;
