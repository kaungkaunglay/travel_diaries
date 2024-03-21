import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../api-helper/helper';
import { Box, Button, Typography } from '@mui/material';
import DiariesItem from '../diaries/DiariesItem';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import {useNavigate} from 'react-router-dom'; 
const Profile = () => {
  const dispatch = useDispatch(); 
  const navigate= useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    getUserDetails()
      .then(data => setUser(data.user))
      .catch(err => console.log(err));
  }, []);
  const handleClick = () => {
    dispatch(authActions.logout());
     localStorage.removeItem("userId"); 
    navigate("/");
  }
  

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {user && (
        <>
          <Typography textAlign={"center"} variant='h3' fontFamily={"quicksand"} padding={2}>User Profile</Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign={"left"}>
            Name : {user.name}
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign={"left"}>
            Email : {user.email}
          </Typography>
          <Button 
          onClick={handleClick}
          sx={{mr: 'auto', width: '15%'}} color='warning' variant='contained'>Logout</Button>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            {user.posts && user.posts.map((post, index) => (
              <DiariesItem key={index} title={post.title} date={post.date} description={post.description} id={post.id} image={post.image} location={post.location} user={user._id}/>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
