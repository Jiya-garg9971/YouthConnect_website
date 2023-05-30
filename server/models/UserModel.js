import mongoose from "mongoose";
const UserSchema=mongoose.Schema({
    username:{
        type:String,min:3,max:50,require:true,
    },
    email:{
        type:String,min:3,max:50,require:true,unique:true
    },
    password:{
        type:String,min:6,require:true,
    },
    profilePicture:{
        type:String , default:"",
    },
     profileCover:{
        type:String , default:"",
    },
    followers:{
        type:Array, default:[] ,  
     },
    following:{
        type:Array, default:[]  , 
     },
    isAdmin:{
        type:Boolean,default:false,
    },
    desc:{
        type:String,default:"",
    },
    from:{
        type:String, default:"",
    },
    city:{
        type:String, default:"",
    },
},{
    timestamps:true
})
const User=mongoose.model("User",UserSchema);
export default User;