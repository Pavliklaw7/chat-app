"use strict";
import { createServer } from "node:http";
import next from 'next';
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
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
