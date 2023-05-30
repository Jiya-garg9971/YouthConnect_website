import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const Container=styled.div`
    display:flex;
    align-items:center;
    padding: 5px 5px;
`
const Name=styled.span`
  font-weight:500;
`
const Photo=styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
  object-fit:cover;
`
const ImageCont=styled.div`
margin-right: 10px;
 position: relative;

`
const RightbarOnline=styled.span`
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: limegreen;
      position: absolute;
      top: -2px;
      right: 0;
      border: 2px solid white;
`
const OnlineChat = ({currentId,setCurrentConv,onlineUsers}) => {
  const [Friends,setFriends]=useState([]);
    const [onlineFriends,setOnlineFriends]=useState([]);
    useEffect(()=>{
      const getFriends=async()=>{
        const result=await axios.get("/user/friends/"+currentId);
        setFriends(result.data);
      }
      getFriends();
    },[currentId]);
    useEffect(()=>{
      setOnlineFriends(Friends.filter((f)=>onlineUsers.includes(f._id)))
    },[Friends,onlineUsers]);

    const handleConv=async(user)=>{
      try{
        const result=await axios.get("/conversation/find/"+user._id+"/"+currentId);
        console.log("-------------------------");
        console.log(result);
         console.log("-------------------------");
      
        setCurrentConv(result.data);
      }
      catch(err){
        console.log("Error :)-->"+err)
      }
    }

    const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    
    <Container>{
      onlineFriends.map((o)=>(
        <div onClick={()=>handleConv(o)}>
      <ImageCont>      
          <Photo src={o?.profilePicture
                  ? o.profilePicture : PF+"/UserIcon.png"}/>
            <RightbarOnline> </RightbarOnline>          
      </ImageCont>
        <Name>{o?.username}</Name>
        </div>
         ))}
    </Container>
  )
}

export default OnlineChat;