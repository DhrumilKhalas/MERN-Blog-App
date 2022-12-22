import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../../src/components/Blog.js";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "./userBlogs.css";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState();
  const id = localStorage.getItem("userId");
  const isLoggedin = useSelector((state) => state.isLoggedin);

  const sendRequest = async () => {
    const res = await axios.get(`/api/blog/user/${id}`).catch((err) => {
      // console.log(err);
      // toast.error("Error occured while fetching Blogs! Please try again later.")
      document.getElementById("errorinuserblogdiv").innerHTML =
        "Error occured while fetching Blogs! Please try again later.";
    });
    const data = res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs.blogs));
  }, []);

  // console.log(blogs)

  return (
    <>
      {!isLoggedin ? (
        <div className="notlogin">Please Login to continue.</div>
      ) : (
        <>
          {!blogs && (
            <div
              id="errorinuserblogdiv"
              style={{
                marginTop: "50px",
                fontSize: "35px",
                color: "crimson",
                textAlign: "center",
              }}
            ></div> 
          )}
          <div className="bloginblogs">
            {blogs &&
              blogs.map((blog, index) => (
                <div key={index}>
                  <Blog
                    description={blogs[index].description}
                    title={blogs[index].title}
                    image={blogs[index].image}
                    isUser={true}
                    id={blogs[index]._id}
                  />
                </div>
              ))}
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default UserBlogs;
