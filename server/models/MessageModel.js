import mongoose from "mongoose";
const MessageSchema=mongoose.Schema({
   conversationId:{
    type:String
   },
   senderId:{
    type:String
   },
   text:String
},{
    timestamps:true,
})
const Message=mongoose.model("Message",MessageSchema);
export default Message;