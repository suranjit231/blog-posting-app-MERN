import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import connectMongodb from "./src/config/connectMongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/core/users/user.router.js";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";
import blogRouter from "./src/core/blogs/blog.router.js";



//======= create the server ============//
const app = express();

//====== setup cors for cross browser request =========//
app.use(cors({
    origin: 'http://localhost:3000',
    
    credentials: true
}));

//===== configure middleware for parsing request body =====//
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());


//====== setup router for user operation ====//
app.use("/api/users", userRouter);

//====== setup router for blogs operation ====//
app.use("/api/blogs", blogRouter);


//====== handle default get request =========//
app.get("/", (req, res, next)=>{
   return res.status(200).json({message:"Welcome to our blogging page!"})
})



//======== error handler miidleware ================//
app.use(errorHandler);

//========= listening in port ===============================//
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`app is listen on port ${PORT}`);
    connectMongodb()
})