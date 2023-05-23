import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        min: 2,
        max:50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true, //for only unique emails
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
    },
    picturePath: {
        type: String,
        default:"",
    },
    friends: {
        type: Array,
        default: []
    },
    location:String,
    occupation: String,
    viewedProfile:Number,
    impressions: Number,
},{timestamps:true}//this gives all the info about date time etc..
);

const User = mongoose.model("User", UserSchema)
export default User;