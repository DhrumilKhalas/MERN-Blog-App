import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "./addBlog.css"

const AddBlog = () => {
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  // console.log(isLoggedin);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        // these keys must be same as its model's keys
        user: localStorage.getItem("userId"),
      })
      .catch((err) => {
        // console.log(err)
        toast.error(
          "Error occured while adding a Blog! Please try again later."
        );
        return;
      });

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      .then(() => navigate("/blogs"))
      .then(() => alert("New Blog Added Successfully!"));
  };

  return (
    <>
      {!isLoggedin ? (
        <div className="notlogin">Please Login to continue.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(2,0,36,0.9528186274509804) 0%, rgba(121,9,79,1) 80%, rgba(25,104,120,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            marginTop={3}
            marginBottom={3}
            display="flex"
            flexDirection={"column"} 
            width={"80%"}
            marginLeft={"auto"}
            marginRight={"auto"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h3"
              textAlign="center"
              className="postyourblogheading"
            >
              Post Your Blog
            </Typography>

            <InputLabel sx={{ mt: 1, fontSize: "20px", fontWeight: "bold" }}>
              Title
            </InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              value={inputs.title}
              name="title"
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <InputLabel sx={{ mt: 1, fontSize: "20px", fontWeight: "bold" }}>
              Description
            </InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              value={inputs.description}
              name="description"
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <InputLabel sx={{ mt: 1, fontSize: "20px", fontWeight: "bold" }}>
              ImageURL
            </InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              value={inputs.imageURL}
              name="imageURL"
              onChange={handleChange}
              required
              autoComplete="off"
            />

            <Button
              type="submit"
              sx={{ mt: 2 }}
              variant="contained"
              className="addblogbtn"
            >
              SUBMIT
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default AddBlog;
