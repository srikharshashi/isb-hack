import io from 'socket.io-client';

export const socket=io('ws://localhost:8080',{
    withCredentials:true,
});

socket.on('connect', () => {
    console.log('Connected to server');
});

export const sendMessage=(user,receiver,content)=>{
    const message={
        timestamp:new Date().toISOString(),
        sender:user["email"],
        receiver:receiver["email"],
        type:"text",
        content:content,
    };
    socket.emit("message",message);
};

export const fileUpload=(user,receiver,content)=>{
    const message={
        timestamp:new Date().toISOString(),
        sender:user["email"],
        receiver:receiver["email"],
        type:"file",
        content:content,
    };
    socket.emit("message",message);
}