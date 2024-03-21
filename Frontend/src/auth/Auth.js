import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { sendAuthRequest } from '../api-helper/helper';
import { useDispatch } from 'react-redux';
import {authActions} from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const [inputs, setInputs ] = useState({name: "", email: "", password: "" }); 
  const [isSignup, setIsSignup] = useState(true); 
  const onResReceived = (data) => {
    if(isSignup){
      localStorage.setItem("userId", data.user._id); 
    }else{
      localStorage.setItem("userId", data.id);
    }
    dispatch(authActions.login());
    navigate('/diaries');
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignup) {
        sendAuthRequest(true, inputs)
            .then(onResReceived)
            .catch(err => console.log(err)); // Catch any errors that occur during the request
    }
    
      else{
        sendAuthRequest(false, inputs)
        .then(onResReceived)
        .catch(err => console.log(err)); 
      }
  }
  const hanldeChange = (e) => {
      setInputs((prevState) => ({...prevState, 
        [e.target.name] : e.target.value
      }))
  }


  return (
    <Box width={"40%"} borderRadius={10} boxShadow={"5px 5px 10px #ccc"} margin={"auto"} marginTop={10}>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} width={"60%"} padding={5} margin={"auto"}>
        <Typography padding={2} variant='h4' textAlign={"center"}>{isSignup ? "Signup" : "Login"}</Typography>
        {isSignup && <>
          <FormLabel>Name</FormLabel>
        <TextField onChange={hanldeChange} value={inputs.name} name="name" margin='normal'/>
        </>}
        <FormLabel>Email</FormLabel>
        <TextField onChange={hanldeChange} value={inputs.email} name="email" margin='normal'/>
        <FormLabel>Password</FormLabel>
        <TextField onChange={hanldeChange} type=
        'password'  value={inputs.password} name="password" margin='normal'/>
        <Button type='submit' sx={{mt: 2, borderRadius: 10}}  variant='contained'>{isSignup ? "Signup": "Login"}</Button>
        <Button onClick={() => setIsSignup(!isSignup)} sx={{mt : 2, borderRadius: 10}} variant='outlined'>Changed to {isSignup ? "Login" : "Signup"}</Button>
       
      </Box>
      </form>
      </Box>
 
  )
};


export default Auth