import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Feeds from '../components/feed';
import RightBar from '../components/rightbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Container2=styled.div`
  display:flex;
`
const Wrapper2=styled.div`
  flex:8.5;
`
const CoverImage=styled.img`
  width:100%;
  height:200px;
  object-fit:cover;
`
const ImgContainer=styled.div`
  position:relative
`
const Wrapper=styled.div`
  text-align:center;
`
const ProfilePhoto=styled.img`
  width:100px;
  height:100px;
  border-radius:50%;
  border:4px solid white;
  object-fit:cover;
  position:absolute;
  left:0;
  right:0;
  margin:auto;
  top:150px;
  bottom:0px;
  background-color:white;
`
const Heading =styled.h2`
padding-top: 10px;
margin-bottom:0px;
`
const Desc=styled.p`
margin-top:0px;
`
const Profile = (req,res) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
   const [user,setUser]=useState({});
   const params=useParams();
   const username=params.username;
  useEffect(()=>{
    const fetchUser=async()=>{
      const result=await axios.get(`/user?username=${username}`);
       setUser(result.data);  
    }
    fetchUser();
    //setPosts(res.data);
  },[username])
  return (
    <div>
        <Topbar/>
         <Container2>
        <Sidebar/>
        <Wrapper2>
<Wrapper>
      <ImgContainer>
        <CoverImage src={user.profileCover || `${PF}coverimage.jpg`}/>
        <ProfilePhoto src={user.profilePicture || `${PF}UserIcon.png`} alt="image of person" />
        </ImgContainer>
        <Heading>{user.username}</Heading>        
        <Desc>{user.desc}</Desc>
    </Wrapper>

          <Container2>
            <Feeds username={user.username}/>
            <RightBar user={user}/>
          </Container2>
        </Wrapper2>
      </Container2>
    </div>
  )
}

export default Profile;