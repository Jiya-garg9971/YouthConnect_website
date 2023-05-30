import axios from "axios"
export const loginCall=async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        // console.log(userCredentials.email +" is the desired email");
        const res=await axios.post("/auth/login",userCredentials);
        // console.log("dispatching");
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err});
    }
}