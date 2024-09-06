import express from "express";
import BlogController from "./blog.controller.js";
import auth from "../../middleware/jwtAuth.middleware.js";


const blogRouter = express.Router();
const blogController = new BlogController();


//====== add new blogs routes ======//
blogRouter.post("/addBlog", auth, (req, res, next)=>{
    blogController.createNewBlog(req, res, next);
});

//===== edit blogs routes ==========//
blogRouter.put("/editBlog/:blogId", auth,  (req, res, next)=>{
    blogController.updateBlogs(req, res, next);
});

//===== delete blogs ==============//
blogRouter.delete("/deleteBlog/:blogId", auth,  (req, res, next)=>{
    blogController.deleteBlog(req, res, next);
});

//===== get all blogs ==============//
blogRouter.get("/getAll", (req, res, next)=>{
    blogController.getAllBlogs(req, res, next);
});

//===== get one blog by blog Id ======//
blogRouter.get("/getOne/:blogId", (req, res, next)=>{
    blogController.getOneBlog(req, res, next);
})


//====== search blogs =================//
blogRouter.get("/searchBlogs", (req, res, next)=>{
    blogController.searchBlogs(req, res, next);
})


export default blogRouter;