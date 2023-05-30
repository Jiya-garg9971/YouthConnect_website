import express from "express";
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
const AuthRoute=express.Router();
AuthRoute.get("/",(req,res)=>{
    res.json("hey it is auth route");
})
AuthRoute.post("/register",async(req,res)=>{
    const salt=await bcrypt.genSalt(10);
    const hashedPasssword=await bcrypt.hash(req.body.password,salt);
    const newUser=await User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPasssword
    })
    try{
        const user=await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json("ERROR OCCURED")

    }
})
AuthRoute.post("/login", async (req, res) => {
    try {
        const result = await User.findOne({ email: req.body.email });
        if (!result) {
            // console.log("user not found");
            return res.status(404).json("USER NOT FOUND");
        }
        const comp = await bcrypt.compare(req.body.password, result.password);
        if (comp) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json("wrong password");
        }
    } catch (err) {
        return res.status(500).json("error occurred");
    }
});

export default AuthRoute;