import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA-5phCIGhpRaYb2jVzfT2RbR-ahOZEQt0",
    authDomain: "linkedinclone-2a45d.firebaseapp.com",
    projectId: "linkedinclone-2a45d",
    storageBucket: "linkedinclone-2a45d.appspot.com",
    messagingSenderId: "439960920072",
    appId: "1:439960920072:web:f61f41e67cd816df7231bd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();


export { db, auth }