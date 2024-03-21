import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DiariesItem from './DiariesItem'
import { getAllPost } from '../api-helper/helper';

const Diaries = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getAllPost().then((data) => setPosts(data?.posts)).catch(err => console.log(err)); 
  }, []); 
  console.log(posts);
  return (
    <Box display={"flex"} flexDirection={"column"} padding={3} justifyContent={"center"} alignItems={"center"}>
      {
      posts && 
      posts.map((item, index) =>   <DiariesItem date={new Date(`${item.date}`).toLocaleDateString()} description={item.description} location={item.location} title={item.title} image={item.image} key={index} user={item.user._id} name={item.user.name} />)}
    </Box>
  )
}

export default Diaries;