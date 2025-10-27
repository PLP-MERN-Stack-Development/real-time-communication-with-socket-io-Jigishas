import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    
    const { socket, isConnected } = useSocket('http://localhost:3001');
    const { user, logout } = useAuth();
    const messagesEndRef = useRef(null);

    // Scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Socket event listeners
    useEffect(() => {
        if (!socket) return;

        const handleChatMessage = (data) => {
            setMessages(prev => [...prev, data]);
        };

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users);
        };

        const handleUserJoined = (data) => {
            setMessages(prev => [...prev, {
                type: 'system',
                message: `${data.username} joined the chat`
            }]);
        };

        const handleUserLeft = (data) => {
            setMessages(prev => [...prev, {
                type: 'system',
                message: `${data.username} left the chat`
            }]);
        };

        const handleUserTyping = (data) => {
            setTypingUsers(prev => {
                const filtered = prev.filter(u => u.userId !== data.userId);
                return [...filtered, data];
            });
        };

        const handleUserStoppedTyping = (data) => {
            setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
        };

        socket.on('chat message', handleChatMessage);
        socket.on('online users', handleOnlineUsers);
        socket.on('user joined', handleUserJoined);
        socket.on('user left', handleUserLeft);
        socket.on('user typing', handleUserTyping);
        socket.on('user stopped typing', handleUserStoppedTyping);

        return () => {
            socket.off('chat message', handleChatMessage);
            socket.off('online users', handleOnlineUsers);
            socket.off('user joined', handleUserJoined);
            socket.off('user left', handleUserLeft);
            socket.off('user typing', handleUserTyping);
            socket.off('user stopped typing', handleUserStoppedTyping);
        };
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        
        if (messageInput.trim() && socket) {
            socket.emit('chat message', {
                text: messageInput
            });
            setMessageInput('');
            stopTyping();
        }
    };

    const startTyping = () => {
        if (socket) {
            socket.emit('typing start');
        }
    };

    const stopTyping = () => {
        if (socket) {
            socket.emit('typing stop');
        }
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
        startTyping();
    };

    if (!user) {
        return <div>Please log in to chat</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {/* Header */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                padding: '10px',
                background: '#f5f5f5',
                borderRadius: '8px'
            }}>
                <div>
                    <h2>Chat Room</h2>
                    <div>Welcome, <strong>{user.username}</strong>!</div>
                    <div>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</div>
                </div>
                <button onClick={logout} style={{ padding: '8px 16px' }}>
                    Logout
                </button>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Online Users */}
                <div style={{ width: '200px' }}>
                    <h3>Online Users ({onlineUsers.length})</h3>
                    <div style={{ 
                        background: '#f9f9f9', 
                        padding: '10px', 
                        borderRadius: '8px',
                        maxHeight: '400px',
                        overflowY: 'auto'
                    }}>
                        {onlineUsers.map(onlineUser => (
                            <div key={onlineUser.userId} style={{ 
                                padding: '5px', 
                                margin: '2px 0',
                                background: onlineUser.userId === user.userId ? '#e3f2fd' : 'transparent'
                            }}>
                                {onlineUser.username} 
                                {onlineUser.userId === user.userId && ' (You)'}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div style={{ flex: 1 }}>
                    {/* Typing Indicators */}
                    {typingUsers.length > 0 && (
                        <div style={{ 
                            padding: '5px', 
                            fontStyle: 'italic', 
                            color: '#666',
                            marginBottom: '10px'
                        }}>
                            {typingUsers.map(u => u.username).join(', ')} 
                            {typingUsers.length === 1 ? ' is' : ' are'} typing...
                        </div>
                    )}

                    {/* Messages */}
                    <div style={{ 
                        height: '400px', 
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        overflowY: 'auto',
                        marginBottom: '10px',
                        background: '#fff'
                    }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ 
                                marginBottom: '10px',
                                padding: '8px',
                                background: msg.type === 'system' ? '#fff3cd' : 
                                          msg.userId === user.userId ? '#d1ecf1' : '#f8f9fa',
                                borderRadius: '8px',
                                borderLeft: msg.type === 'system' ? '3px solid #ffc107' : 
                                           msg.userId === user.userId ? '3px solid #17a2b8' : '3px solid #6c757d'
                            }}>
                                {msg.type === 'system' ? (
                                    <div style={{ textAlign: 'center', color: '#856404' }}>
                                        {msg.message}
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            marginBottom: '5px'
                                        }}>
                                            <strong>{msg.username}</strong>
                                            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                                        </div>
                                        <div>{msg.text}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <form onSubmit={sendMessage}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={messageInput}
                                onChange={handleInputChange}
                                onBlur={stopTyping}
                                placeholder="Type your message..."
                                disabled={!isConnected}
                                style={{ 
                                    flex: 1, 
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <button 
                                type="submit" 
                                disabled={!isConnected || !messageInput.trim()}
                                style={{ 
                                    padding: '10px 20px',
                                    background: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: isConnected && messageInput.trim() ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;