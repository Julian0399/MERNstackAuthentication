import asyncHandler from 'express-async-handler';
import User from '../../models/auth/UserModel.js';
import generateToken from '../../helpers/generateToken.js';
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    //validation

    if(!name || !email || !password){
        //bad request
        res.status(400).json({message: "Please provide all fields"});
    }
    //check password length
    if(password.length < 6){
        res.status(400).json({message: "Password must be at least 6 characters"});
    }

    //check if user already exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).json({message: "User already exists"});
    }
    //create user
    const user = await User.create({
        name,
        email,
        password,
    })

    // generate token JWT

    const token = generateToken(user._id);
    // send response with token and user data

    res.cookie("token", token, {
        path:"/",
        httpOnly: true,
        maxAge: 30*24*60*60*1000, //30 days
        sameSite: "lax",
        secure: true,
    })
    

    if(user){
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
        })
    }else{
        res.status(400).json({message: "Invalid user data"});
    }
})