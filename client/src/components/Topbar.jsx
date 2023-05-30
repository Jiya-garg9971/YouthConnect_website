import React, { useContext, useReducer } from 'react';
import { Message,SearchOutlined,Notifications,Person } from '@mui/icons-material';
import { Badge } from '@mui/material';
import {Link} from 'react-router-dom';
import "./Topbar.css"
import { AuthContext } from '../context/AuthContext';
const Topbar = () => {
  const {user}=useContext(AuthContext);
  const username=user.username;
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='container'>
      <div className='topleft'>
        <Link to="/" className='link'>
      <div className='Logo'>
        YouthConnect</div></Link>

      </div>
       <div className='topcenter'>
      <div className='wrapper'>
       <div className='search'><SearchOutlined className='black'/><input placeholder='Search photos or videos'/>
       </div> 
      </div>
      <div className='heading'>
       HomePage
      </div>
       <div className='heading'>
      Timeline
      </div>
      </div>
      <div className="topright">
      <div className='icons'>
        <div className="Person">
          <Badge badgeContent={4} className='badge' color='error'>
            <Person/>
          </Badge>
          </div>
           
        <div className="message">
          <Badge badgeContent={4} className='badge' color='error'><Link to={`/messenger`} style={{textDecoration:"none", color:"white"}}><Message color='white'/></Link></Badge></div>
        <div className='notify'>
          <Badge badgeContent={4} className='badge' color='error'><Notifications/></Badge></div>
      </div>
      <Link to={`/profile/${username}`}>
      <img src={user.profilePicture || `${PF}UserIcon.png`} alt="person" className='profilephoto'/>
      </Link>
      </div>
    </div>
    
  )
}

export default Topbar