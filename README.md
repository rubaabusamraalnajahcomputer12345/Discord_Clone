#💬 Discord Clone
A real-time chat application inspired by Discord, built with React, Node.js, Socket.io, and MongoDB.

Features

Real-time messaging via WebSockets (Socket.io)

User authentication — register and login with hashed passwords (bcrypt) and JWT tokens

Multiple channels — switch between #general and #random

Message history — past messages are loaded from the database when you join a room

Discord-inspired UI — dark sidebar, channel list, user avatar, and logout button

Tech Stack
Layer        Technology

Frontend     React 19, Socket.io-client

Backend      Node.js, Express 5

Real-time    Socket.io

Database     MongoDB (Mongoose)

Auth         bcrypt, JSON Web Tokens (JWT)

Getting Started
Prerequisites

Node.js (v18 or higher)
A MongoDB database (MongoDB Atlas or local)

Installation

Clone the repository:
git clone https://github.com/rubaabusamraalnajahcomputer12345/Discord_Clone.git

cd Discord_Clone

#Run the Server:

cd Server

node index.js

#Run the client (in a separate terminal)

cd client

npm start 


API Endpoints:

Method   Endpoint                  Description

POST     /api/auth/register       Create a new user account

POST     /api/auth/login          Login and receive a JWT token




