import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res, next) => { //next use krnne middlewear 
  const {username, email, password} = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({username, email, password: hashedPassword});

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  }
  catch(error) {
    // next(errorHandler(550, 'error from the function'));
    next(error);
  }
};

export const signin = async(req,res,next) => {
  const {email,password} = req.body;
  try {
    const validUser = await User.findOne({email: email});
    if(!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));

    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

    const {password: pass, ...rest} = validUser._doc;

    // after creating the token we wanna save this token as  the cookie
    // res.cookie('access_token', token, {httpOnly: true, exxpires: new Date(Date.now() + 24 * 60 * 60 * 1000)});

    //expire wenna one nttn(so this is a session)
    res
      .cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json(rest);
    //So now we have the cookie inside the browser

  }
  catch (error) {
    next(error);
  }
};