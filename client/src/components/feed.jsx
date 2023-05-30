import React, { useContext, useEffect,useState } from 'react'
import styled from 'styled-components'
import {PostData} from '../dummydata'
import Share from './share'
import Posts from './posts'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'
const Container=styled.div`
  flex:6 2 0%;
  
`
const Feeds = ({username}) => {
 const [Postall,setPosts]=useState([]);
 const {user}=useContext(AuthContext);
  useEffect(()=>{
    const makeRequest=async()=>{      
      const result=username?await axios.get('/post/profile/'+username): await axios.get('/post/timeline/'+user._id);
       setPosts(result.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt);
       }));
    }
    makeRequest();
  },[username,user._id])
  return (
    <Container>
    {(!username || user.username===username) && <Share/>}
    {      
      Postall.map((postdata)=>(
        <Posts post={postdata} key={postdata._id}/>
      ))
    }
    
    </Container>
  )
}

export default Feeds