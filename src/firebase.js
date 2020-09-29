import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDQH_VgxJnx93dpZgwIaNGH5ZmZEQDTMWY",
    authDomain: "todo-app-61adb.firebaseapp.com",
    databaseURL: "https://todo-app-61adb.firebaseio.com",
    projectId: "todo-app-61adb",
    storageBucket: "todo-app-61adb.appspot.com",
    messagingSenderId: "163717519875",
    appId: "1:163717519875:web:91c0121e29682dd1730c36",
    measurementId: "G-0FT3E2MLG0"
});

const db = firebase.firestore();

export default db;