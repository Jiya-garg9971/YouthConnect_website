import express from 'express';
import Post from '../models/postModel.js';
import User from '../models/UserModel.js';
const PostRouter=express.Router();
//create a new post
PostRouter.post("/",async (req,res)=>{
    try{
        const newPost=new Post(req.body);
       const savedPost= await newPost.save();
       res.status(200).json(savedPost);
    }
    catch(err){
        res.status(400).json(err);
    }
}) 
//get Post
PostRouter.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        // console.log(post)
        res.status(200).json(post);
    }
    catch(err){
        // console.log(err);
        res.status(400).json(err);
    }
})
//update Post
PostRouter.put("/:id",async(req,res)=>{
     try{
        const post=await Post.findByIdAndUpdate(req.params.id,{$set:req.body, });
        res.status(200).json("Account has been updated")
    }        
    catch(err){
        res.status(400).json("Error occured");
    }
})

//delete Post
PostRouter.delete("/:id",async(req,res)=>{
    const post=await Post.findById(req.params.id);
    try{
        await post.deleteOne();
        res.status(200).json("Post DELETED SUCCESSFULLY");
    }
    catch(err){
        res.status(400).json("Post not found");
    }
})
//like /unlike the post

PostRouter.put("/:id/likes",async(req,res)=>{
    const follow=req.body.userId; // params ka follower PostId hoyega
    // console.log(follow +" is the follower");
    try{
        const PostDet=await Post.findById(req.params.id);
        console.log(PostDet);
        if(!PostDet.likes.includes(follow)){
            // console.log("push");
            await PostDet.updateOne({$push:{likes:follow}});
            res.status(200).json("you have liked the post");
        }
        else{
            // console.log("pull");
             await PostDet.updateOne({$pull:{likes:follow}});
            res.status(200).json("You have unlike the post");
        }            
    }
    catch(err){
        console.log(err);
        res.status(400).json("err");
    }
})

// get all posts
PostRouter.get("/timeline/:userId",async(req,res)=>{
    console.log("timeline");
    try{
        const currentUser=await User.findById(req.params.userId);
        //console.log(currentUser);
        const userPosts=await Post.find({userId:currentUser._id});
       // console.log(userPosts);
        const friendPosts=await Promise.all(currentUser.following.map((friendId)=>{
           return Post.find({userId:friendId});
        }));
        // console.log(userPosts.concat(...friendPosts));
        res.status(200).json(userPosts.concat(...friendPosts));
    }
    catch(err){
        console.log(err+"---------is the error");
        res.status(500).json(err);
    }  
}

)
PostRouter.get("/profile/:username",async(req,res)=>{
    console.log("profile");
    try{
        const currentUser=await User.findOne({username:req.params.username});
        // console.log(currentUser);
        const userPosts=await Post.find({userId:currentUser._id});
        //  console.log(userPosts.concat(...friendPosts));
        res.status(200).json(userPosts);
    }
    catch(err){
        console.log(err+"---------is the eror ");
        res.status(500).json(err);
    }  
}

)

export default PostRouter;