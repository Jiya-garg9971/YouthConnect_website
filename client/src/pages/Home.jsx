import React from 'react'
import Topbar from '../components/Topbar'
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Share from '../components/share';
import Feeds from '../components/feed';
import RightBar from '../components/rightbar';
const Container=styled.div`
  display:flex;
`

const Home = () => {
  return (
    <div>
        <Topbar/>
         <Container>
        <Sidebar/>
        <Feeds/>
        <RightBar/>
      </Container>
    </div>
  )
}

export default Home