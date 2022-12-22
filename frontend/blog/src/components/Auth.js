import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // http://localhost:6000/api/user/
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        // console.log(err, "hi");
        document.getElementById("errorinauth").innerHTML =
          "Error occured. Please try again later!";
        setTimeout(() => {
          document.getElementById("errorinauth").innerHTML = "";
        }, 5000);
      });

    const data = await res.data;
    // console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    if (isSignup) {
      sendRequest("signup").then(() => {
        document.getElementById("errorinauth").innerHTML =
          "Registration Successful! Please login to continue";
        setTimeout(() => {
          document.getElementById("errorinauth").innerHTML = "";
        }, 5000);
      });
      // .then((data)=>localStorage.setItem("userId", data.existingUser._id))
      // .then(() => dispatch(authActions.login()))
      // .then((data) => console.log(data))
      // .then(() => navigate("/blogs"))
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.existingUser._id))
        .then(() => dispatch(authActions.login()))
        // .then((data) => console.log(data))
        .then(() => navigate("/blogs"))
    }
  };

  return ( 
    <>
      <form onSubmit={handleSubmit} className="authform">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding="20px"
          margin="auto"
          marginTop="30px"
          borderRadius="5px"
          maxWidth="300px"
        >
          <Typography padding="20px" textAlign="center" variant="h4">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              value={inputs.name}
              name="name"
              onChange={handleChange}
              type="text"
              margin="normal"
              label="Name"
              autoComplete="off"
              required
            />
          )}
          <TextField
            value={inputs.email}
            onChange={handleChange}
            name="email"
            type="email"
            margin="normal"
            label="Email"
            autoComplete="off"
            required
          />
          <TextField
            value={inputs.password}
            onChange={handleChange}
            name="password"
            type="password"
            margin="normal"
            label="Password"
            autoComplete="off"
            required
          />
          <Button
            type="submit"
            className="submitbtninauth"
            variant="contained"
            sx={{ marginTop: "20px" }}
          >
            SUBMIT
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ marginTop: "15px", fontSize: "12px" }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
      <div
        style={{ textAlign: "center", marginTop: "20px" }}
        id="errorinauth"
      ></div>
      {/* <div className="errorinreg" id="errorinreg" style={{textAlign:"center", marginTop:"20px"}}></div> */}
    </>
  );
};

export default Auth;
