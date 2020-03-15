import axios from 'axios';

const darkSkyInstance = axios.create({
  baseURL: 'http://localhost:8080/https://api.darksky.net/forecast/9eee5b6ae9510673fa7ba72abd864301',
});

export default darkSkyInstance;
