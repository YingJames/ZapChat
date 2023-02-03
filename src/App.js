import './App.css';
import { Navbar } from './components/Navbar';
import { SignIn } from './components/SignInOut';
import { ChatRoom } from './components/ChatRoom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  document.body.style.overflow = "hidden"; 

  return (
    <div className="App">
      <header>
      </header>
        <Navbar />

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
