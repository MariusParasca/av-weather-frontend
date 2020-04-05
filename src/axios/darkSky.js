import axios from 'axios';
import corsUrl from './cors-anywhere';

const darkSkyInstance = axios.create({
  baseURL: `${corsUrl}https://api.waqi.info/feed`,
});

export default darkSkyInstance;
