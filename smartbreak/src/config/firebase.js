// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpbnNN3XHdBJSeod-d0eNbLUGqYTPvsFw",
  authDomain: "smartbreak-fdb23.firebaseapp.com",
  projectId: "smartbreak-fdb23",
  storageBucket: "smartbreak-fdb23.appspot.com",
  messagingSenderId: "11410639967",
  appId: "1:11410639967:web:136126abf07b279ec81fea",
  measurementId: "G-5QDKCQ13NE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
