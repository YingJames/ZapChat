import firebase from 'firebase/compat/app';
import { auth, firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import { ChatMessage } from './ChatMessage';
import { SignOut } from './SignInOut';

export function ChatRoom() {
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