import React from 'react'
import styled from 'styled-components';
const Image=styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
  object-fit:cover;
  `
const List=styled.ul`
  list-style:none;
`
const Item=styled.li`
display:flex;
align-items:center;
margin-bottom:20px;
`
const ItemValue=styled.span`
  padding:0px 10px;
  font-weight:600;
`
const CloseFriends = ({data}) => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Item>
    <Image src={PF+data.profilePicture}/>
      <ItemValue>{data.username}</ItemValue>
  </Item>
  )
}

export default CloseFriends