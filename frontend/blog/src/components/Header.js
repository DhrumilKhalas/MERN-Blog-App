import React, { useState} from 'react';
import { Box,Toolbar, Typography } from '@mui/material';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "../store/index.js"
import "./header.css";


const Header = () => { 
  const dispatch = useDispatch; 
  const [value, setValue] = useState()
  const isLoggedin = useSelector(state=>state.isLoggedin);
  


  

  const handleLogout = () => {
    
    localStorage.removeItem("userId");
    document.getElementById("allblogsinnavinner").innerHTML = "";
    document.getElementById("myblogsindivinner").innerHTML = "";
    document.getElementById("addblogindivinner").innerHTML = "";
    dispatch(authActions.logout(false))
    
    
  }
 
  
  return (
    <>
      {/* <AppBar className="navbar"> */}
      <div className="navbar">
        <Toolbar>
          <Typography variant="h4" className="logo"><Link to="/" className="logoinner"><div className="spaninner"><span className="logoinnerinner">Blogs App</span></div></Link></Typography>
          {/* {isLoggedin && <Box display="flex" marginLeft="auto" marginRight="auto"> */}
          {/* <Tabs  textColor="inherit"  value={value} onChange={(e, val) => setValue(val)}> */}
            {/* <Tab LinkComponent = {Link} to="/blogs" label="All Blogs" /> */}
            {isLoggedin &&
              <div className="headerblogsdiv" value={value} onChange={(e, val) => setValue(val)} id="headerblogsdiv">
            <div className="allblogsinnav"><Link to="/blogs" className="allblogsinnavinner" id="allblogsinnavinner">All Blogs</Link></div>
            <div className="myblogsindiv"><Link to="/myBlogs" className="myblogsindivinner" id="myblogsindivinner">My Blogs</Link></div>
            <div className="addblogindiv"><Link to="/blogs/add" className="addblogindivinner" id="addblogindivinner">Add Blog</Link></div>
            </div>
            }
            {/* <Tab LinkComponent = {Link} to="/myBlogs" label="My Blogs"/> */}
            {/* <Tab LinkComponent = {Link} to="/blogs/add" label="Add Blog"/> */}
            
          {/* </Tabs> */}
          {/* </Box>} */}
          <Box display="flex" marginLeft="auto" gap="10px"> 
            {!isLoggedin && 
              <> 
               <div className="withoutloginbtn" id="withoutloginbtn"><Link to="/auth"><button className="withoutloginbtninner">Login / Signup</button></Link></div>
              </>
            }
            {isLoggedin && <div className="logoutbtndiv" id="logoutbtndiv"><Link to="/auth"><button onClick={handleLogout} className="logoutbtndivinner">Logout</button></Link></div>}
          </Box>
        </Toolbar>
      {/* </AppBar> */}
      </div>
    </> 
  )
}

export default Header