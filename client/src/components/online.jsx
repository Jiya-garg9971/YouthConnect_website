import React from 'react'

import styled from 'styled-components'
const Item=styled.li`
display:flex;
align-items:center;
margin-bottom:10px;
`
const ItemValue=styled.span`
  padding:0px 10px;
  font-weight:600;
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
const Online = ({u}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
         <Item>
            <ImageCont>
               
        <Photo src={PF+u.profilePicture}/>
          <RightbarOnline> </RightbarOnline>
       
        </ImageCont>
        <ItemValue>{u.username}</ItemValue>
        </Item>

    </div>
  )
}

export default Online