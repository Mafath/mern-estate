import mongoose from "mongoose";

const userSchema = new mongoose.Schema( // create the schema
  {
    username: {
      type:String,
      required:true,
      unique:true
    },
    email: {
      type:String,
      required:true,
      unique:true
    },
    password: {
      type:String,
      required:true,
    }
  },
  {timestamps: true}
);

const User = mongoose.model('User', userSchema); // create the model
//collection name eka singular danna. database ekedi eka plural wenawa automaticallyma
//const User kynne ape model eke nama

export default User;