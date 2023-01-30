import firebase from 'firebase/compat/app';
import { useState } from 'react';

// import { collection, query, where } from 'firebase/firestore';

export default function UserSearchBar() {
    const auth = firebase.auth();

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    
    const searchUser = (email) => {
        auth.fetchSignInMethodsForEmail(email)
        .then(providers => {
            if (providers.length === 0) {
                console.log("No user found with that email");
            } else {
                console.log("User found");
                console.log(providers);
            }
        })
    }

    const sendMessage = async(e) => {
        // prevent site from refreshing on form submit
        // find user in database
        e.preventDefault();

        searchUser(email);
        
        setEmail('');
    }
    return (
        <form onSubmit={sendMessage}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email"/>
          <button type="submit">👥🔎</button>
        </form> 
    );
};