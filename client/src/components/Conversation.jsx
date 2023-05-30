import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import "./messenger.css"
const ConvBox=styled.div`
    display:flex;
    align-items:center;
    padding: 20px 5px;
`
const ConvImg=styled.img`
    height:50px;
    width:50px;
    border-radius:50%;
    margin-right:10px;
`
const ConvName=styled.span`
  font-weight:500;
`
const Conversation = ({conversation,currentUser}) => {
     const PF=process.env.REACT_APP_PUBLIC_FOLDER;
     const [user,setUser]=useState(null);
     console.log(conversation," is the ppp");
     useEffect(()=>{
        console.log(conversation.members,"  conversation");
       const friendId=conversation.members.find((m)=>m!==currentUser._id);
      
       const getUser=async()=>{
         try{
          const result=await axios("/user?userId="+friendId);
          console.log(result.data," got from conv");
          setUser(result.data);
        }
        catch(err){
          console.log(err);
        }
      }
        getUser();
    },[currentUser,conversation])
  return (
    <ConvBox >
        <ConvImg src={user?.profilePicture? user.profilePicture : PF+"/UserIcon.png"} alt='image of person'/>
        <ConvName>{user?.username} </ConvName>
        {/* <a>{user.profilePicture}</a> */}
    </ConvBox>
  )
}

export default Conversation