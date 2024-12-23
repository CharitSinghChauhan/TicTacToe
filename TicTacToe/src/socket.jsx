import { io } from 'socket.io-client';

let socket;

export const connectSocket = (url) =>{

    socket = io(url);

    return socket
}

export const getSocket = ()=>{

    return socket;
    
}