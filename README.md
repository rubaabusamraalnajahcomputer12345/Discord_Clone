💬 Discord Clone

A real-time chat application inspired by Discord, built with React, Node.js, Socket.io, and MongoDB.

✨ Features
⚡ Real-time messaging using WebSockets (Socket.io)
🔐 User authentication (Register/Login)
Password hashing with bcrypt
Authentication with JWT
💬 Multiple channels (#general, #random)
🗂️ Message history loaded from MongoDB when joining a room
🎨 Discord-inspired UI (dark sidebar, channels list, user avatar, logout button)
🛠️ Tech Stack
Layer	Technology
Frontend	React 19, Socket.io-client
Backend	Node.js, Express 5
Real-time	Socket.io
Database	MongoDB (Mongoose)
Auth	bcrypt, JSON Web Token (JWT)
🚀 Getting Started
📌 Prerequisites
Node.js (v18+)
MongoDB (Atlas or local instance)
📥 Installation
1. Clone the repository
git clone https://github.com/rubaabusamraalnajahcomputer12345/Discord_Clone.git
cd Discord_Clone
2. Run the backend server
cd Server
node index.js
3. Run the frontend client (new terminal)
cd client
npm install
npm start
🔌 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Create a new user account
POST	/api/auth/login	Login and receive JWT token
