import express from 'express';
import Conversation from '../models/conversationModel.js';
const ConversationRouter=express.Router();

//add new conversation
ConversationRouter.post("/",async(req,res)=>{
    const newConv=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try{
        const result=await newConv.save();
        res.status(200).json(result);        
    }
    catch(e){
        res.status(404).json(e);
    }
})

//GET ALL CONVERSATION WITH GIVEN USERID
ConversationRouter.get("/:userId",async(req,res)=>{
    const userId=req.params.userId;
    try{
        const result = await Conversation.find({
            members: { $in: [userId] }
        });
        res.status(200).json(result);
    }
    catch(err){
        console.log("error 3",err);
        res.status(403).json(err);
    }
})

//get the converation with two userid

ConversationRouter.get("/find/:firstUserId/:secondUserId",async(req,res)=>{
    const firstUserId=req.params.firstUserId;
    const secondUserId=req.params.secondUserId;
    try{
        const result = await Conversation.findOne({
            members: { $all: [firstUserId,secondUserId] }
        });
        res.status(200).json(result);
    }
    catch(err){
        console.log("error 2",err);
        res.status(403).json(err);
    }
})
export default ConversationRouter;