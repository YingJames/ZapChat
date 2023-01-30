import { auth } from '../firebase';

export function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // compares user id on firestore document with local user
  // if it is equal, we know the current user sent the msg
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img referrerPolicy='no-referrer' alt="current user profile" src={photoURL} />
      <p>{text}</p>
    </div>

  )
}

