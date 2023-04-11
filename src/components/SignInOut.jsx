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
      <button onClick={signInWithGoogle}type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
        Sign in with Google
      </button>
  )
}

export function SignOut() {
  return auth.currentUser && (
    <button 
      className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => auth.signOut()}
    >Sign Out</button>
  )
}