import axios from 'axios';
import corsUrl from './cors-anywhere';

const darkSkyInstance = axios.create({
  baseURL: `${corsUrl}https://api.darksky.net/forecast/9eee5b6ae9510673fa7ba72abd864301`,
});

export default darkSkyInstance;
