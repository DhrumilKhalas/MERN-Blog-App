import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../components/Blog.js";
import "./blogs.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useSelector } from "react-redux";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const isLoggedin = useSelector((state) => state.isLoggedin);

  const sendRequest = async () => {
    const res = await axios.get("/api/blog").catch((err) => {
      // console.log(err)
      // toast.error("Error occured while fetching Blogs! Please try again later.")
      document.getElementById("errorinallblogsdiv").innerHTML =
        "Error occured while fetching All Blogs! Please try again later.";
    });
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.allBlogs));
    // sendRequest().then(data=>console.log(data.allBlogs[0]._id))
  }, []);
 
  // console.log(blogs);

  return ( 
    <>
      {!isLoggedin ? (
        <div className="notlogin">Please Login to continue.</div>
      ) : (
        <>
          {!blogs && (
            <div
              id="errorinallblogsdiv"
              style={{
                marginTop: "50px",
                fontSize: "35px",
                color: "crimson",
                textAlign: "center",
              }}
            ></div>
          )}
          <div className="bloginblogs">
            <ToastContainer id="deleteerror" />
            {blogs &&
              blogs.map((blog, index) => (
                <div key={index}>
                  <Blog
                    id={blogs[index]._id}
                    // id={blog._id}

                    description={blogs[index].description}
                    // description={blog[index].description}

                    title={blogs[index].title}
                    // title={blog[index].title}

                    image={blogs[index].image}
                    // image={blog[index].image}

                    userName={blogs[index].user.name}
                    // userName={blog[index].user.name}

                    isUser={localStorage.getItem("userId") === blog.user._id}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Blogs;

// title={blogs.title} description={blogs.description} imageURL={blogs.image}
