## Chat App

This is a simple chat application that uses WebSockets for real-time communication between users. The application allows users to create and join rooms.

### Stack

#### This app uses following technologies:

Next.js — a framework for React for server rendering.

WebSockets (socket.io) — for real-time messaging.

TypeScript — for code typing.

#### Functionality

Chats: Users can create new chats or join existing ones.

### Instalation

##### Clone the repository:
```
git clone https://github.com/Pavliklaw7/chat-app.git
cd chat-app
```
##### install dependencies
```
npm install
```
##### Create a .env file in the root directory of the project and add a connection string to your MongoDB database:
```
MONGODB_URI=mongodb://localhost:27017/chat-app
```
##### Run the application in development mode:
```
npm run dev:socket
```
##### Open the application in a browser:
```
http://localhost:3000
```
