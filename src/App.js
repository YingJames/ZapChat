import './App.css';
import { Nav } from './components/Nav';
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
        <Nav />

      <section>
        {user && <ChatRoom />}
      </section>
    </div>
  );
}

export default App;
