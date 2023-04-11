import { auth } from '../firebase';

export function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  let flexDir;
  let alignSelf;
  let msgColor;

  // compares user id on firestore document with local user
  // if it is equal, we know the current user sent the msg
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  if (messageClass === 'sent') {
    flexDir = 'flex-row-reverse';
    alignSelf = 'self-end';
    msgColor = 'bg-indigo-600';
  } else {
    flexDir = '';
    alignSelf = 'self-start';
    msgColor = 'bg-emerald-600';
  }

  return (
    <div className={`message ${messageClass} ${alignSelf}`}>
      <div className={`${msgColor} inline-block m-3 max-w-sm p-3 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
        <div className={`flex ${flexDir}`}>
          <img className={`mx-3 w-7 h-7 rounded-lg`} referrerPolicy='no-referrer' alt="current user profile" src={photoURL} />
          <p className="text-white">{text}</p>
        </div>
      </div>
    </div>

  )
}

