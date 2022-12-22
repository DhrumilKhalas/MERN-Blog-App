import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
  let allBlogs;
  try {
    allBlogs = await Blog.find().populate("user").sort({ createdAt: -1 });
  } catch (err) {
    // console.log(err)
    return res.send(err);
  }
  if (!allBlogs) {
    return res.status(400).json({ Message: "No Blogs Found!" });
  }
  return res.status(200).json({ allBlogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ Message: "Unable To Find The User From This Id!" });
  }
  const blog = await new Blog(req.body);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ Message: err });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (!blog) {
    return res.status(500).json({ Message: "Unable To Update The Blog!" });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (!blog) {
    return res.status(404).json({ Message: "No Blog Found!" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (!blog) {
    return res.status(500).json({ Message: "Unable To Delete!" });
  }
  return res.status(200).json({ Message: "Blog Deleted Successfully!" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ Message: "No Blogs Found!" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
