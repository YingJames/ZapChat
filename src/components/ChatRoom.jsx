import firebase from 'firebase/compat/app';
import { auth, firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import { ChatMessage } from './ChatMessage';

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

    // if form is empty, do not send message
    if (formValue === '') return;

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
      <div className="overflow-y-scroll">
        <div className="chat-window flex flex-col max-w-3xl mx-auto">
        {/* if there are messages,*/} 
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <div className="absolute bottom-4 left-0 right-0">
          <form className="" onSubmit={sendMessage}>
            <input className="text-input mx-auto mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type a message" value={formValue} onChange={e => setFormValue(e.target.value)}/>
          </form> 

        </div>
      </div>
    </>
  )
}