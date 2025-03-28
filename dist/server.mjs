"use strict";
import { createServer } from "node:http";
import next from 'next';
import { Server } from "socket.io";
import { connectDB } from "./src/app/lib/mongodb.js";
import Room from "./src/app/models/room";
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
connectDB().then(() => {
    console.log('🚀 Server is ready to work with database!');
});
app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        socket.on("create-room", async (roomName) => {
            try {
                const newRoom = new Room({ name: roomName });
                await newRoom.save();
                io.emit("room-create", newRoom);
            }
            catch (error) {
                console.error('Create room Error', error);
            }
        });
        socket.on("join-room", ({ room, username }) => {
            socket.join(room);
            socket.to(room).emit("user_joined", `${username} joined room ${room}`);
        });
        socket.on("message", ({ room, message, sender }) => {
            socket.to(room).emit("message", { sender, message });
        });
        socket.on('disconnected', () => {
            console.log('User disconnected', socket.id);
        });
    });
    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    });
});
