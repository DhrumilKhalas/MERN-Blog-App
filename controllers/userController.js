import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (!users) {
    return res.status(400).json({ Message: "No Users Found!" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    // console.log(err);
    return res.send(err);
  }
  if (existingUser) {
    return res.status(400).json({ Message: "User Already Exists!" });
  }
  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    await user.save();
  } catch (err) {
    // console.log(err);
    return res.send();
  }
  return res.status(200).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    // console.log(err);
    return res.send();
  }
  if (!existingUser) {
    return res.status(404).json({ Message: "User Doesn't Exist!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ Message: "Invalid Credentials!" });
  }
  return res.status(200).json({ existingUser });
};
