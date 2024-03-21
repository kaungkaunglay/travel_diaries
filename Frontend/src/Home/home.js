import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
   <Box position={'relative'} width={"100%"} height={"90vh"}>
      <img style={{objectFit: 'cover'}} src='/road.jpg' alt='Road' width={"100%"} height={"70%"} ></img>
      <Typography  fontWeight={"bold"} fontFamily={"Quicksand"} variant='h3' textAlign={"center"} width={"100%"} sx={{position: 'absolute', top: "0px", color: "#111114de", background: "#B2CBDF"}}>
          Dare to live the life you've always wanted
      </Typography>
      <Box width={'100%'} height={"30%"} display={"flex"} flexDirection={"column"}>
        <Typography textAlign={"center"} variant='h4' padding={4}>
          Share Your Travel Diaries
        </Typography>
          <Box margin={'auto'}>
            <Button variant='outlined' sx={{mr: 2}}>Share Your Story</Button>
            <Button LinkComponent={Link} to="/diaries" variant='contained' sx={{ml: 2}}>View Diaries</Button>
          </Box>
      </Box>
   </Box>
  )
}

export default home