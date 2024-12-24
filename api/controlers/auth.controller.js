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
  const {email,password} = req.body; //user input box wla ghn ewa const 2kt save krgnnwa
  try {
                          //Here we use our 'User' model
                               //findOne is a method to find some info in mongo db
                              //model eke email: api hdpu const email
    const validUser = await User.findOne({email: email}); //check whether email exists or not (mehi email kyl 1 prk dmmth athi). If emial exists, we save that user in a const called 'validUser'
    if(!validUser) return next(errorHandler(404, 'User not found')); //if email does not exist. (here we use the custom error we created)

    //api body eken gnne normal password ekk. But the password inside the database is a hashed one. So we use 'compareSync' method
    const validPassword = bcryptjs.compareSync(password,validUser.password);//we compare both passwords together
    if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));//if password is not correct

    //if both email and password is correct,
    //we need to authenticate the user. The way we do the authentication is by adding a cookie inside the browser
    //We need to create a hash token which includes the email or the id of the user, and then we save this token inside the browser cookie
    //Whenever user wants to change email or password we have to check whether the user is authenticated or not. We can use that cookie for that
    //But here we not gonna save the data as it is. We gonna hash that data as well. Best package for that is JWT. We use this package to create the token
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

    //after creating the token, we wanna save it as the cookie

    //but lets remove the password from the valid user first
    const {password: pass, ...rest} = validUser._doc;

    // after creating the token we wanna save this token as  the cookie
    // res.cookie('access_token', token, {httpOnly: true, exxpires: new Date(Date.now() + 24 * 60 * 60 * 1000)});

    //expire wenna one nttn(so this is a session)
    res
      .cookie('access_token', token, {httpOnly: true}) // kmthi namak denna cookie ekt('acess_token').This cookie include user id. But it is hashed. | http:true kynne no other 3rd party application can have access to our cookie
      .status(200)
      .json(rest);//we send back the user without the password
    //So now we have the cookie inside the browser

  }
  catch (error) {
    //catch the error using middlewear
    next(error);
  }
};