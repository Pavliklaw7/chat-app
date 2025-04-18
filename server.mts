import { createServer } from "node:http";
import next from 'next'
import { Server } from "socket.io";
import { connectDB } from "./src/app/lib/mongodb.js";
import Room from "./src/app/models/Room.js";

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || "3000", 10)
const app = next({dev, hostname, port})
const handler = app.getRequestHandler()

connectDB().then(() => {
  console.log('🚀 Server is ready to work with database!');
})

app.prepare().then(() => {
    const httpServer = createServer(handler)
    const io = new Server(httpServer)

    io.on('connection', (socket) => {
        console.log("🟢 Пользователь подключен:", socket.id);

        socket.on("create-room", async (roomName) => {
            const roomCount = await Room.countDocuments();

            if (roomCount >= 10) {
              socket.emit("error", "🚫 Лимит чатов (10) достигнут!");
              return;
            }

            try {
                const newRoom = new Room({name: roomName})
                await newRoom.save()
                io.emit("room-create", newRoom)
            } catch (error) {
                console.error('Create room Error', error);
            }
        })

        socket.on("join-room", ({roomId, username}) => {
            console.log('join-room', {roomId, username})
            socket.join(roomId)
            socket.to(roomId).emit("user_joined", `${username} joined room ${roomId}`)
        })

        socket.on("message", async (msg) => {
            socket.to(msg.roomId).emit("message", {sender: msg.sender, content: msg.content})
        })

        socket.on('disconnected', () => {
            console.log('User disconnected', socket.id)
        })
    })

    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`)
    })
})