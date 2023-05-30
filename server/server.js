import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import UserRoute from './routes/userRoute.js';
import AuthRoute from './routes/authRoute.js';
import helmet from 'helmet';
dotenv.config();
import cors from 'cors';
import PostRouter from './routes/postRoute.js';
import ConversationRouter from './routes/ConversationRoute.js';
import MessageRouter from './routes/MessageRoute.js';
const app = express();
app.use(cors());
app.use(express.json())
// app.use(helmet);
const url=process.env.MONGODB_URL;
mongoose.connect(url).then(()=>{console.log("mongoose connected")});
app.get("/api/test",(req,res)=>{
  res.send("<H1> WELCOME</H1>")
})

app.use("/api/user",UserRoute);
app.use("/api/auth",AuthRoute);
app.use("/api/post",PostRouter);
app.use("/api/conversation",ConversationRouter);
app.use("/api/message",MessageRouter);
const port_no=5000 || process.env.PORT_NO;
app.listen(port_no)