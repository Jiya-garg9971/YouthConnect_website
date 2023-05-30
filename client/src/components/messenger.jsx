//3.5   5.5       3
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Topbar from "./Topbar"
import Conversation from './Conversation'
import Message from './message'
import OnlineChat from './OnlineChat'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';
import {io} from "socket.io-client";
import "./messenger.css"
const ChatBox=styled.div`
    flex:5.5;
`
const ChatOnline=styled.div`
    flex:3.5;
`
const ChatBar=styled.div`
    flex:3;
`
const ChatBoxWrapper=styled.div`
    padding:10px;
    height:100%;
     display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`
const ChatOnlineWrapper=styled.div`
    padding:10px;
    height:100%;
`
const ChatBoxTop=styled.div`
    
`
const ChatBoxBottom=styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;

`
const ChatBarWrapper=styled.div`
    padding:10px;
    height:100%;
`
const Container=styled.div`
    display:flex;
    height:90vh;

`
const SearchInput=styled.input`
    border:none;
    border-bottom:1px solid gray;
    padding:10px 2px;
    font-size:17px;
`
const InputChat=styled.textarea`
    width:80%;
    height:90px;
    padding:10px;
    border:1px solid grey;
    border-radius:10px;
    font-size:15px;
`
const SendButton=styled.button`
   width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`
const NoCurrentConv=styled.span`
    font-size:40px;
    padding:20px;
    cursor:default;
    color:lightgray;
`
const Messenger = () => {
    const {user}=useContext(AuthContext);
    const [conversation,setconversation]=useState([]);
    const [currentConv,setCurrentConv]=useState(null);
     const [message,setmessage]=useState([]);
     const [onlineUsers,setonlineUsers]=useState([]);
     const [newmsg,setnewmsg]=useState("");
     const [arrivalMsg,setArrivalMsg]=useState(null);
    //  const socket=io("ws://localhost:8900");
    console.log(currentConv+" is the current ||| ");
    const socket=useRef();
     const scrollRef = useRef(null);
     const scrollToElement = () => {
        scrollRef.current?.scrollIntoView({ behavior:'smooth' });
    };
    useEffect(()=>{
        socket.current=io("ws://localhost:8900");
        socket.current.on("getMessage",(data)=>{
            setArrivalMsg({
                senderId:data.senderId,
                text:data.text,
                createdAt:Date.now()
            });
        });
    },[]);
    
    useEffect(()=>{
        arrivalMsg && currentConv?.members.includes(arrivalMsg.senderId) && setmessage((prev)=>[...prev,arrivalMsg]);
    },[arrivalMsg,currentConv]);
    useEffect(()=>{
        socket.current.emit("addUser",user._id);
        socket.current.on("getUsers",(users)=>{
            setonlineUsers(
                user.following.filter((f)=>users.some((u)=>u.userId===f))
            )
        })
    },[user]);
    useEffect(()=>{scrollToElement()},[message])
    useEffect(()=>{
        const getConv=async()=>{
            try{
            const conv=await axios.get("/conversation/"+user._id);
             console.log(conv.data+ " op/3 ");
            setconversation(conv.data);
            }catch(err){console.log(err);}
        }
        getConv();
    },[user._id])
    useEffect(()=>{
        const getMsg=async()=>{
            try{
            const msg=await axios.get("/message/"+currentConv?._id);
            // console.log(msg.data);
            setmessage(msg.data)
            }catch(err){console.log(err);}
        }
     getMsg();
    },[currentConv])
    //post messsage

    const postmsg=async(e)=>{
        e.preventDefault();
        const MessageSend={
            conversationId:currentConv._id,
            senderId:user._id,
            text:newmsg
        };
         const receiverId = currentConv.members.find((member) => member !== user._id);
         console.log(user._id ,"  receiver id is",currentConv)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId:receiverId,
            text: newmsg,
        });
    

        try{
            const result=await axios.post("/message/",MessageSend);
            setmessage([...message,result.data]);
            setnewmsg("");
            scrollToElement();
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <>
        <Topbar/>
        <Container>
             <ChatBar>
            <ChatBarWrapper>
                <SearchInput type="text" placeholder='Search for friends'/>
                {
                    conversation.map(con=>(
                        <div onClick={()=>setCurrentConv(con)} className='nameofConv'>
                    <Conversation conversation={con} currentUser={user} />
                    </div>))
                }
            </ChatBarWrapper>

        </ChatBar>
        <ChatBox>
            <ChatBoxWrapper>
        { currentConv?
        <>  
            <ChatBoxTop className='chatboxtop'>
                {message.map(m=>(<div  ref={scrollRef}><Message msgdata={m} own={m.senderId===user._id}/></div>))}
                 
                </ChatBoxTop>
                <ChatBoxBottom>
                    
                    <InputChat placeholder='Write something' onChange={(e)=>setnewmsg(e.target.value)} value={newmsg}/>
                    <SendButton onClick={postmsg} > Send</SendButton>

                </ChatBoxBottom>
            </>
            :
            <NoCurrentConv>Open a conversation to start the chat.</NoCurrentConv>}
            </ChatBoxWrapper>
        </ChatBox>
        <ChatOnline>
            <OnlineChat setCurrentConv={setCurrentConv} currentId={user._id} onlineUsers={onlineUsers}/>
        </ChatOnline>
    </Container>
    </>
  )
}

export default Messenger