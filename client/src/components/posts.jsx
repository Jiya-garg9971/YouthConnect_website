import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Users } from '../dummydata'
import {CurrencyExchange, MoreVert} from '@mui/icons-material'
import {useState} from 'react'
import {format} from "timeago.js";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
const Wrapper=styled.div`

  display:flex;
  align-items:center;
`
const Wrapper2=styled.div`
  display:flex;
  align-items:center;
  padding:2px 10px;
`
const Box=styled.div`
  display:flex;
 justify-content:space-between;
 margin-top:5px;
`
const Container=styled.div`
    margin:20px;
  border-radius:10px;
  box-shadow:2px 2px 2px 2px lightgrey;
`
const Image=styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
  object-fit:cover;
  padding :5px 10px;
`
const Photo=styled.img`
margin:0px 20px;
 width:70%;
  max-height:100vh;
  border-radius:10px;
  object-fit:contain;
`
const Time=styled.span`
    font-size:12px;
    padding:10px;
`
const Logo=styled.img`
  width:20px;
  height:20px;
  border-radius:50%;
  object-fit:cover;
  padding :5px 2px;
`
const Desc=styled.div`
    padding:10px;
`
const Review=styled.span`
    font-weight:300;

`
const Posts = ({post}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  
  const userData=Users.filter(u=>u.id==post.userId);
  const [likes,setlikes]=useState(post.likes.length);
  const [liked,setliked]=useState(false);
  const [user,setUser]=useState({});
  const {user:currentUser}=useContext(AuthContext);
  useEffect(()=>{
    setliked(post.likes.includes(currentUser._id));
  },[currentUser._id,post.likes]);
  useEffect(()=>{
    const fetchUser=async()=>{
      const result=await axios.get(`/user?userId=${post.userId}`);
      setUser(result.data);
    }
    fetchUser();
   
    //setPosts(res.data);
  },[post.userId])
  const handleLike=async()=>{
    try{
      await axios.put("/post/"+post._id+"/likes",{userId:currentUser._id});
    }
    catch(err){
      console.log(err);
    }
      setlikes(liked?likes-1:likes+1);
       setliked(!liked);    
  }
  return (

    <Container>
        <Box>
        <Wrapper>
          <Link to="/profile/Jack">
            <Image src={user.profilePicture || PF+"UserIcon.png"}/>
            </Link>
            <span>{user.username}</span>
            <Time>{format(post.createdAt)}</Time>
        </Wrapper>
        <Wrapper><MoreVert/></Wrapper>
        </Box>
         <Desc>{post.desc} </Desc>

        <Photo src={post.img} alt=""/> 
        <Box>
            <Wrapper2>
                <Logo src="/assets/icons/thumbsup.png" onClick={()=>handleLike()}/>
                <Logo src="/assets/icons/like.jpeg" onClick={()=>handleLike()}/>
               
                <Review>{likes} people like it</Review>
            </Wrapper2>
            <Wrapper2><Review>{post.comment} comments</Review></Wrapper2>
        </Box>
    </Container>

  )
}

export default Posts