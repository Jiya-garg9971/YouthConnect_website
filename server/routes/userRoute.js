import express from "express";
import User from "../models/UserModel.js";
const UserRoute=express.Router();
// UserRoute.get("/",(req,res)=>{
//     res.send("Welcome to the page");
// })
//get user
UserRoute.get("/",async(req,res)=>{
    const userid=req.query.userId;
    const username=req.query.username;
    // console.log(username);
    try{
        const user=userid? await User.findById(userid):await User.findOne({username:username});
        // console.log(user);
        res.status(200).json(user);

    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})
//update user
UserRoute.put("/:id",async(req,res)=>{
    if(req.body.isAdmin || req.params.id==req.body.userId){
        if(req.body.password){
            try{
                const salt= await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("Account has been updated")
        }        
        catch(err){
            res.send("Error occured");
        }
    }
    else{
        res.status(200).send("You can update only ur account");
    }
    
})

//delete user
UserRoute.delete("/:id",async(req,res)=>{
    if(req.body.userId==req.params.id || req.body.isAdmin){
        try{
            const user=await User.findByIdAndDelete(req.params.id);
            res.status(200).send("USER DELETED SUCCESSFULLY");
        }
        catch(err){
            res.status(400).json("User not found");
        }
    }
    else{
        res.status(200).send("You are not authenticated to delete other accounts");
    }
})
//add follower

UserRoute.put("/:id/follow",async(req,res)=>{
    const follow=req.body.userId; // params ka follower userId hoyega
    const user=req.params.id;
    if(follow!=user ){
        try{
            const userDet=await User.findById(req.params.id);
             const followDet=await User.findById(follow);
            if(!userDet.followers.includes(follow)){
              await userDet.updateOne({$push:{followers:follow}});
              await followDet.updateOne({$push:{following:user}});
                res.status(200).send("Follower added SUCCESSFULLY");
            }
            else{
                res.status(200).send("Follower already exist");
            }            
        }
        catch(err){
            console.log("err 5 ",err);
            res.status(400).json("err");
        }
    }
    else{
        res.status(200).send("Both are same user");
    }
})

//unfollow
UserRoute.put("/:id/unfollow",async(req,res)=>{
    const follow=req.body.userId; // params ka follower userId hoyega
    const user=req.params.id;
    if(follow!=user ){
        try{
            const userDet=await User.findById(req.params.id);
             const followDet=await User.findById(follow);
            //  console.log(userDet);
            if(userDet.followers.includes(follow)){
                // console.log(userDet.followers);
                await userDet.updateOne({$pull:{followers:follow}});
                
              await followDet.updateOne({$pull:{following:user}});
                res.status(200).json("Unfollowed SUCCESSFULLY");
                //console.log("unfollowed");
            }
            else{
                res.status(200).json("You don't follow him/her");
            }            
        }
        catch(err){
            console.log(err);
            res.status(400).json("err");
        }
    }
    else{
        res.status(200).send("Both are same user");
    }
})
//GET THE FRIENDS FOLLOWERS DETAILS
UserRoute.get("/friends/:userId",async(req,res)=>{
    try{
        const user=await User.findById(req.params.userId);
        const result=await Promise.all(
            user.following.map(friendId=>{return  User.findById(friendId);})
        )
        let friendsList=[];
        result.map((friend)=>{
            const {_id,username,profilePicture}=friend;
            friendsList.push({_id,username,profilePicture});
        })
        res.status(200).json(friendsList);
    }
    catch(err){
        console.log("err 6 ",err);
        res.status(500).send("error");
    }
})
export default UserRoute;