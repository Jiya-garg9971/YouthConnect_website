import axios from 'axios';
import React, { useRef } from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#F0F8FF;
    width:100vw;
    height:100vh;
   font-family: 'Poppins', sans-serif;
`
const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
     margin:30px;
     width:30vw;
     height:40vh;
`
const Wrapper2=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
     
     border-radius:10px;
     width:24vw;
     min-height:30vh;
     padding:20px 40px;
     background-color:white;
`
const Heading=styled.h1`
    font-size:4rem;
    color:#1877F2;
    text-align:left;
    margin-bottom:0px;
`
const Content=styled.span`
    margin-top:0px;
    font-size:1.5rem;
    text-align:left;
`
const Input=styled.input`
    border:2px solid lightgrey;
    width:100%;
    padding:10px;
    border-radius:10px;
    margin:10px 2px;
`
const Button=styled.button`
width:100%;
border:none;
padding:10px;
    border-radius:10px;
    background-color:#1877F2;
    color:white;
    font-size:15px;
    font-weight:bolder;
    margin:10px;
`
const Btn=styled.button`
    width:90%;
    padding:10px;
    border-radius:10px;
    background-color: #0BDA51;
    color:white;
    font-weight:bolder;
    border:none;
    font-size:15px;
`

const Form=styled.form`
    display:flex;
    min-width:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const Register = () => {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordconfirm=useRef();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password.current.value!==passwordconfirm.current.value){
            // console.log("not same password");
            passwordconfirm.current.setCustomValidity("Password does not match!");
        }
        else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            const res=await axios.post("/auth/register",user);
           
            navigate("/login");
        }
    }
  return (
    <Container>
        <Wrapper>
            <Heading>Lamasocial</Heading>
            <Content>
                Connect with friends and the world around you on Lamasocial
            </Content>
        </Wrapper>
        <Wrapper2>
            <Form type="submit" onSubmit={handleSubmit}>
                <Input type='text' placeholder='Username' ref={username}/>
                <Input type='Email' placeholder='Email' ref={email}/>
                  <Input type='password' placeholder='Password' ref={password}/>
                  <Input type='password' placeholder='Confirm Password'  ref={passwordconfirm}/>
                    <Button type="submit">
                        Sign Up
                    </Button>
                    <Link to="/login">
                    <Btn>
                       Log in with an existing account
                    </Btn>
                    </Link>
            </Form>
            </Wrapper2>
    </Container>
  )
}

export default Register;