import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionDate } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBWP7yKJVq3iYCyvgN5WV9iCe4gwXQW3F0",
  authDomain: "zapchat-57459.firebaseapp.com",
  projectId: "zapchat-57459",
  storageBucket: "zapchat-57459.appspot.com",
  messagingSenderId: "725273853866",
  appId: "1:725273853866:web:be6d3450c46a44e0e775d3",
  measurementId: "G-7XRQQTLK97"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header>
      </header>
    </div>
  );
}

export default App;
