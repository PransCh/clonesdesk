import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
/* REGISTER USER */
const register = async (req, res) => {//front end to back to database, req=>frontend, res=>to frontend from back
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();//encryption
        const passwordHash = await bcrypt.hash(password, salt); //passing password into hash with salt
        const newUser = new User({//encrypt the password and save when user logs in we salt again and make sure its correct then we generate the jwt
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);//status of 201 means something has been created and success
    } catch (err) {
        res.status(500).json({ error: err.message });//status of 500 means something went wrong 
    }

}
export default register;

/* LOGGING IN */

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400) .json({msg:"User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}