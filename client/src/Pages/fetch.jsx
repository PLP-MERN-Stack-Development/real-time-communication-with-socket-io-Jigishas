// Enhanced React component with logging
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const DebugChatComponent = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            // Enable debug mode
            debug: true
        });

        // Log all events
        newSocket.onAny((eventName, ...args) => {
            console.log('📡 INCOMING EVENT:', eventName, args);
        });

        newSocket.on('connect', () => {
            console.log('✅ CONNECTED - Socket ID:', newSocket.id);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('❌ DISCONNECTED - Reason:', reason);
        });

        newSocket.on('chat message', (data) => {
            console.log('💬 MESSAGE RECEIVED:', data);
            setMessages(prev => [...prev, data]);
        });

        newSocket.on('user joined', (data) => {
            console.log('👤 USER JOINED:', data);
        });

        newSocket.on('user left', (data) => {
            console.log('👤 USER LEFT:', data);
        });

        // Log connection details
        console.log('🔗 Socket instance:', newSocket);
        console.log('🔄 Transport:', newSocket.io.engine.transport.name);

        setSocket(newSocket);

        return () => {
            console.log('🧹 Cleaning up socket connection');
            newSocket.close();
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        
        if (messageInput.trim() && socket) {
            const messageData = {
                id: Date.now(),
                username: 'User',
                text: messageInput,
                timestamp: new Date().toLocaleTimeString(),
                socketId: socket.id
            };

            console.log('📤 SENDING MESSAGE:', messageData);
            
            socket.emit('chat message', messageData);
            setMessageInput('');
        }
    };

    return (
        <div>
            <h2>Debug Chat</h2>
            <div>
                <strong>Socket Status:</strong> {socket?.connected ? 'Connected' : 'Disconnected'}
            </div>
            <div>
                <strong>Socket ID:</strong> {socket?.id}
            </div>
            
            <div style={{border: '1px solid #ccc', height: '300px', overflowY: 'scroll'}}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}:</strong> {msg.text}
                        <small> ({msg.timestamp})</small>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>

            <button onClick={() => console.log('🔍 Current messages:', messages)}>
                Log Messages to Console
            </button>
        </div>
    );
};
export default DebugChatComponent;