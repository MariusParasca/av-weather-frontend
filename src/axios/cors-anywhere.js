export default !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/'
  : 'https://cors-anywhere.herokuapp.com/';
