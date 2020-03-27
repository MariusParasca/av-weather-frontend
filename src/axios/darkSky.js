import axios from 'axios';

const darkSkyInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9eee5b6ae9510673fa7ba72abd864301',
});

export default darkSkyInstance;
