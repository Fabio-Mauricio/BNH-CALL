import express from 'express'
import router from './routes/user/user.router.js'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '..', 'uploads');

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads', express.static(path.join(uploadsPath)));

io.on('connection', (socket) => {
    socket.on('join_room', (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.emit('user-connected', userId)
        console.log(`Usuário conectado: ${userId} na sala: ${roomId}`)

    socket.on('desconnect', () => {
        socket.broadcast.emit('user-disconnected', userId)
    })
    })
});

server.listen(8081, () => {
    console.log(`Servidor ouvindo na porta: 8081`)
})