import express from "express";
import UserController from "./user.controller.js";
import auth from "../../middleware/jwtAuth.middleware.js";
import checkedLogin from "../../middleware/checkIsLoggedIn.js";


const userRouter = express.Router();
const userController = new UserController();

//====== user signup =========//
userRouter.post("/signup", (req, res, next)=>{
    userController.signup(req, res, next);
})


//======= user signin ==========//
userRouter.post("/signin", (req, res, next)=>{
    userController.signin(req, res, next);
})

//======= user logout ===========//
userRouter.get("/logout", auth, (req, res, next)=>{
    userController.logout(req, res, next);
});

//== check is loggedIn ===================//
userRouter.get("/isLogin", checkedLogin, (req,res)=>{
    console.log("User cheked loggin called!");
})



export default userRouter;