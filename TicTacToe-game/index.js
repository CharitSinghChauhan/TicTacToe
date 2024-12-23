import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from 'cors';
import game from "./game.js";

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
        methods: ['POST', 'GET']
    }
});

app.use(cors());


const handleCreateRoom = (socket, roomName) => {

    const allRoomsInServer = Array.from(io.sockets.adapter.rooms.keys())

    if (!(allRoomsInServer.find(x => x == roomName))) {
        socket.join(roomName);
        socket.emit("roomStatus", "Rooms Created Successfully")
        game.playerO = socket.id

    } else {
        socket.emit("roomStatus", "Name is Already taken");
        return;
    }

};

const handleJoinRoom = (socket, roomName) => {

    const allRoomsInServer = Array.from(io.sockets.adapter.rooms.keys())
    const sockets = [...io.sockets.adapter.rooms.get(roomName)];
    if (allRoomsInServer.find(x => x == roomName) && sockets.length < 2 ){
        socket.join(roomName);
        socket.emit("roomStatus", "Rooms Joined Successfully")
        game.playerX = socket.id
        io.to(roomName).emit("join-room-game-board", game.array)
    } else {
        socket.emit("roomStatus", "No Such Room Exist or Room is full");
        return;
    }

};

const handleMoveSend = (socket, index) => {

    const set = [...socket.rooms];
    const roomName = set[1];
    game.roomName = roomName;
    const result = game.move(socket.id, index)

    if (result === "Draw") {
        io.to(roomName).emit("Draw", game.array)
    } else if (result == "X" || result == "O") {
        io.to(roomName).emit("Winner", result, game.array)
    } else {
        io.to(roomName).emit("array", game.array)
    }
};

io.on("connection", (socket) => {

    socket.on("create-room", (roomName) => {
        try {
            handleCreateRoom(socket, roomName);
        } catch (error) {
            console.error(`Error in create-room: ${error}`);
            io
        }
    });

    socket.on("join-room", (roomName) => {
        try {
            handleJoinRoom(socket, roomName);
        } catch (error) {
            console.error(`Error in join-room: ${error}`);
            socket.emit("roomStatus", "No Such Room Exist or Room is full");
        }
    });

    socket.on("move-send", (index) => {
        try {
            handleMoveSend(socket, index);
        } catch (error) {
            console.error(`move-send ${error}`)
        }
    });

    socket.on("reset", () => {
        try {
            io.to(game.roomName).emit("reset-array", game.reset());
        } catch (error) {
            console.error(`Error in reset: ${error}`)
        }
    })


});

server.listen(PORT, () => {
    console.log(`Running on ${PORT}....`);
});


io.on("connection", (socket) => {

    socket.on("create-room", (roomName) => {
        try {
            handleCreateRoom(socket, roomName);
        } catch (error) {
            console.error(`Error in create-room: ${error}`);
        }
    });

    socket.on("join-room", (roomName) => {
        try {
            handleJoinRoom(socket, roomName);
        } catch (error) {
            console.error(`Error in join-room: ${error}`);
            socket.emit("roomStatus", "No Such Room Exist or Room is full");
        }
    });

    socket.on("move-send", (index) => {
        try {
            handleMoveSend(socket, index);
        } catch (error) {
            console.error(`move-send ${error}`);
        }
    });

    
});