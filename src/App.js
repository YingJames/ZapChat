import { useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
      </header>

      <section >
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');

  // uses messages collection from the firestore database
  const query = messagesRef.orderBy('createdAt').limit(25);

  // messages is an array fetched from the query
  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    // prevent site from refreshing on form submit
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('');
  };


  return (
    <>
      <div>
        {/* if there are messages,*/} 
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={e => setFormValue(e.target.value)}/>
          <button type="submit">⚡️</button>
        </form> 

        <SignOut />
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  // compares user id on firestore document with local user
  // if it is equal, we know the current user sent the msg
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img alt="current user profile" src={props.message.photoURL} />
      <p>{text}</p>
    </div>

  )
}

export default App;
