import React from 'react'
import styled from 'styled-components'
import {RssFeed,Chat,PlayCircleFilledWhite,Group, Bookmark, QuestionMarkOutlined, Event,WorkOutline,School}from '@mui/icons-material';
import './sidebar.css';
import CloseFriends from './CloseFriends';
import { Users} from '../dummydata';
const Container=styled.div`
  flex:2;
  overflow-y:scroll;
  height:90vh;
  position:sticky;
  top:50px;
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

const Button=styled.button`
  font-weight:bold;
  border:none;
  padding:10px;
`

const Hr=styled.hr`
margin-bottom:20px;
opacity:0.4;
width:80%;
`
const Sidebar = () => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
     return (
    <Container classname="sidebar">
      <div className='options'>
        <List>
          <Item>
            <RssFeed/>
            <ItemValue>Feed</ItemValue> 
          </Item><Item>
            <Chat/>
            <ItemValue>Chats</ItemValue> 
          </Item><Item>
            <PlayCircleFilledWhite/>
            <ItemValue>Videos</ItemValue> 
          </Item><Item>
            <Group/>
            <ItemValue>Groups</ItemValue> 
          </Item><Item>
            <Bookmark/>
            <ItemValue>Bookmarks</ItemValue> 
          </Item><Item>
            <QuestionMarkOutlined/>
            <ItemValue>Questions</ItemValue> 
          </Item><Item>
            <WorkOutline/>
            <ItemValue>Jobs</ItemValue> 
          </Item>
          <Item>
            <Event/>
            <ItemValue>Events</ItemValue> 
          </Item>
          <Item>
            <School/>
            <ItemValue>Courses</ItemValue> 
          </Item>
           <Button>
        Show More
      </Button>
        </List>
      </div>
      <Hr></Hr>
<List>
 { Users.map(u=>(
<CloseFriends data={u} key={u.id}/>
  ))}
  
</List>


    </Container>
  )
}

export default Sidebar