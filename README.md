# Real-Time Communication App with Socket.io

A full-stack real-time chat application built with React, Node.js, Express, and Socket.io. Features user authentication, real-time messaging, typing indicators, and online user tracking.

## 🚀 Features

![alt text](<Screenshot 2025-10-27 165335-1.png>)

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: JWT-based authentication system
- **Online Users**: See who's currently online in the chat
- **Typing Indicators**: Know when someone is typing
- **Message History**: Persistent message storage with MongoDB
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Debug Component**: Built-in debugging tools for development

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Socket.io-client** - Real-time communication
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-communication-with-socket-io-Jigishas
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```

   For production, you might want to use MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
   ```

## 🚀 Usage

### Development Mode

1. **Start the server** (from project root)
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:3000`

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to access the application

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Messages
- `GET /api/messages` - Get all messages (requires authentication)

### Socket Events

#### Client → Server
- `chat message` - Send a message
- `typing start` - Start typing indicator
- `typing stop` - Stop typing indicator

#### Server → Client
- `chat message` - Receive a message
- `online users` - Update online users list
- `user joined` - User joined notification
- `user left` - User left notification
- `user typing` - User started typing
- `user stopped typing` - User stopped typing

## 🏗️ Project Structure

```
real-time-communication-with-socket-io-Jigishas/
├── client/                          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthForm.jsx         # Login/Register form
│   │   │   └── Chat.jsx             # Main chat component
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── hooks/
│   │   │   ├── useSocket.jsx        # Socket connection hook
│   │   │   └── hooks.jsx            # Additional hooks
│   │   ├── Pages/
│   │   │   └── fetch.jsx            # Debug component
│   │   ├── socket/
│   │   │   └── socket.js            # Socket configuration
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # App entry point
│   ├── package.json
│   └── vite.config.js
├── server/                          # Node.js backend
│   ├── config/
│   │   ├── db.js                    # Database configuration
│   │   └── servers.js               # Server setup
│   ├── controllers/
│   │   ├── auth.js                  # Authentication logic
│   │   └── messages.js              # Message handling
│   ├── middleware/
│   │   └── auth.js                  # Authentication middleware
│   ├── models/
│   │   ├── User.js                  # User model
│   │   └── Message.js               # Message model
│   ├── routes/
│   │   ├── auth.js                  # Auth routes
│   │   └── messages.js              # Message routes
│   ├── socket/
│   │   └── socketHandler.js         # Socket event handlers
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env                         # Environment variables
├── README.md                        # Project documentation
└── TODO.md                          # Development tasks
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration**: Users create an account with username and password
2. **Login**: Users receive a JWT token upon successful login
3. **Protected Routes**: API endpoints require valid JWT tokens
4. **Socket Authentication**: Socket connections include JWT tokens for user identification

## 🐛 Debugging

The application includes a debug component (`DebugChatComponent`) that provides:

- Real-time socket event logging
- Connection status monitoring
- Message history inspection
- Manual message sending for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port 3000
   netstat -ano | findstr :3000
   # Kill the process (replace PID)
   taskkill /PID <PID> /F
   ```

2. **MongoDB connection issues**
   - Ensure MongoDB is running locally
   - Check your `MONGODB_URI` in `.env`
   - For MongoDB Atlas, ensure network access is configured

3. **Socket connection issues**
   - Verify server is running on port 3000
   - Check CORS settings in server configuration
   - Ensure client is connecting to correct URL

### Development Tips

- Use the browser's developer tools to inspect socket events
- Check server console for connection logs
- The debug component provides real-time event monitoring
- Use environment variables for configuration management

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Open an issue on the repository
4. Check the Socket.io documentation for real-time communication details

---

**Happy chatting! 🎉**
