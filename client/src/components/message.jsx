import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import "./messenger.css";
import {format} from "timeago.js"
import axios from 'axios';
const ConvImg=styled.img`
    height:40px;
    width:40px;
    border-radius:50%;
    margin-right:10px;
`
const MessageTop=styled.div`
display: flex;
`
const MessageBottom=styled.div`

`
const Content=styled.p`
    margin:0px;
    padding:10px;
    max-width:300px;
    border-radius:30px;
`
const Container=styled.div`
    display: flex;
  margin-top: 20px;
  flex-direction:column;
`
const Timeline=styled.div`
font-size:13px;
`

const Message = ({msgdata,own}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [sender,setSender]=useState();
   useEffect(()=>{
       const getUser=async()=>{
         try{
          const result=await axios("/user?userId="+msgdata.senderId);
          setSender(result.data);
        }
        catch(err){
          console.log(err);
        }
      }
        getUser();
    },[msgdata])

  return (
    <Container className={own?"right-side":"left-side"}>
        <MessageTop>
            <ConvImg src={sender?.profilePicture || PF+"/UserIcon.png"} alt='image of person'/>
            <Content className={own?"gray":"blue"}> {msgdata.text}
            </Content>
        </MessageTop>
        <MessageBottom>
            <Timeline> {format(new Date(msgdata.createdAt))}
</Timeline>

        </MessageBottom>
    </Container>
  )
}

export default Message