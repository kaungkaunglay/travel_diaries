import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetails, postUpdate } from '../api-helper/helper';

import { Box, Typography, Button, FormLabel, TextField  } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { addPost } from '../api-helper/helper';

const DiariesUpdate = () => {
   const [post, setPost] = useState({}) ;

    const id = useParams().id;
    useEffect(() => {
      getPostDetails(id).then(data => {
        setPost(data.post);
        setInputs({title: data.post.title, 
        description: data.post.description, 
        image: data.post.image,
        location: data.post.location,
        }); 
      }).catch(err => console.log(err));
    }, [id]); 
    const [inputs, setInputs ] = useState({title: "", description: "", location: "", image: "", date: ""}); 
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }; 
    const handleSubmit = (e) => {
     e.preventDefault() ; 
     console.log(inputs);
     postUpdate(inputs, id)
     .then((data) => console.log(data))
     .catch(err => console.log(err));

    }
  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"} height={"100%"}>
      <Box display={"flex"} margin={" auto"} padding={2}>
        <Typography fontWeight={"bold"} variant='h4' fontFamily={"Quick-sand"}>Add Your Travel Diary</Typography>
        <TravelExploreIcon sx={{ fontSize: '40px', paddingLeft: 1, color: 'lightcoral' }} />
      </Box>
      {
        post && (
<form onSubmit={handleSubmit}>
        <Box padding={3} width="80%" display={"flex"} margin={"auto"} flexDirection={"column"}>
          <FormLabel>Title</FormLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} variant='standard' margin="normal" />

          <FormLabel>Description</FormLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} variant='standard' margin="normal" />

          <FormLabel>Image URL</FormLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} variant='standard' margin="normal" />

          <FormLabel>Location</FormLabel>
          <TextField name="location" onChange={handleChange} value={inputs.location} variant='standard' margin="normal" />

          <Button type='submit' color="warning" sx={{width: "50%", margin: 'auto', mt: 3, borderRadius: 7}} variant='contained'>Post</Button>
        </Box>
      </form>
        )
      }
      
      
    </Box>
  );
}

export default DiariesUpdate