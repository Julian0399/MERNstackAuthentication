import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";
import generateToken from "../../helpers/generateToken.js";
import bycrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //validation

  if (!name || !email || !password) {
    //bad request
    res.status(400).json({ message: "Please provide all fields" });
  }
  //check password length
  if (password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }
  //create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // generate token JWT

  const token = generateToken(user._id);
  // send response with token and user data

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    sameSite: "strict",
    secure: false,
  });

  if (user) {
    const { _id, name, email, role, photo, bio, isVerified } = user;

    //201: created
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

//User login

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validation

  if (!email || !password) {
    //bad request
    res.status(400).json({ message: "Please provide all fields" });
  }
  //
  
  const userExists = await User.findOne({ email });
  console.log(userExists);
  
  if (!userExists) {
    res.status(400).json({ message: "User not found, please sign up!" });
  }

  // verify password match
  console.log(password,userExists.password);
  
  const isMatch = await bycrypt.compare(password, userExists.password);
  console.log(isMatch);
  
  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(userExists._id);

  if (userExists && isMatch) {
    const { _id, name, email, role, photo, bio, isVerified } = userExists;

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      sameSite: "strict",
      secure: false,
    });

    //200: OK
    res.status(200).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  }
});

//logout user

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
})

//get user profile

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


//update user profile

export const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if(user){
    const {name,bio,photo} = req.body

    user.name = req.body.name || user.name
    user.bio = req.body.bio || user.bio
    user.photo = req.body.photo || user.photo

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      photo: updatedUser.photo,
      bio: updatedUser.bio,
      isVerified: updatedUser.isVerified,
    })
  }else{
    res.status(404).json({message: "User not found"})
  }
})
