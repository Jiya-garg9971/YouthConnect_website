import { Server } from "socket.io";
const io=new Server(8900,{
    cors:{
        origin:"http://localhost:3000"
    },
})
let users=[];
const addUser=(userId,socketId)=>{
    // console.log(userId+" || "+socketId);
    !users.some((user)=>user.userId===userId) && users.push({userId,socketId});
    // console.log(users+" is first o/p");
}
const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);
}
const getUser=(userId)=>{
    // console.log(userId);
    return users.find((user)=>user.userId===userId);
   
}
io.on('connection',(socket)=>{
    //when connect
    console.log("connection established");
    // io.emit("all working fine")
    //adding the user
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users);
    })
    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        // console.log(receiverId+" is the id "+text)
        const user=getUser(receiverId);
        console.log(user);
        io.to(user.socketId).emit("getMessage",{
            senderId,text
        })
    })
    //when disconnect
    socket.on('disconnect',()=>{
        console.log("user disconnected ");
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
})
