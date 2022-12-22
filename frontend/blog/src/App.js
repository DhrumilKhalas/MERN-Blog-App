import React, { useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store";
import Home from "./components/Home";
import Error from "./components/Error";
import "./app.css";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  // console.log(isLoggedin);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          {/* {!isLoggedin ? ( */}
          {/* <> */}
          {/* <Route exact path="/" element={<Home/>} /> */}
          <Route exact path="/auth" element={<Auth />} />
          {/* </> */}
          {/* ) : ( */}
          {/* <> */}
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/add" element={<AddBlog />} />
          <Route exact path="/myBlogs" element={<UserBlogs />} />
          <Route exact path="/myBlogs/:id" element={<BlogDetail />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          {/* </> */}
          {/* )} */}
        </Routes>
      </main>
    </>
  );
};

export default App;
