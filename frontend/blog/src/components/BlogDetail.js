import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "./blogDetails.css"

const BlogDetail = () => {
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const [blog, setBlog] = useState();
  const id = useParams().id;
  // .id because /myBlogs/:id in App.js
  // console.log(id);

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios.get(`/api/blog/${id}`).catch((err) => {
      // console.log(err);
      document.getElementById("notgettingdetails").innerHTML =
        "Error occured while fetching a Blog data! Please try again later.";
    });
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({ title: data.blog.title, description: data.blog.description });
    });
  }, [id]);

  // console.log(blog);

  const sendRequest = async () => {
    const res = await axios
      .put(`/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => {
        // console.log(err)
        toast.error(
          "Error occured while updating a Blog! Please try again later."
        );
      });

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      // .then((data) => console.log(data))
      .then(() => {
        alert("Blog updated successfully!");
        navigate("/myBlogs/");
      });
  };

  return (
    <>
      {!isLoggedin ? (
        <div className="notlogin">Please Login to continue.</div>
      ) : (
        <>
          <div
            id="notgettingdetails"
            style={{
              color: "crimson",
              marginTop: "25px",
              fontSize: "20px",
              textAlign: "center",
            }}
          ></div>
          {inputs && (
            <form onSubmit={handleSubmit}>
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
                  textAlign="center"
                  
                >
                 <span className="updateblogheading">Update Your Blog</span>
                </Typography>

                <InputLabel
                  sx={{ mt: 1, fontSize: "20px", fontWeight: "bold" }}
                >
                  Title
                </InputLabel>
                <TextField
                  margin="normal"
                  variant="outlined"
                  value={inputs.title}
                  name="title"
                  onChange={handleChange}
                />

                <InputLabel
                  sx={{ mt: 1, fontSize: "20px", fontWeight: "bold" }}
                >
                  Description
                </InputLabel>
                <TextField
                  margin="normal"
                  variant="outlined"
                  value={inputs.description}
                  name="description"
                  onChange={handleChange}
                />

                {/* <InputLabel sx={{ mt: 1, fontSize: "20px", fontWeight: "bold" }}>
            ImageURL
          </InputLabel>
          <TextField margin="normal" variant="outlined" value={inputs.imageURL} name="imageUR" onChange={handleChange}/> */}

                <Button
                  type="submit"
                  sx={{ mt: 2 }}
                  variant="contained"
                  className="updateblogbtn"
                >
                  UPDATE
                </Button>
              </Box>
            </form>
          )}
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default BlogDetail;
