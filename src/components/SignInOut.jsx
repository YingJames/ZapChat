import firebase from 'firebase/compat/app';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

async function registerNewUser(userDetails) {
  await setDoc(doc(db, "users", userDetails.uid), {
    uid: userDetails.uid,
    displayName: userDetails.displayName,
    email: userDetails.email,
    photoURL: userDetails.photoURL,
  });
};

export function SignIn() {

  const signInWithGoogle = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
      let isNewUser = result.additionalUserInfo.isNewUser;
      if (isNewUser) {
        registerNewUser(result.user);
      } else {
        console.log(`Existing user: ${result.user}`);
      }
      
    })
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}