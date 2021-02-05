import firebase from 'firebase';

var firebaseConfig = {
    apiKey: 'AIzaSyAUgfo8C2a3zgi_1_IXP1E_evx6gfel6wQ',
    authDomain: 'makestories-machine-coding.firebaseapp.com',
    databaseURL: 'https://makestories-machine-coding.firebaseio.com',
    projectId: 'makestories-machine-coding',
    storageBucket: 'makestories-machine-coding.appspot.com',
    messagingSenderId: '55313329304',
    appId: '1:55313329304:web:7e0a57cdb7660210bff4ed',
    measurementId: 'G-KV0XTPWG29',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
