import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import {  LocationOn, Mood, PhotoLibrary, Label, Cancel } from '@mui/icons-material'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
const Container=styled.div`
  width:100%;
`
const Wrapper=styled.div`
  margin:20px;
  border-radius:10px;
  box-shadow:2px 2px 2px 2px lightgrey;
`
const ImgContainer=styled.div`

`
const ShareImg=styled.img`
  max-width:90%;
  max-height:59%;
  margin-top:10px;
`
const Heading1=styled.div`
  display:flex;
  padding:10px;
  align-items:center;
  margin:10px;
  font-size:15px;
`
const ItemValue=styled.span`
  padding:0px 4px;
  font-weight:600;
`
const Input=styled.input`
  font-size:1rem;
  margin:10px;
`
const Heading2=styled.form`
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const Image=styled.img`
  width:56px;
  height:56px;
  border-radius:50%;
  object-fit:cover;
  padding:0px 0px 5px 0px ;
  `
const Hr=styled.hr`
  opacity:0.4;
  width:90%;
  margin-bottom:0px;
`
const Item=styled.label`
  padding:0px 5px;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Button=styled.button`
  background-color:#138808;
  color:white;
  padding:10px;
  border-radius:10px;
  border:none;
  border:2px solid #138808;
  font-weight:bolder;
  margin-right:30px;
`

const Share = () => {
   const PF=process.env.REACT_APP_PUBLIC_FOLDER
   const path=process.env.REACT_APP_CLOUD_LINK
    const preset_key=process.env.REACT_APP_PRESET_KEY
  const {user}=useContext(AuthContext);
  const desc=useRef();
  const [file,setFile]=useState(null);
  function Uploadfile(e){
    const file=e.target.files[0];
    const formData=new FormData();
    formData.append("file",file);
    formData.append("upload_preset",preset_key);
    axios.post(path,formData).then(res=>setFile(res.data.secure_url)).catch(err=>console.log(err));

  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newpost={
      userId:user._id,
      desc:desc.current.value,
      img:file
    }
    try{
      await axios.post("/post",newpost);
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <Container>
    <Wrapper>
      <Heading1>
        <Image src={user.profilePicture || `${PF}UserIcon.png`}/>
        <Input placeholder={`What's in your mind ${user.username}?`} ref={desc}></Input>
      </Heading1>
      <Hr ></Hr>
      {
        file && (
          <ImgContainer>
          <ShareImg src={file} alt="image uploaded"/>
          <Cancel style={{position:"absolute", opacity:"0.7",
  }} onClick={()=>setFile(null)}/>

          </ImgContainer>
        )
      }
      <Heading2 type="submit" onSubmit={handleSubmit}>
       <Heading1>
        <Item htmlFor="photo" >
          <PhotoLibrary color='tomato'/>
          <ItemValue> Photos or Videos</ItemValue>
        </Item>
        <input type="file" id="photo" style={{display:"none"}}  accept=".png,.jpeg,.jpg" onChange={Uploadfile}/>
        <Item color='blue'>
          <Label/>
          <ItemValue> Tag</ItemValue>
        </Item>
        <Item>
          <LocationOn color='green'/>
          <ItemValue> Location</ItemValue>
        </Item>
        <Item>
          <Mood color='yellow'/>
          <ItemValue> Feelings</ItemValue>
        </Item>
        </Heading1>
        
        <Button type="submit">Share</Button>
      
      </Heading2>
    </Wrapper>

    </Container>
  )
}


export default Share