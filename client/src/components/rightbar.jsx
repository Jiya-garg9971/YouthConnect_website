import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Users } from '../dummydata'
import Online from './online'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Button=styled.button`
  background-color:#1872f2 ;
  color:white;
  padding:6px;
  border:white;
  font-size:20px;
  border-radius:5px;
  margin-top:20px;
  display:flex;
  align-items:center;
  cursor:pointer;
  margin-bottom:10px;
`
const Container=styled.div`
  flex:2;
`
const GiftLogo=styled.img`
  width:40px;
  height:40px;
  padding:2px 2px 0px 2px;
`
const Wrapper=styled.div`
  display:flex;
  width:100%;
  align-items:center;
  padding:5px 2px 5px 2px;
`
const Image=styled.img`
display:flex;
 width:90%;
 align-items:center;
  max-height:40vh;
  border-radius:20px;
  object-fit:contain;
`
const List=styled.ul`
  list-style:none;
  margin:0px;
  align-items:left;
  padding:2px;
`
const ImgProfile=styled.img`
  width:80px;
  height:80px;
  border-radius:20px;
  object-fit:cover;
`
const ImageCollage=styled.div`
 display: flex;
  flex-wrap: wrap;
`
const Following=styled.div`
display: flex;
  flex-direction: column;
  margin: 10px;
  cursor: pointer;
`
const Name=styled.span`
  font-size:12px;
  color:black;
  text-align:center;
  font-weight:600;
`
const BoldVal=styled.span`
  font-weight:600;
`
const RightBar = ({user}) => {
  const {user:currentUser,dispatch}=useContext(AuthContext);
  const HomeRight=()=>{
 return (
   <Container>
    <Wrapper >
      <GiftLogo src="/assets/gift.jpeg" alt="gift.png"/>
      <span><b>Pola Fosetr</b> and <b>3 other friends</b> have a birthday today</span>
    </Wrapper>
    <Image src="/assets/adv.jpeg"/>
    <div>
      <h4>Online Friends</h4>
        <List>
          {Users.map(u=>(
                <Online u={u} key={u.id}/>
        
          ))}
          
        </List>
    </div>
   </Container>
  )}
 
  const ProfileRight=()=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends]=useState([]);
     const [followed,setFollowed]=useState(currentUser.following.includes(user?.id));
   
    useEffect(()=>{
      const getFriends=async()=>{
        const result=await axios.get("/user/friends/"+user._id);
        setFriends(result.data);        
      };
      getFriends();
    },[user]);
        const handleClick=async()=>{
          try{
            if(followed){
              await axios.put("/user/"+user._id+"/unfollow",{userId:currentUser._id});
              // console.log("unfollow")
              dispatch({type:"UNFOLLOW"})
            }
            else{
              await axios.put("/user/"+user._id+"/follow",{userId:currentUser._id});
              //  console.log("follow")
              dispatch({type:"FOLLOW"})
            }
            setFollowed(!followed);
          }
          catch(err){
            console.log(err);
          }
        }
    return(
      <Container>
        {
           user.username!==currentUser.username && (
            <Button onClick={handleClick}>{followed?"Unfollow -":"Follow +"}</Button>
           )
        }
      <div>
        <h2>User Information</h2>
        <List>
        <li><BoldVal>City</BoldVal>: {user.city || "-"}</li>
        <li><BoldVal>From</BoldVal>: {user.from || "-"}</li>
        <li><BoldVal>RelationShip</BoldVal>: Single</li>
        </List>
      </div>
      <div>
        <h2>User Friends</h2>
        <ImageCollage>
          {friends.map(u=>(
            <Link to={"/profile/"+u.username} style={{textDecoration:"none"}} key={u._id}>
              <Following>
                
                <ImgProfile src={u.profilePicture || `${PF}UserIcon.png`}/>
                <Name>
                  {u.username}
                </Name>
                </Following>    
                </Link>    
          ))}
        </ImageCollage>
      </div>
      </Container>
    )
  }

  // console.log("profile is" ,profile)
return (
  <>
  {user ? <ProfileRight/>:<HomeRight/>}
  </>
  )
}

export default RightBar