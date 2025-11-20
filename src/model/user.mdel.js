import mongoose, { Types } from "mongoose";
import { Schema, model } from "mongoose";
const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
      email:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
      password:{
        type:String,
        require:true
    }
    
})
export const User=mongoose.model("User",userSchema)