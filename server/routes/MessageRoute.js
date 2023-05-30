import express from 'express';
import Message from '../models/MessageModel.js';
const MessageRouter=express.Router();

//add new Message
MessageRouter.post("/",async(req,res)=>{
    const newMsg=new Message({
        conversationId:req.body.conversationId,
   senderId:req.body.senderId,
   text:req.body.text
    })
    try{
        const savedMsg=await newMsg.save();
        res.status(200).json(savedMsg);
    }
    catch(e){
        res.status(400).json(e);
    }
})

//GET ALL Message WITH GIVEN USERID
MessageRouter.get("/:convId",async(req,res)=>{
    try{
        const Msg=await Message.find({
            conversationId:req.params.convId
        });
        res.status(200).json(Msg);
    }
    catch(e){
        
        console.log("error 4",err);
        res.status(400).json(e);
    }
})

export default MessageRouter;