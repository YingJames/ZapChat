import './App.css';
import UserSearchBar from './components/UserSearchBar';
import { SignIn } from './components/SignInOut';
import { ChatRoom } from './components/ChatRoom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
      </header>

      <section >
        <UserSearchBar />
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
