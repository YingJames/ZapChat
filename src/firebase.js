import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBWP7yKJVq3iYCyvgN5WV9iCe4gwXQW3F0",
  authDomain: "zapchat-57459.firebaseapp.com",
  projectId: "zapchat-57459",
  storageBucket: "zapchat-57459.appspot.com",
  messagingSenderId: "725273853866",
  appId: "1:725273853866:web:be6d3450c46a44e0e775d3",
  measurementId: "G-7XRQQTLK97"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();