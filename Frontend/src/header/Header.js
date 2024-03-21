import React, { useState } from 'react'
import {AppBar, Tabs, Tab, Toolbar} from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const linksArr = ["home", "diaries", 'auth'];
const loggedInLinks = ["home", "diaries", "add", "profile"]; 
const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setVlaue] = useState(0); 
  return (
    <AppBar sx={{bgcolor: "transparent", position: "sticky"}}>
        <Toolbar>
            <TravelExploreIcon sx={{color: "black"}} />
            <Tabs value={value} onChange={(e, val) => setVlaue(val)} sx={{ml: "auto", textDecoration: "none"}}>
                {
                !isLoggedIn ? 
                linksArr.map((link, index) => (
                  <Tab LinkComponent={Link}
                     to={`/${link === 'home' ? "": link}`}
                  sx={{textDecoration: "none", ":hover": {
                   textDecoration: "underline",
                   textUnderlineOffset: '7px'
                  }}} key={link} label={link}  />
                 )) :  
                 loggedInLinks.map((link, index) => (
                  <Tab LinkComponent={Link}
                     to={`/${link === 'home' ? "": link}`}
                  sx={{textDecoration: "none", ":hover": {
                   textDecoration: "underline",
                   textUnderlineOffset: '7px'
                  }}} key={link} label={link}  />
                 ))
                 }
                
              
            </Tabs>
        </Toolbar>
    </AppBar>
  )
}

export default Header