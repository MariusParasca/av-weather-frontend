import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCAJTKRmN6midO13QfdSHMzdHbNnmJtuhc',
  authDomain: 'av-weather-53882.firebaseapp.com',
  databaseURL: 'https://av-weather-53882.firebaseio.com',
  projectId: 'av-weather-53882',
  storageBucket: 'av-weather-53882.appspot.com',
  messagingSenderId: '896818180379',
  appId: '1:896818180379:web:714f2d73ba5a6b06e8e3be',
  measurementId: 'G-RGT36Y5FVJ',
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
