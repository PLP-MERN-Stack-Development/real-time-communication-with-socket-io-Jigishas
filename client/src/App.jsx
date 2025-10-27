import React from 'react';
import socket from './socket/socket';
//import ChatComponent from './Hooks/hooks';
import DebugChatComponent from './Pages/fetch';
import Chat from './components/Chat';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>Real-Time Communication App</h1>
         <Chat />

        <DebugChatComponent />

        <socket />
      </div>
    </AuthProvider>
  );
}

export default App;
